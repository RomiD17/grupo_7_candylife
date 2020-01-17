const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require("path");

const ubicacionProductosJSON = path.join(__dirname, '../data/products.json');

let contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');
let products = JSON.parse(contenidoProductosJSON);

const productsControllers = {
productDetail: (req, res) => {
    res.render("productDetail", {products});
  },
  products: (req, res) => {
    res.render('products', {products});
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
    
    editar: (req, res) => {
        res.render('productsEdit');
    },
    update: (req, res ) => {
        req.body.id = req.params.id;
        /* Si nos lleva imagen guardamos esa, de lo contrario mantenemos la anterior */
        req.body.image = req.file ? req.file.filename : req.body.oldImage;
        productsModel.update(req.body);

        res.redirect('/products/' + req.params.id);
    }

};
module.exports = productsControllers;