const port = 3001;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");
const Users = require('./models/Users');

//IMPORT THE MONGODB CONNECTION FILE FROM UTILS FOLDER
const getConnection = require("./utils/getConnection");


const app = express();
app.use(cors());  // Prevents Request Block when server and clien running in different ports
app.use(express.json());



// call the connection function
getConnection();



// ===================================> USER AUTHENTICATION APIS <=================================== //


// Create Endpoint for User Registration
app.post('/signup', require('./controllers/Register'));


// Create Endpoint for User Login
app.post('/login', require('./controllers/Login'));


app.post('/forgetpass', require('./controllers/ForgetPass'));

// ===================================> IMAGE UPLOAD APIS <=================================== //

const imageUploadRoutes = require('./routes/imageUpload'); // Adjust the path if needed
app.use('/api',imageUploadRoutes);



// ====================================>  PRODUCT APIS <==================================== //


// Product Router 
const ProductRouter = require("./routes/ProductRoute");
app.use('/products', ProductRouter);



// ====================================>  CART APIS <==================================== //


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
     await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userdata.cartData });
     res.send({
          success: true,
     })
})

// END POINT FOR REMOVING PRODUCT FROM CART

app.post('/removefromcart', fetchuser, async (req, res) => {
     let userdata = await Users.findOne({ _id: req.user.id });
     if (userdata.cartData[req.body.itemId] > 0) {
          userdata.cartData[req.body.itemId] -= 1;
          await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userdata.cartData });
          res.send({
               success: true,
          })
     }
})

// ENDPOINT TO GET CART DATA

app.post('/getcart', fetchuser, async (req, res) => {
     console.log("Get cart");
     let userdata = await Users.findOne({ _id: req.user.id })
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



