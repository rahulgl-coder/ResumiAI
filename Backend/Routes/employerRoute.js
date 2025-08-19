const express=require('express')
const employerRoute=express.Router()
const authorizeRoles=require('../Middleware/middleware')
const controller=require('../Controllers/employerController')
const checkEmailLimit=require('../Middleware/mailCredits')


employerRoute.post('/employer/register',authorizeRoles('employer'),controller.register)
employerRoute.get('/employer/check-registration',authorizeRoles('employer'),controller.checkRegistration)
employerRoute.get('/employer/candidates',authorizeRoles('employer'),controller.getCandidates)
employerRoute.post('/employer/send-email',authorizeRoles('employer'),checkEmailLimit,controller.sendMail)

module.exports=employerRoute