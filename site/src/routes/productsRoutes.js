// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/products'));
    },
    filename: (req, file, cb) => {
        cb(null, 'product-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ************ Controller Require ************
const productsController = require('../controllers/productsControllers');

router.get('/productAdd', productsController.productAdd);// vista del form
router.post('/productAdd', upload.single('src'), productsController.store);// guarda producto
router.get('/success', productsController.success);// guarda producto
router.get('/:id/edit', productsController.edit);// formulario editar
router.put('/:id', upload.single('src'),  productsController.update);// actualizacion
router.get('/productCart', productsController.productCart);//carrito de compras
router.get('/:id', productsController.productDetail);// vista de producto
router.get('/', productsController.products);//productos todos
router.delete('/:id', productsController.delete); //boton eliminar productos

module.exports = router;