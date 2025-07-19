const express=require('express')
const interviewRoute=express.Router()
const controller=require('../Controllers/interviewController')


interviewRoute.get('/questions',controller.mainHandler)









module.exports=interviewRoute