const express=require('express')
const interviewRoute=express.Router()
const controller=require('../Controllers/interviewController')


interviewRoute.get('/questions/:id',controller.mainHandler)
interviewRoute.post('/interview-submition',controller.saveResult)









module.exports=interviewRoute