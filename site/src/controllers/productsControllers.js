const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require("path");

const ubicacionProductosJSON = path.join(__dirname, '../data/products.json');

let contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');

const productsControllers = {
productDetail: (req, res) => {
    let products = JSON.parse(contenidoProductosJSON);
    res.render("productDetail", {products});
  },
productCart: (req, res) => {
    res.render('productCart');
},
productAdd: (req, res) => {
    res.render('productAdd');
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
module.exports = productsControllers;