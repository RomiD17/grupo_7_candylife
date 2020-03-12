// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/users'));
    },
    filename: (req, file, cb) => {
        cb(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
// ************ Controller Require ************
const usersControllers = require('../controllers/usersControllers');
const userRoute = require('../middlewares/userRoute');
const guestRoute = require('../middlewares/guestRoute');


router.get('/profile',userRoute, usersControllers.profile);
router.get('/register', guestRoute, usersControllers.register);//formulario de registracion
router.post('/register',upload.single('src'), usersControllers.store);//creacion de usuario
router.put('/:id/edit', upload.single('src'),  usersControllers.edit);// editar
router.get('/login', guestRoute,usersControllers.loginForm);//formulario login
router.post('/login', usersControllers.processLogin);//proceso de login
router.get('/logout', usersControllers.logout);
router.delete('/:id', usersControllers.delete )

module.exports = router;