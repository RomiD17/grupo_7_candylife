
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require("path");
const { check, validationResult, body } = require('express-validator');

//ubicacion del archivo
const userFilePath = path.join(__dirname, '../data/users.json');
//lee el srchivo
let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');

let users = JSON.parse(usersFileContent);

//helper function
/** Escribe el archivo JSON */
function writeJsonFile(data) {
	let jsonData = JSON.stringify(data, null, ' ');
	fs.writeFileSync(userFilePath, jsonData);
}
function getAllUsers () {
	let finalUsers = usersFileContent == '' ? [] : users; 
	return finalUsers;
}
function getUserByEmail(email) {
	let allUsers = getAllUsers();
	let userToFind = allUsers.find(oneUser => oneUser.email == email);
	return userToFind;
}

function getUserById(id) {
	let user = users;
	return user.find(oneUser => oneUser.id == id);
}

function updateUser(item) {
	let items = users;
	let updatedItems = items.map(currentItem => {
			if (currentItem.id == item.id) {
					return currentItem = item;
			}
			return currentItem;
	});
	
	writeJsonFile(updatedItems);

	return item.id;
}
function destroyUser(id) {
	let items = users;
	
	let filteredItems = items.filter(currentItem => currentItem.id != id );
	
	writeJsonFile(filteredItems);
}

// function generatePk(){
// 	let items = users;
// 	let lastItem = items.pop();
	
// 	if(lastItem) {
// 			return ++lastItem.id;
// 	}

// 	return 1;
// }

// function save(item) {
// 	let items = users;
// 	item.id = generatePk();
// 	items.push(item);

// 	writeJsonFile(items);

// 	return item.id;
// }

//CONTROLLERS//
const usersControllers = {
  register: (req, res) => {
		res.render('users/register');
	},
	store: (req, res) => {
		let errors = validationResult(req);

    if(errors.isEmpty()){
			req.body.src = req.file ? req.file.filename : '';
			console.log(req.file)
			req.body.password = bcrypt.hashSync(req.body.password, 10);
			let arrayUsers = [];
			if (usersFileContent != '') {
				arrayUsers = users
			}
			req.body = {
				id: arrayUsers.length + 1,
				...req.body
			};
			arrayUsers.push(req.body);
			let saveUsers = JSON.stringify(arrayUsers, null, ' ');
			fs.writeFileSync(userFilePath, saveUsers);
			return res.redirect('loginSuccess');
		} else {
			return res.render('users/register', { errors: errors.errors });
		}
	},
	loginForm: (req, res) => {
			res.render('users/login');
		},
	loginFormSuccess: (req, res) => {
			res.render('users/loginSuccess');
		},
	processLogin: (req, res) => {
		let errors = validationResult(req);

    if(errors.isEmpty()){
		// Buscar usuario por email
		let user = getUserByEmail(req.body.email);
	
	//	console.log(req.body.password, user.password)
		
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
					delete user.password;
					req.session.user = user;
					res.locals.user = req.session.user;
					// Setear en session el ID del usuario
					req.session.userId = user.id;
					// Setear la cookie
				if (req.body.remember) {
					res.cookie('userCookie', user.id, { maxAge: 60000 * 60 });
				}
				// Redireccionamos al visitante a su perfil
				return	res.redirect('/users/profile');
			} else {
					res.render('users/login', {						
						errors: [{
						location: "body",
						msg: "El password es incorrecto",
						param: "password"
					}] 
						});
					}
			} else {
						res.render('users/login', { 
							errors: [{
								location: "body",
								msg: "El usuario que buscas no existe.",
								param: "email"
							}]
						});
				}    
			}   
			},
	logout: (req, res) => {
		req.session.destroy();
		// Destruir la cookie
		res.cookie('userCookie', null, { maxAge: 1 });
		res.redirect('/');
    },
	edit: (req, res)=>{
		//res.send('editar')
		let users =	getUserById(req.params.id);
		res.render('users/userEdit', { users });
	},
	update: (req, res ) => {
		req.body.id = req.params.id;
		/* Si nos lleva imagen guardamos esa, de lo contrario mantenemos la anterior */
		req.body.src = req.file ? req.file.filename : req.body.oldImage;
		req.body.password = bcrypt.hashSync(req.body.password, 10);
		updateUser(req.body);
		res.redirect('/users/profile');
	},
	profile: (req, res) => {
		let user = getUserById(req.session.user.id);
		console.log(user)
		res.render('users/profile', {user});
	},
	delete: (req,res) => {
		destroyUser(req.params.id);
    res.redirect('/');
	}
};
module.exports = usersControllers;