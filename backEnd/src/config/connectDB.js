const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose')
dotenv.config();   

const connectDB = async ()=>{
   
   try {  
    await mongoose.connect(process.env.MONGODB)
    console.log('connect sucessfull');
   } catch (error) {
    console.error(error)
   }

}
module.exports = connectDB