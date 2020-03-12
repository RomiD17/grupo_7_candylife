
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require("path");

//ubicacion del archivo
const userFilePath = path.join(__dirname, '../data/users.json');
//lee el srchivo
let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');

let users = JSON.parse(usersFileContent);

//helper function
/** Escribe el archivo JSON */
function writeJsonFile(data) {
	let jsonData = JSON.stringify(data, null, ' ');
	fs.writeFileSync(usersFileContent, jsonData);
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

function esditUser(item) {
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

function generatePk(){
	let items = users;
	let lastItem = items.pop();
	
	if(lastItem) {
			return ++lastItem.id;
	}

	return 1;
}

function save(item) {
	let items = users;
	item.id = generatePk();
	items.push(item);

	writeJsonFile(items);

	return item.id;
}

//CONTROLLERS//
const usersControllers = {
    register: (req, res) => {
		res.render('users/register');
	},
	store: (req, res) => {
		req.body.src = req.file ? req.file.filename : '';
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
    res.redirect('login');
	},
	loginForm: (req, res) => {
		res.render('users/login');
	},
	processLogin: (req, res) => {
		// Buscar usuario por email
		let user = getUserByEmail(req.body.email);
		
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
					delete user.password;
					req.session.user = user;
					res.locals.user = req.session.user;
					res.redirect('/users/profile');
			} else {
					res.render('users/404', { 
							message: {
									class: 'error-message',
									title: 'Inválido',
									desc: 'Los datos de acceso son inválidos.'
									}
							});
						}
				} else {
						res.render('users/404', { 
								message: {
										class: 'error-message',
										title: 'Inexistente',
										desc: 'El usuario que buscas ya no existe, nunca existió y tal vez nunca exista.'
								}
						});
				}       
			},
		logout: (req, res) => {
			req.session.destroy();
			res.redirect('/');
    },
	edit: (req, res)=>{
		req.body.id = req.params.id;
		req.body.src = req.file ? req.file.filename : req.body.oldImage;
		esditUser(req.body);
         res.redirect('/users/' + req.params.id);
	},
	profile: (req, res) => {
		let user = getUserById(req.session.user.id);
		console.log(user)
		res.render('users/profile', {user});
	}
};
module.exports = usersControllers;