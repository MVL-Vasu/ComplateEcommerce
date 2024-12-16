const mongoose = require('mongoose');


// MONGODB CONNECTION STRING 
const uri = "mongodb://localhost:27017/";

const getConnection = () => {

     try {

          mongoose.connect(uri, {
               useNewUrlParser: true,
               useUnifiedTopology: true
          }).then(() => {
               console.log('Connected to MongoDB successfully!');
          }).catch((error) => {
               console.error('Error connecting to MongoDB:', error);
          });

     } catch (error) {

          console.log(error);

     }

}

module.exports = getConnection;