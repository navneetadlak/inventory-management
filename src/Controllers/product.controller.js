import ProductModel from "../Models/product.models.js";

class ProductController {
  getProducts(req, res) {
    console.log("request");
    var products = ProductModel.getAll();
    console.log(products);
    res.render("index", { products });
  }

  getAddProduct(req, res, next) {
    res.render("new-product", { errorMessage: null });
  }

  postAddProduct(req, res, next) {
    ProductModel.add(req.body);
    var products = ProductModel.getAll();
    res.render("index", { products });
  }

  getUpdateProductView(req, res, next) {
    // 1. if product exists then return view
    const id = req.params.id;
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

  postUpdateProduct(req, res){
    ProductModel.update(req.body);
    var products = ProductModel.getAll();
    res.render("index", { products });
  }

  deleteProduct(req, res){
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound) {
       return res.status(401).send("Product Not Found");
      }
    ProductModel.delete(id);
    var products = ProductModel.getAll();
    res.render("index", { products });
  }
}

export default ProductController;
