import ProductModel from "../models/product.models.js"

class ProductController {
  getProducts(req, res) {
    console.log("request");
    let products = ProductModel.getAll();
    console.log(products);
    res.render("index", { products });
  }

  getAddProduct(req, res, next) {
    res.render("new-product",
       { errorMessage: null });
  }

  postAddProduct(req, res, next) {
    const { name, desc, price } = req.body;
    const imageUrl =
      'images/' + req.file.filename;
    ProductModel.add(name, desc, price, imageUrl);
    let products = ProductModel.getAll();
    res.render('index', { products });
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
    let products = ProductModel.getAll();
    res.render("index", { products });
  }

  deleteProduct(req, res){
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound) {
       return res.status(401).send("Product Not Found");
      }
    ProductModel.delete(id);
    let products = ProductModel.getAll();
    res.render("index", { products });
  }
}

export default ProductController;
