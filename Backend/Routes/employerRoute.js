const express=require('express')
const employerRoute=express.Router()
const authorizeRoles=require('../Middleware/middleware')
const controller=require('../Controllers/employerController')


employerRoute.post('/employer/register',authorizeRoles('employer'),controller.register)
employerRoute.get('/employer/check-registration',authorizeRoles('employer'),controller.checkRegistration)

module.exports=employerRoute