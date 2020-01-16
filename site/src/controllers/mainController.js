
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require("path");


//helper function


const controller = {
	root: (req, res) => {
		let products = JSON.parse(contenidoProductosJSON);
			res.render('index', { products });
	  },
};
module.exports = controller;
