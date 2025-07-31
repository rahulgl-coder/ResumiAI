
const express=require('express')
const userRoute=express.Router()
const controller=require('../Controllers/userController')




userRoute.post('/signup',controller.signUp)
userRoute.post('/signin',controller.signIn)
userRoute.post('/google',controller.googleAuth)
userRoute.get('/verify-email',controller.verifyEmail)











module.exports=userRoute