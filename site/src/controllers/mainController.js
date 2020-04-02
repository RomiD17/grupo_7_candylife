
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require("path");
const db = require('../database/models');
const sequelize = db.sequelize;
const ubicacionProductosJSON = path.join(__dirname, '../data/products.json');

let contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');
let products = JSON.parse(contenidoProductosJSON);
//helper function
const controller = {
	root: (req, res) => {
			db.Products
			.findAll()
			.then( products => {
				//return res.send(products)
				return res.render('index', { products });
			})
			.catch(error => console.log(error));
	  },
	  inConstruction: (req, res) => {
			res.render('inConstruction');
	  },
};
module.exports = controller;
