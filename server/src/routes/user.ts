import express from "express";
import UserController from "controllers/user";
import { verifyToken, verifyTokenAdmin } from "middlewares/middle";
const router = express.Router();
const userController = new UserController()

router.get('/',verifyToken,userController.getUser)
router.get('/admin',verifyToken,userController.adminGetInfo)
router.patch('/',verifyToken,userController.userUpdate)
router.post('/address',verifyToken,userController.userAddress)
router.get('/address',userController.getAllAddress)
router.get('/u',userController.getAllUser)
router.get('/s',verifyTokenAdmin,userController.getAllStaff)

export default router