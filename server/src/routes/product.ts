import express from "express";
import ProductController from "controllers/product";
const router = express.Router();
const productController = new ProductController()
router.get('/',productController.getAll)
router.get('/types',productController.getAllType)
router.get('/search/:key',productController.search)
router.get('/type/:nameType',productController.getByType)
router.get('/col/:nameType',productController.getColByType)
router.get('/detail/:type/:idProduct',productController.getDetail)
router.get('/new',productController.getNew)
router.get('/view',productController.getView)
router.get('/sale/all',productController.getAllSaleEvent)
router.get('/sale/',productController.getSale)
router.get('/sale/detail/:idSale',productController.getSaleDetail)
router.post('/',productController.insertProduct)
router.patch('/',productController.updateProduct)
router.post('/sale',productController.insertSaleEvent)
router.patch('/sale',productController.updateSaleEvent)
export default router