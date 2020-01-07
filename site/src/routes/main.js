// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/* GET - home page. */
router.get('/', mainController.root);
router.get('/productDetail', mainController.productDetail);
router.get('/productCart', mainController.productCart);
router.get('/register', mainController.register);//formulario de registracion
router.post('/register', mainController.store);//creacion de usuario
router.get('/login', mainController.loginForm);//formulario login
router.post('/login', mainController.processLogin);//proceso de login
router.get('/productAdd', mainController.productAdd);

router.get('/profile/:id', mainController.profile);

module.exports = router;
