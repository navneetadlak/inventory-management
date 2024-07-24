import express from 'express';
// const express = require('express');
import ProductController from './src/Controllers/product.controller';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validationMiddleware from './src/middlewares/validation.middleware';

// Initialize the express server
const app = express();

// Middleware to parse JSON bodies
app.use(express.urlencoded({extended : true }));
// Use EJS Layouts middleware
app.use(ejsLayouts);
app.use(express.json);

// setup view engine settings
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

// creating instance of product contoller so we can access the methods of class ProductController
const productController =  new ProductController();

// Define routes
server.get('/', productController.getProducts);
server.get('/add-product', productController.getAddProduct);
server.post('/', validationMiddleware, productController.postAddProduct);

// Serve static files
server.use(express.static(path.join(path.resolve(), 'src', 'views')));

// Start the server and add error handling
server.listen(3400, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log('Server is running on port 3400');
    }
});