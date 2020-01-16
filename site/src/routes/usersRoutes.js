// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersControllers = require('../controllers/usersControllers');

router.get('/profile/:id', usersControllers.profile);
router.get('/register', usersControllers.register);//formulario de registracion
router.post('/register', usersControllers.store);//creacion de usuario
router.get('/login', usersControllers.loginForm);//formulario login
router.post('/login', usersControllers.processLogin);//proceso de login

module.exports = router;