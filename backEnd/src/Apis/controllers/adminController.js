const jwt = require("jsonwebtoken");
const user = require("../../model/userModel");
const { default: mongoose } = require("mongoose");
const product = require("../../model/productModel");
const asyncErrorHandler = require("../../Utils/asyncErrorHandler");
const categoryModel = require("../../model/categoryModel");
const slugify = require("slug");

const adminLogin = asyncErrorHandler(async (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { username, isAdmin: true },
      process.env.SECRET_STR,
      {
        expiresIn: process.env.LOGIN_EXPIRES,
      }
    );

    res.status(200).json({
      status: "sucess",
      message: "sucessfully admin login",
      token,
    });
  } else {
    res.status(401).json({
      status: "not found",
      message: "invalid admin",
    });
  }
});

//all users

const allUsers = asyncErrorHandler(async (req, res) => {
  const AllUsers = await user.find();
  if (!AllUsers) {
    res.status(404).json({
      status: "error",
      message: "user not found",
    });
  } else {
    res.status(200).json({
      status: "sucess",
      message: "All Users Listed Successfully!",
      data: {
        AllUsers,
      },
    });
  }
});

//get userBy id

const getUserById = asyncErrorHandler(async (req, res, next) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      status: "error",
      message: "invalid user id format",
    });
  }

  const users = await user.findById(userId);
  if (!users) {
    res.status(404).json({
      status: "error",
      message: "user not found",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  }
});

//create products

const createProduct = asyncErrorHandler(async (req, res) => {
  const { title, image, price, description, category } = req.body;
  const newProduct = await product.create({
    title,
    Image: image,    
    price,
    description,
    category,
    slug: slugify(title),
    quantity: 1,
  });
  console.log(category.name);
  res.status(201).json({
    status: "sucess",
    data: {
      product: newProduct,
    },
  });
});

//delete product

const deleteProduct = asyncErrorHandler(async (req, res) => {
  const { productId } = req.body;
  console.log(productId);

  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({
      status: "error",
      message: "invalid product id provided",
    });
  }

  const deleteproduct = await product.findOneAndDelete({ _id: productId });
  console.log(deleteproduct);
  if (!deleteproduct) {
    return res.status(404).json({
      status: "error",
      message: "product not found",
    });
  }
  return res.status(200).json({
    status: "succes",
    message: "product deleted succesfully",
  });
});

// update products

const updateProduct = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { title, image, price, description, category, name } = req.body;
  const updateProduct = await product
    .findByIdAndUpdate(
      id,
      {
        title,
        image,
        price,
        description,
        category,
        quantity: 1,
        slug: slugify(name),
      },
      { new: true }
    )
    .save();
  res.status(201).json({
    status: "sucess",
    data: {
      product: updateProduct,
    },
  });
});

//create category

const createCategory = asyncErrorHandler(async (req, res) => {
  const { name } = req.body;
  console.log(name);
  if (!name) {
    return res.status(401).json({
      status: "error",
      message: "Name is requeird",
    });
  }
  const existingCategory = await categoryModel.findOne({ name });
  if (existingCategory) {
    return res.status(200).json({
      status: "success",
      message: "Category already exisits",
    });
  }
  const category = await new categoryModel({
    name,
    slug: slugify(name),
  }).save();
  res.status(201).json({
    status: "success",
    message: "new category created",
    data: {
      category: category,
    },
  });

  res.status(500).json({
    status: "error",
    message: "Error in category",
  });
});

//get all category

const categoryController = asyncErrorHandler(async (req, res) => {
  const category = await categoryModel.find({});
  res.status(200).json({
    status: "success",
    message: "all categories list",
    data: {
      category,
    },
  });

  console.log(error);
  res.status(500).json({
    status: "error",
    message: "Error while getting all categories",
  });
});
//update category
const updateCategory = asyncErrorHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const category = await categoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Category updated successfully",
    category,
  });

  res.status(500).json({
    status: "error",
    message: "Error while updating category",
  });
});
//single category

const singleCategory = asyncErrorHandler(async (req, res) => {
  const category = await categoryModel.findOne({ slug: req.params.slug });
  res.status(200).json({
    status: "success",
    message: "get single category successfull",
    data: category,
  });
  res.status(404).json({
    status: "error",
    message: "not found",
  });
});

//delete category
const deleteCategory = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  await categoryModel.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "Category removed successfully",
  });

  console.log(error);
  res.status(500).json({
    status: "error",
    message: "Category id not valid",
  });
});

//view products

const viewProduct = asyncErrorHandler(async (req, res) => {
  const products = await product.find({}).populate("category");
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

//all products by category
const allProduct = asyncErrorHandler(async (req, res, next) => {
  const productCategory = await product.find({ slug: req.body.slug });
  console.log(productCategory);
  if (!productCategory) {
    res.status(404).json({
      status: "failed",
      message: "product not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      productCategory: productCategory,
    },
  });
});

//view specific product

const specificProduct = asyncErrorHandler(async (req, res) => {
  // const productId = req.params.id;
  // if (!mongoose.Types.ObjectId.isValid(productId)) {
  //   res.status(404).json({
  //     status: "error",
  //     message: "invalid id",
  //   });
  // }
  const productById = await product
    .findOne({ slug: req.params.slug })
    .populate("category");
  console.log(productById);
  if (!productById) {
    res.status(404).json({
      status: "error",
      message: "not found",
    });
  }
  res.status(200).json({
    status: "succes",
    data: {
      productById,
    },
  });
});

module.exports = {
  adminLogin,
  allUsers,
  getUserById,
  createProduct,
  allProduct,
  specificProduct,
  deleteProduct,
  updateProduct,
  createCategory,
  viewProduct,
  categoryController,
  updateCategory,
  singleCategory,
  deleteCategory,
};
