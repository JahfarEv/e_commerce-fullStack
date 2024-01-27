const mongoose = require("mongoose");
const productModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  Image: {
    data:Buffer,
    type:String
},
  price: {
    type: Number,
    required: true,
  },
  description: String,
  category: {
    type: mongoose.ObjectId,
    ref: "category",
    required: true,
  },
  quantity: {
    type:Number,
    required: true,
  },
});

const product = mongoose.model("product", productModel);
module.exports = product;
