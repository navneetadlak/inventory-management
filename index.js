const express = require("express");
const server = express();
import ProductController from "./src/Controllers/product.controller";

// creating instance of product contoller so we can access the methods of class ProductController
const productController =  new ProductController();

server.get('/', productController.getProducts);

server.use(express.static('src/views'));

server.listen(8000)