const express=require('express')
const paymentRoute=express.Router()
const authorizeRoles=require('../Middleware/middleware')
const controller=require('../Controllers/paymentController')


paymentRoute.post('/payment/create-order',authorizeRoles('employer'),controller.createOrder)
paymentRoute.post('/payment/verify-payment',authorizeRoles('employer'),controller.verifyPayment)


module.exports=paymentRoute