const express = require('express')
const adminRouter = express.Router()
const adminController = require('../controllers/adminController')
const uploadCloudinary = require('../middlewares/multer')
const admToken = require('../middlewares/adminAuthMiddleware')


adminRouter.post('/login',(adminController.adminLogin))
// .use(admToken)
.get('/users',(adminController.allUsers))
.get('/users/:id',(adminController.getUserById))
.post('/category/create',(adminController.createCategory))
.get('/category/get-category',(adminController.categoryController))
.get('/view',(adminController.viewProduct))
.post('/addProduct',uploadCloudinary,adminController.createProduct)
.delete('/products',(adminController.deleteProduct))
.put('/update/:id',(adminController.updateProduct))
.put('/update-category/:id',(adminController.updateCategory))
.get('/single-category/:slug',(adminController.singleCategory))
.delete('/delete-category/:id',(adminController.deleteCategory))
.get('/category/:slug',(adminController.allProduct))
.get('/product/:slug',(adminController.specificProduct))

module.exports = adminRouter