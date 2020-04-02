// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/products'));
    },
    filename: (req, file, cb) => {
        cb(null, 'prod-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ************ Validacion ************
const validateProduct = [
    check('prodNombre').isLength({min: 5}).withMessage('El nombre del producto debe tener al menos 5 caracteres'),
    check('detalle').isLength({min: 20}).withMessage('El detalle del producto debe tener como minimo 20 caracteres')
]

// ************ Controller Require ************
const productsController = require('../controllers/productsControllers');

// ************ Rutas ************

router.get('/productAdd', productsController.productAdd);// vista del form
router.post('/productAdd',upload.single('src'),validateProduct, productsController.store);// guarda producto

router.get('/', productsController.index);//productos todos sql
router.get('/success', productsController.success);// guarda producto
router.get('/:id/edit',upload.single('src'),validateProduct, productsController.edit);// formulario editar
router.put('/:id', upload.single('src'), validateProduct, productsController.update);// actualizacion
router.get('/productCart', productsController.productCart);//carrito de compras
router.get('/api', productsController.productsjson);//productos todos solo el json
router.get('/:id', productsController.productDetail);// vista de producto
//router.get('/', productsController.products);//productos todos sql
router.delete('/:id', productsController.delete); //boton eliminar productos

module.exports = router;