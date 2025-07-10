
const express=require('express')
const userRoute=express.Router()
const controller=require('../Controllers/userController')



userRoute.post('/signup',controller.signUp)











module.exports=userRoute