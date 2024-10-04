var express = require('express');
var cors = require('cors');
require('dotenv').config()

const Product = require('./models/productModel.js');
var app = express();
const multer = require('multer');
const mongoose = require('mongoose');
//const bodyparser = require('body-parser');
//const Product = require('./models/productModel');
app.use(express.json());
/*app.use(bodyparser.urlencoded({extended:false})); */
app.use(express.urlencoded({extended: false}));

mongoose.connect('mongodb+srv://junior:1234@cluster0.cfk7onz.mongodb.net/AmbulanteAPI?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.post('/api/products', async (req, res) => {
  try {
  const product = await Product.create(req.body);
  res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}); 

app.use('/public', express.static(__dirname + '/public'));

//const upload = multer({dest: 'public/uploads'}); // multer - dependeci for uploads
const absPath = __dirname + '/views/home.html';
app.get("/", (req, res) =>{
    res.sendFile(absPath);
    //return res.json({message: 'Bem-vindo a Ambulante-app'});
})

app.get("/api/products", async (req, res) =>{ // GET ALL PRODUCTS
  
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.get("/api/product/:id", async (req, res) =>{ // GET one PRODUCT
  
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.put("/api/product/:id", async (req, res) =>{ // UPDATE  PRODUCT
  
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
});

app.delete("/api/product/:id", async (req, res) => { //DELETE A PRODUCT

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

});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});