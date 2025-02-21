import express from "express";
import StatisticalController from "controllers/statistical";
const router = express.Router();
const statistical = new StatisticalController()
router.get('/revenue',statistical.revenue)
router.get('/product',statistical.product)
router.get('/user',statistical.user)

export default router