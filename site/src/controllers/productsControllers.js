const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require("path");

//direccion de porductos
const ubicacionProductosJSON = path.join(__dirname, '../data/products.json');
//lee archivo
let contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');
//pasa el json para que se muestre
let products = JSON.parse(contenidoProductosJSON);

//Funciones
/** Escribe el archivo JSON */
function writeJsonFile(data) {
    let jsonData = JSON.stringify(data, null, ' ');
    fs.writeFileSync(ubicacionProductosJSON, jsonData);
}

function findProd(id) {
    let items = products;
    return items.find(item => item.id == id)
}
function updateProd(item) {
    let items = products;
    let updatedItems = items.map(currentItem => {
        if (currentItem.id == item.id) {
            return currentItem = item;
        }
        return currentItem;
    });
    
    writeJsonFile(updatedItems);

    return item.id;
}



const productsControllers = {
 productDetail: (req, res) => {
     let product = findProd(req.params.id)
     res.render('products/productDetail', { product});
   },
  products: (req, res) => {
    res.render('products/products', {products});
    },
    productCart: (req, res) => {
        res.render('products/productCart');
    },
productAdd: (req, res) => {
        res.render('products/productAdd');
    },
guardarProducto: (req, res) => {
    let arrayDeProductos = [];
    if (contenidoProductosJSON != '') {
        arrayDeProductos = products
    }
    req.body = {
        id: arrayDeProductos.length + 1,
        ...req.body
    };
    
    arrayDeProductos.push(req.body);
    let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');
    fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);
    res.redirect('success');
    },
    success: (req, res) => {
        res.render('success');
    },
    
     edit: (req, res) => {
        let product = findProd(req.params.id)
         res.render('products/productsEdit', { product });
     },
     update: (req, res ) => {
         req.body.id = req.params.id;
         /* Si nos lleva imagen guardamos esa, de lo contrario mantenemos la anterior */
         req.body.src = req.file ? req.file.filename : req.body.oldImage;
         updateProd(req.body);
         res.redirect('/products/' + req.params.id);
     },
    delete: (req, res) => {
        let productosArray = products;
		let productosSinElQueBorramos = productosArray.filter(function (unProducto) {
			return unProducto.id != req.params.id;
		})
		// guardo el array con los productos finales
		fs.writeFileSync(ubicacionProductosJSON, JSON.stringify(productosSinElQueBorramos, null, ' '));
		res.redirect('/products');
    }

};
module.exports = productsControllers;