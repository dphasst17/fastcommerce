import express from "express";
import WarehouseController from "controllers/warehouse";
import { verifyToken } from "middlewares/middle";
const router = express.Router();
const wareController = new WarehouseController()

router.get("/",wareController.getAllWare)
router.post("/",verifyToken,wareController.insertWare)

export default router