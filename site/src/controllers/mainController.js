
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require("path");

const ubicacionProductosJSON = path.join(__dirname, '../data/products.json');

let contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');
let products = JSON.parse(contenidoProductosJSON);
//helper function
const controller = {
	root: (req, res) => {
			res.render('index', { products });
	  },
};
module.exports = controller;
