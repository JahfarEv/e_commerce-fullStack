const User = require("../../model/userModel");
const asyncErrorHandler = require("../../Utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const customError = require("../../utils/customError");
const product = require("../../model/productModel");
const { default: mongoose } = require("mongoose");
const cart = require("../../model/addToCart");
const wishlist = require("../../model/wishList");
const user = require("../../model/userModel");
const { Stripe } = require("stripe");
const orders = require("../../model/orderSchema");
const categoryModel = require("../../model/categoryModel");
const userSchema = require("../../model/userModel");


const signToken = (id) => {
  return jwt.sign({ id, isAdmin: false }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

exports.signup = asyncErrorHandler(async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "sucess",
    data: {
      user: newUser,
    },
  });
});

exports.login = asyncErrorHandler(async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json({
      status: "error",
      message: "please provide name & password for login In!",
    });
  }
  const user = await User.findOne({ name }).select("+password");

  if (!user || !(await user.comparePasswordInDb(password, user.password))) {
    res.status(500).json({
      status: "error",
      message: "invalid name or password",
    });
  }
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

//view products
exports.viewProducts = asyncErrorHandler(async (req, res) => {
  const products = await product.find({}).populate('category');
  if (!products) {
    return res.status(404).json({
      status: "error",
      message: "product not found",
    });
  }
  return res.status(200).json({
    status: "succes",
    message: "product fetched succesfully",
    data: {
      products,
    },
  });
});
//Products view by category
exports.productByCategory = async (req, res) => {
  try {
  const category = await categoryModel.findOne({ slug: req.params.slug });
  const products = await product.find({category}).populate("category");
  console.log(products);

  
    res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: {
        category,
        products,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// View a specific product

exports.productById = asyncErrorHandler(async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(404).json({
      status: "error",
      message: "invalid id",
    });
  }
  const products = await product.findOne({_id:productId});
  if (!products) {
    res.status(500).json({
      status:'error',
      message:'product not found'
    })
  } else {
    res.status(200).json({
      status: "succes",
      data: {
        products,
      },
    });
  }
});

//filters

exports.productFilters = async (req, res) => {
  try {
    const { checked } = req.body;
    let arg = {};
    if (checked.length > 0) arg.category = checked;
    const products = await product.find(arg);
    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: "Error while filtering product",
    });
  }
};

//product count

exports.productCount = async (req, res) => {
  try {
    const total = await product.find({}).estimatedDocumentCount();
    console.log(total);
    res.status(200).json({
      status: "success",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: "Error in product count",
    });
  }
};

//product list base on page

exports.productList = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products =await product
      .find({})
      .select("-image")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: "error in per page control",
    });
  }
};

//add to cart
exports.addToCart = asyncErrorHandler(async (req, res, next) => {
  const userId = req.params.id;
  const productId = req.body.product;
  const checkProduct = await product.findById(productId);
  console.log(checkProduct);
  if (!checkProduct) {
    res.status(404).json({
      status: "error",
      message: "not found",
    });
  }
  let newExistingCart = await cart.findOne({ user: userId });
  if (newExistingCart) {
    let exProductCart = newExistingCart.products.indexOf(productId);
    console.log(exProductCart);
    if (exProductCart !== -1) {
      newExistingCart.quantity += 1;
      console.log(newExistingCart.quantity);
      res.status(500).json({
        status: "error",
        message: "product allready exist",
      });
    } else {
      newExistingCart.products.push(productId);
      newExistingCart.totalPrice += checkProduct.price;
      newExistingCart.quantity += 1;
      newExistingCart.save();
      res.status(200).json({
        status: "success",
        data: {
          existingCart: newExistingCart,
        },
      });
    }
  } else {
    const newCart = await cart.create({ user: userId, products: [productId] });
    res.status(200).json({
      status: "success",
      data: {
        newCart: newCart,
      },
    });
  }
});

//view cart

