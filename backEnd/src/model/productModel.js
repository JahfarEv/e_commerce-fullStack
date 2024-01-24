const mongoose = require("mongoose");
const productModel = new mongoose.Schema({
    title:String,
    Image:String,
    price:{type : Number , required:true},
    description: String,
    category:{
        type: mongoose.ObjectId,
        ref: "Category",
        required: true
    },
    quantity:Number

});

const product = mongoose.model("product",productModel)
module.exports = product
