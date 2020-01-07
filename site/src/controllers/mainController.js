const fs = require("fs");
const path = require("path");

// ************ Function to Read an HTML File ************
function readHTML(fileName) {
  let filePath = path.join(__dirname, `/../views/${fileName}.html`);
  let htmlFile = fs.readFileSync(filePath, "utf-8");
  return htmlFile;
}

const ubicacionProductosJSON = path.join(__dirname, '../data/products.json');

let contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');

const controller = {
  root: (req, res) => {
    let products = JSON.parse(contenidoProductosJSON);
		res.render('index', { products });
  },
  productDetail: (req, res) => {
    let products = JSON.parse(contenidoProductosJSON);
    res.render("productDetail", {products});
  },
  productCart: (req, res) => {
    res.render("productCart");
  },
  register: (req, res) => {
    res.render("register");
  },
  productAdd: (req, res) => {
    res.render("productAdd");
  },
  guardarProducto: (req, res) => {
	
		let arrayDeProductos = [];
		
		if (contenidoProductosJSON != '') {
			arrayDeProductos = JSON.parse(contenidoProductosJSON);
		}
		req.body = {
			id: arrayDeProductos.length + 1,
			...req.body
		};
		arrayDeProductos.push(req.body);
		let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');
		fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);
		res.send('¡Producto creado!');
	},
};
module.exports = controller;
