const Product = require("../models/productModel");


/*app.get("/api/products",*/ const getProducts = async (req, res) =>{ // GET ALL PRODUCTS
  
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };
  
 /* app.get("/api/product/:id",*/ const getProduct = async (req, res) =>{ // GET one PRODUCT
    
    try {
      const {id} = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };
  
  /*app.put("/api/product/:id",*/ const updateProduct = async (req, res) =>{ // UPDATE  PRODUCT
    
    try {
      const {id} = req.params;
  
      const product = await Product.findByIdAndUpdate(id, req.body);
      if(!product){
        return res.status(404).json({message: "Product not found"});
      }
  
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
  
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };
  
  /*app.delete("/api/product/:id",*/ const deleteProduct = async (req, res) => { //DELETE A PRODUCT
  
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
  
      if(!product){
        return res.status(404).json({message: "Product not found"});
      }
      
      
      res.status(200).json({message: "Product successfuly Deleted!"});
  
    } catch (error) {
      res.status(500).json({message: "Error Deleting.."})
    }
  
  };

  /*app.post('/api/products',*/ const createProduct = async (req, res) => {
    try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };


  module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
  };