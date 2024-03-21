const express=require('express');
const router= express.Router();
const productosController = require('../controllers/productosController')

router.post("/api/producto", productosController.createProduct);

router.get("/api/producto", productosController.findAllProducts);

router.get("/api/producto/:id", productosController.findOneProduct);

router.put("/api/producto/:id", productosController.updateProd);

router.delete("/api/producto/:id", productosController.deleteProd);

module.exports = router;