import path from "path";
import ProductModel from "../Models/product.models.js";

class ProductController {
  getProducts(req, res) {
    console.log("request");
    let products = ProductModel.getAll();
    console.log(products);
    res.render("index", { products });
  }

  getAddProduct(req, res, next) {
    res.render("new-product", { errorMessage: null });
  }

  postAddProduct(req, res, next) {
    ProductModel.add(req.body);
    var product = ProductModel.getAll();
    res.render("index", { product });
  }

  getUpdateProductView(req, res, next) {
    // 1. if product exists then return view
    const { id } = req.body;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    }
    // else return error
    else {
      res.status(401).send("Product Not Found");
    }
  }
}

export default ProductController;
