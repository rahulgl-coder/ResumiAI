const express=require('express')
const employerRoute=express.Router()
const controller=require('../Controllers/employerController')


employerRoute.post('/employer/register',controller.register)

module.exports=employerRoute