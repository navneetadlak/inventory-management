import express from 'express';
// const express = require('express');
import ProductController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validationMiddleware from './src/middlewares/validation.middleware.js';

// Initialize the express server
const app = express();
app.use(express.static("public"));

// Middleware to parse JSON bodies
app.use(express.urlencoded({extended : true }));
// Use EJS Layouts middleware
app.use(ejsLayouts);
app.use(express.json());

// setup view engine settings
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

// creating instance of product contoller so we can access the methods of class ProductController
const productController =  new ProductController();

// Define routes
app.get('/', productController.getProducts);
app.get('/new-product', productController.getAddProduct);
app.get("/update-product/:id", productController.getUpdateProductView);
app.get('/delete-product/:id', productController.deleteProduct);
app.post('/', validationMiddleware, productController.postAddProduct);
app.post("/update-product", productController.postUpdateProduct)

// Serve static files
app.use(express.static(path.join(path.resolve(), 'src', 'views')));

// Start the server and add error handling
app.listen(3400, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log('Server is running on port 3400');
    }
});