
const express=require('express')
const userRoute=express.Router()
const controller=require('../Controllers/userController')
const authorizeRoles=require('../Middleware/middleware')



userRoute.post('/signup',controller.signUp)
userRoute.post('/signin',controller.signIn)
userRoute.post('/google',controller.googleAuth)
userRoute.get('/verify-email',controller.verifyEmail)
userRoute.post('/resend-link',controller.resendLink)
userRoute.patch('/name-change',authorizeRoles('user'),controller.changeName)
userRoute.patch('/change-password',authorizeRoles('user'),controller.changePassword)












module.exports=userRoute