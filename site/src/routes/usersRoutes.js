// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');

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

// ************ Validacion ************
const validationRegister = [
	check('name').isLength({min: 2}).withMessage('El nombre como minimo debe tener 2 caracteres'), 
	check('lastname').isLength({min: 2}).withMessage('El apellido como minimo debe tener 2 caracteres'),
	check('email').isEmail().withMessage('Debe ingresar un mail valido'),
  check('password').isLength({min: 8}).withMessage('La contraseña como minimo debe tener 8 caracteres'),
  body('email').custom(function(value){
    //ubicacion del archivo
    const userFilePath = path.join(__dirname, '../data/users.json');
    let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
    let arrayUsers;
    if (usersFileContent == '') {
      arrayUsers = [];
    } else {
      arrayUsers = JSON.parse(usersFileContent);
    }
    for (let i = 0 ; i < arrayUsers.length; i++){
      if(arrayUsers[i].email == 1){
        return false;
      }
    }
    return true;
  }).withMessage('Ya existe un usuario con este email')
]

// ************ Rutas ************
router.get('/register', guestRoute, usersControllers.register);//formulario de registracion
router.post('/register',upload.single('src'), validationRegister, usersControllers.store);//creacion de usuario

router.get('/login', guestRoute,usersControllers.loginForm);//formulario login
router.post('/login', usersControllers.processLogin);//proceso de login

router.get('/profile',userRoute, usersControllers.profile);//pagina de perfil
router.get('/:id/edit', upload.single('src'),  usersControllers.edit);// editar
router.put('/:id', upload.single('src'),  usersControllers.update);// actualizacion
router.delete('/:id', usersControllers.delete ) //eliminar usuario
router.get('/loginSuccess', guestRoute,usersControllers.loginFormSuccess);//formulario exito login

router.get('/logout', usersControllers.logout);

module.exports = router;