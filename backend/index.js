const port = 3001;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

const uri = "mongodb://localhost:27017/";

mongoose.connect(uri, {
     useNewUrlParser: true,
     useUnifiedTopology: true
}).then(() => {
     console.log('Connected to MongoDB successfully!');
}).catch((error) => {
     console.error('Error connecting to MongoDB:', error);
});

// API CREATION

app.get("/", (req, res) => {
     res.send("Express App is Running");
})
 
// Image Storage Engine
const storage = multer.diskStorage({
     destination: './upload/images',
     filename: (req, file, cb) => {
          return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
     }
})

const upload = multer({ storage: storage })

// Creating Upload Endpoint for images

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
     res.json({
          success: 1,
          image_url: `http://localhost:${port}/images/${req.file.filename}`
     })
})

// Import Product Schema
const Product = require("./Schema/Product");


// Add Product API

app.post('/addproduct', async (req, res) => {

     // fetch all products from the database
     let products = await Product.find({});

     let id;
     if (products.length > 0) {
          // access the last product from the database
          let last_product_array = products.slice(-1);

          let last_product = last_product_array[0];

          // increment the id i.e. supposed last product id is 10 then id will be 11
          id = last_product.id + 1;
     }
     else {
          id = 1;
     }

     const product = new Product({
          id: id,
          name: req.body.name,
          image: req.body.image,
          category: req.body.category,
          new_price: req.body.new_price,
          old_price: req.body.old_price
     });
     await product.save();
     res.json({
          success: true,
          name: req.body.name,
     })
})



// Delete Product API

app.post('/remove_product', async (req, res) => {
     await Product.findOneAndDelete({ id: req.body.id });
     console.log("removed");
     res.json({
          success: true,
          name: req.body.name
     })
})


// Get All Product API

app.get('/allproducts', async (req, res) => {
     let products = await Product.find({});
     res.send(products);
})

// GET THE DATA FOR POPULAR IN WOMEN SECTION

app.use('/popularinwomen', async (req, res) => {
     let product = await Product.find({ category: "womens" }).limit(4)
     res.json(product);
})

// GET LETEST PRODUCT DATA

app.use('/necollections', async (req, res) => {
     let products = await Product.find().sort({ _id: -1 }).limit(8);
     res.json(products);
})

// CREATING MIDDLEWARE TO FETCH USER
const fetchuser = async (req, res, next) => {
     const token = req.header('auth-token');
     if (!token) {
          console.log("please login first");
     }
     else {
          try {
               const data = jwt.verify(token, 'secret_ecom');
               req.user = data.user;
               next();
          }
          catch (error) {
               res.status(401).send({ errors: "please authenticate using a valid token" })
          }
     }
}

// END POINT FOR ADDING PRODUCT IN CART

app.post('/addtocart', fetchuser, async (req, res) => {
     let userdata = await Users.findOne({ _id: req.user.id });
     userdata.cartData[req.body.itemId] += 1;
     await Users.findOneAndUpdate({ _id: req.user.id},{cartData: userdata.cartData});
     res.send({
          success: true,
     })
})

// END POINT FOR REMOVING PRODUCT FROM CART

app.post('/removefromcart', fetchuser, async (req, res) => {
     let userdata = await Users.findOne({ _id: req.user.id });
     if(userdata.cartData[req.body.itemId] > 0)
     {
          userdata.cartData[req.body.itemId] -= 1;
          await Users.findOneAndUpdate({ _id: req.user.id},{cartData: userdata.cartData});
          res.send({
               success: true,
          })
     }
})

// ENDPOINT TO GET CART DATA

app.post('/getcart' , fetchuser , async (req,res)=>{
     console.log("Get cart");
     let userdata = await Users.findOne({_id : req.user.id})
     res.json(userdata.cartData)
})


app.listen(port, (error) => {
     if (!error) {
          console.log("Server Running on port " + port);
     }
     else {
          console.log("Error : " + error);
     }
})


// Create Endpoint for User Registration

const Users = require('./Schema/Users');

app.post('/signup', async (req, res) => {

     let check = await Users.findOne({ email: req.body.email });

     if (check) {
          return res.status(400).json({ success: false, error: "user already exists" });
     }
     else {
          let cart = {};
          for (let i = 0; i < 300; i++) {
               cart[i] = 0;
          }
          const user = new Users({
               name: req.body.username,
               email: req.body.email,
               password: req.body.password,
               cartData: cart,
          })

          await user.save();
          const data = {
               user: {
                    id: user.id
               }
          }
          const token = jwt.sign(data, 'secret_ecom');
          res.json({ success: true, token })
     }

})


// Create Endpoint for User Registration

app.post('/login', async (req, res) => {

     let user = await Users.findOne({ email: req.body.email })

     if (user) {
          const passcompare = req.body.password === user.password;
          if (passcompare) {
               const data = {
                    user: {
                         id: user.id
                    }
               }
               const token = jwt.sign(data, 'secret_ecom');
               res.json({ success: true, token })
          }
          else {
               res.json({ success: false, error: 'Wrong password!' });
          }
     }
     else {
          res.json({ success: false, error: 'Wrong Email Address' });
     }

})

