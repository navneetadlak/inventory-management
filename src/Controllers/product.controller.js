import path from 'path';
import ProductModel from '../Models/product.models.js';

class ProductController {
    getProducts(req, res) {
        let products = ProductModel.getAll();
        console.log(products);
        res.render('index', { products });
    }

    getAddProduct(req, res, next){
        res.render('new-product', {errorMessage: null});
    }

    postAddProduct(req, res, next){
        ProductModel.add(req.body)
        var product = ProductModel.getAll();
        res.render('index', {product});
    }
}

export default ProductController;

