
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require("path");


//helper function

let products = JSON.parse(contenidoProductosJSON);

const controller = {
	root: (req, res) => {
			res.render('index', { products });
	  },
};
module.exports = controller;
