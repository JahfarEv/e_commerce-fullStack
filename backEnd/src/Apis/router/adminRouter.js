const express = require('express')
const adminRouter = express.Router()
const adminController = require('../controllers/adminController')
const uploadCloudinary = require('../middlewares/multer')
const admToken = require('../middlewares/adminAuthMiddleware')


adminRouter.post('/login',(adminController.adminLogin))
.get('/users',(adminController.allUsers))
.get('/users/:id',(adminController.getUserById))
.post('/category/create',(adminController.createCategory))
.get('/category/get-category',(adminController.categoryController))
.get('/view',(adminController.viewProduct))
.post('/addProduct',uploadCloudinary,adminController.createProduct)
.delete('/products',(adminController.deleteProduct))
.patch('/update',(adminController.updateProduct))
.get('/category/:category',(adminController.allProduct))
.get('/product/:id',(adminController.specificProduct))
.use(admToken)

module.exports = adminRouter