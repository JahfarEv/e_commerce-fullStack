const express = require("express");
const authRouter = require("./Apis/router/authRouter");
const globalErrorHandler = require('./Apis/controllers/errorController');
const adminRouter = require("./Apis/router/adminRouter");
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use("/api/users", authRouter);
app.use("/api/admin/",adminRouter)



app.use(globalErrorHandler)

module.exports = app;
