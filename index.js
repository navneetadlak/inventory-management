import express from 'express';
import ProductController from './src/Controllers/product.controller';
import ejsLayouts from 'express-ejs-layouts';
import path from "path";

// Initialize the express server
const server = express();

// Middleware to parse JSON bodies
server.use(express.urlencoded({extended : true }));

// setup view engine settings
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));

// Use EJS Layouts middleware
server.use(ejsLayouts);

// creating instance of product contoller so we can access the methods of class ProductController
const productController =  new ProductController();

// Define routes
server.get('/', (req, res) => productController.getProducts(req, res));
server.get('/new', (req, res) => productController.getAddForm(req, res));
server.post('/', (req, res) => productController.addnewProduct(req, res));

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