const express = require('express');
const authController = require('../controllers/userController');
const verifyToken = require('../middlewares/userAuthMiddleware');

const router = express.Router();


router.post('/register',(authController.signup))
.post('/login',(authController.login))
.get('/products',(authController.viewProducts))
.get('/product/:id',(authController.productById))
.get('/product-category/:slug',(authController.productByCategory))
.post('/product-filters',(authController.productFilters))
// .get('/product-count',(authController.productCount))
// .get('/product-list/:page',(authController.productList))
.post('/cart/:id',(authController.addToCart))
.get('/viewcart/:id',(authController.Cart))
.delete('/cart/remove/:id',(authController.deleteFromCart))
.post('/wishlist/:id',(authController.addToWishlist))
.get('/viewlist/:id',(authController.viewWishlist))
.post('/payments/:id',(authController.payments))
.get('/payment/success',(authController.paymentSuccess))
.use(verifyToken)









module.exports = router;