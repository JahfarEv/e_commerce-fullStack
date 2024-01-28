const { default: mongoose } = require("mongoose");
const user = require("./userModel");
const product = require("./productModel");


const orderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: user
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: product
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
  
    purchase_Date: {
      type: Date,
      default: Date.now
    },
    order_Id: {
      type: String,
      required: true
    },
    total_Price: {
      type: Number,
      required: true
    },
    total_Items: {
      type: Number,
      required: true
    },
    payment:{},
    buyer:{
      type:mongoose.ObjectId,
      ref:user
    },
    status:{
      type:String,
      default:'Not Process',
      enum:["Not Process", "Procesing", "Shipped", "Deliverd", "Cancel"]
    }
  })
const orders = mongoose.model('orders',orderSchema)
module.exports = orders