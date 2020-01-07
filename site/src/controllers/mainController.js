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
    res.render("productDetail");
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
};

module.exports = controller;
