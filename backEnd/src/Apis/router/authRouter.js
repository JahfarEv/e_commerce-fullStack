const express = require('express');
const authController = require('../controllers/userController');
const verifyToken = require('../middlewares/userAuthMiddleware');

const router = express.Router();


router.post('/register',(authController.signup))
.post('/login',(authController.login))
.post('/forget-password',(authController.forgetPassword))
.get('/products',(authController.viewProducts))
.get('/product-category/:slug',(authController.productByCategory))
.post('/product-filters',(authController.productFilters))
.get('/product-count',(authController.productCount))
.get('/product-list/:page',(authController.productList))
.get('/payment/success',(authController.paymentSuccess))
.get('/user-orders',(authController.getOrderController))
.get('/product/:id',(authController.productById))
.get('/viewlist/:id',(authController.viewWishlist))
.use(verifyToken)
.post('/cart/:id',(authController.addToCart))
.get('/viewcart/:id',(authController.Cart))
.delete('/cart/remove/:id',(authController.deleteFromCart))
.post('/wishlist/:id',(authController.addToWishlist))
.post('/payments/:id',(authController.payments))









module.exports = router;