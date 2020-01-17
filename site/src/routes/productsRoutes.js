// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsControllers');
router.get('/productAdd', productsController.productAdd);
router.post('/productAdd', productsController.guardarProducto);
router.get('/productsEdit', productsController.editar);
router.put('/:id', productsController.update);
router.get('/productDetail/:id', productsController.productDetail);
router.get('/productCart', productsController.productCart);
router.get('/products', productsController.products);//productos

module.exports = router;