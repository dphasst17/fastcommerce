import CommentController from "controllers/comment"
import express from "express"
import { verifyToken } from "middlewares/middle"
const router = express.Router()
const commentController = new CommentController()

router.get("/",commentController.getAll)
router.get("/detail/:id/:page?",commentController.getByProduct)
router.post("/",verifyToken,commentController.insertComment)
router.patch("/",commentController.editComment)
router.delete("/",commentController.removeComment)
export default router