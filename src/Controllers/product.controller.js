import path from 'path';
import ProductModel from '../models/product.model.js';
import { error } from 'console';

export default class ProductController {
    getProducts(req, res) {
        let products = ProductModel.get();
        console.log(products);
        res.render('index', { products });
    }

    getAddProduct(req, res, next){
        res.render('new-product', {errorMessage: null});
    }

    postAddProduct(req, res, next){
        ProductModel.add(req.body)
        var product = ProductModel.getAll();
        res.render('index', {products});
    }
}

// export default ProductController;

