const express = require('express');
const authController = require('../controllers/userController');
const verifyToken = require('../middlewares/userAuthMiddleware');

const router = express.Router();


router.post('/register',(authController.signup))
.post('/login',(authController.login))
.get('/products',(authController.viewProducts))
.get('/product/:id',(authController.productById))
.get('/category/:categoryname',(authController.productByCategory))
.post('/cart/:id',(authController.addToCart))
.get('/viewcart/:id',(authController.Cart))
.post('/cart/remove/:id',(authController.deleteFromCart))
.post('/wishlist/:id',(authController.proWishList))
.get('/viewlist',(authController.wishList))
.post('/payments/:id',(authController.payments))
.get('/payment/success',(authController.paymentSuccess))
.use(verifyToken)









module.exports = router;