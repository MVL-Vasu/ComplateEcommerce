const port = 3001;
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
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

app.post('/verify', require('./controllers/VerifyOtp'));

app.post('/GetOtpTimer' , require('./controllers/GetOtpTimer'));

app.post('/UpdatePass' , require('./controllers/UpdatePass'));


// ===================================> IMAGE UPLOAD APIS <=================================== //

const imageUploadRoutes = require('./routes/imageUpload'); // Adjust the path if needed
app.use('/api',imageUploadRoutes);



// ====================================>  PRODUCT APIS <==================================== //


// Product Router 
const ProductRouter = require("./routes/ProductRoute");
app.use('/products', ProductRouter);



// ====================================>  CART APIS <==================================== //




// END POINT FOR ADDING PRODUCT IN CART

// const Cart  = require("./models/Cart");

app.use("/cart", require("./routes/CartRouter")); 


// END POINT FOR REMOVING PRODUCT FROM CART


// // ENDPOINT TO GET CART DATA

// app.post('/getcart', fetchuser, async (req, res) => {
//      let userdata = await Users.findOne({ _id: req.user.id })
//      res.json(userdata.cartData)
// })


app.listen(port, (error) => {
     if (!error) {
          console.log("Server Running on port " + port);
     }
     else {
          console.log("Error : " + error);
     }
})



