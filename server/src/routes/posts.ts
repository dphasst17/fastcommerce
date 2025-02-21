import express from "express"
import PostsController from "controllers/posts"
import { verifyToken } from "middlewares/middle"
const router = express.Router()
const postController = new PostsController()

router.get("/",postController.getAll)
router.get("/detail/:id",postController.getDetail)
router.get("/category",postController.getCategory)
router.get("/comment/:id/:page?",postController.getCommentPost)
router.post("/comment",verifyToken,postController.insertCommentPost)
router.patch("/",postController.updatePost)
export default router