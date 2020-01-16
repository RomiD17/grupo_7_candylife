
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require("path");

const ubicacionProductosJSON = path.join(__dirname, '../data/products.json');

let contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');

//helper function
function getAllUsers () {
	let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
	let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent); 
	return finalUsers;
}
function storeUser (newUserData) {
	let allUsers = getAllUsers();
	allUsers.push(newUserData);
	fs.writeFileSync(userFilePath, JSON.stringify(allUsers, null, ' '));
}

function generateUserId () {
	let allUsers = getAllUsers();
	if (allUsers.length == 0) {
		return 1;
	}
	let lastUser = allUsers.pop();
	return lastUser.id + 1;
}

function getUserByEmail(email) {
	let allUsers = getAllUsers();
	let userToFind = allUsers.find(oneUser => oneUser.email == email);
	return userToFind;
}

function getUserById(id) {
	let allUsers = getAllUsers();
	let userToFind = allUsers.find(oneUser => oneUser.id == id);
	return userToFind;
}

const usersControllers = {
    register: (req, res) => {
		res.render('register');
	},
	store: (req, res) => {
		let userFinalData = {
			id: generateUserId(),
			name: req.body.name,
			lastname: req.body.lastname,
			adress: req.body.adress,
			email: req.body.email,
			//password: bcrypt.hashSync(req.body.password, 10),
			password: req.body.password,
		};
		console.log(userFinalData)
		// Guardar al usario
		storeUser(userFinalData);
		// Redirección al register
		res.redirect('login');
	},
	loginForm: (req, res) => {
		res.render('login');
	},
	processLogin: (req, res) => {
		// Buscar usuario por email
		let user = getUserByEmail(req.body.email);

		// Si encontramos al usuario
		if (user != undefined) {
			// Al ya tener al usuario, comparamos las contraseñas
			if (bcrypt.compareSync(req.body.password, user.password)) {
				// Redireccionamos al visitante a su perfil
				res.redirect(`/profile/${user.id}`);
			} else {
				res.send('Credenciales inválidas');
			}
		} else {
			res.send('No hay usuarios registrados con ese email');
		}
	},
	profile: (req, res) => {
		let userLoged = getUserById(req.params.id);

		res.render('profile', { user: userLoged });
	}
};
module.exports = usersControllers;