exports.Cart = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const viewCart = await cart.findOne({ user: userId });
  if (!viewCart) {
    return res.status(404).json({
      status: "error",
      message: "cart is empty",
    });
  }
  const cartItems = viewCart.products;
  const cartProducts = await product.find({ _id: { $in: cartItems } });
  res.status(200).json({
    status: "success",
    message: "products fetched successfully",
    data: cartProducts,
  });
});

//Delete products from cart

exports.deleteFromCart = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const productId = req.body.product;

  const findCart = await cart.findOne({ user: userId });

  if (!findCart) {
    res.status(404).json({
      status: "failed",
      message: "not found",
    });
  }
  const index = findCart.products.indexOf(productId);
  const removeProduct = findCart.products[index + 1];
  findCart.products.splice(removeProduct, 1);

  await findCart.save();
  res.status(200).json({
    status: "success",
  });
});

//Add to wishList
exports.addToWishlist = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  if (!userId) {
    res.status(500).json({
      status: "error",
      message: "user id not found",
    });
  }
  const { productId } = req.body;
  console.log(productId);
  const products = product.findById(productId);

  if (!products) {
    res.status(500).json({
      status: "error",
      message: "Product not found",
    });
  }

  await userSchema.updateOne(
    { _id: userId },
    { $push: { wishlist: productId } }
  );
  res.status(200).json({
    status: "success",
    message: "Product add to wish list",
  });
});
//view wish list

exports.viewWishlist = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      status: "error",
      message: "invalid user ID format",
    });
  }
  const user = await userSchema.findById(userId);
  // console.log(user);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "user not found",
    });
  }
  const wishlistIds = user.wishlist;
  if (wishlistIds.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "user wishlist is empty ",
      data: [],
    });
  }
  const wishlistProducts = await product.find({ _id: { $in: wishlistIds } });

  res.status(200).json({
    status: "success",
    message: "successfully feched user wishlist products",
    data: wishlistProducts,
  });
});

//delete wishlist

exports.deleteWishlist = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;
  if (!productId) {
    return res
      .status(404)
      .json({ status: "fail", message: "product not found" });
  }
  const user = await userSchema.findById(userId);
  if (!user) {
    return res.status(404).json({ status: "fail", message: "user not found" });
  }
  await userSchema.updateOne(
    { _id: userId },
    { $pull: { wishlist: productId } }
  );
  res
    .status(200)
    .json({ status: "success", message: "successfully remove product" });
});

//payments
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.payments = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const userr = await user.findById({ _id: userId });
  const findCart = await cart.findOne({ user: userId });
  const prod = await product.find({ _id: findCart.products });
  if (!userr) {
    res.status(200).json({
      status: "succes",
      message: "your cart is empty",
      data: [],
    });
  }

  const customer = await stripe.customers.create({
    name: userr.name,
    address: {
      line1: "ettuveettil",
      city: "vengara",
      state: "kerala",
      postal_code: "123456",
      country: "IN",
    },
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: prod.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
            description: item.description,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
      };
    }),
    mode: "payment",
    success_url: "http://localhost:4000/api/users/payment/success",
    cancel_url: "http://localhost:4000/api/users/payment/cancel",
  });

  if (session) {
    const order = new orders({
      user: findCart.user,
      products: prod,
      order_Id: session.id,
      total_Price: findCart.totalPrice,
      total_Items: findCart.products.length,
      order_status: session.payment_status,
      
    });

    await order.save();
    res.status(200).json({
      status: "success",
      session: session.url,
    });
  } else {
    res.status(404).json({
      status: failed,
    });
  }
});

exports.paymentSuccess = (req, res) => {
  res.send("<h1>success</h1>");
};

// orders

exports.getOrderController = async(req,res)=>{
  const userId = req.params.id;
  const findCart = await cart.findOne({ user: userId });
  try {
    const orders = await orders.find({user:findCart.user})
    res.json(orders)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status:'error',
      message:'Error while getting orders'
    })
  }
}
