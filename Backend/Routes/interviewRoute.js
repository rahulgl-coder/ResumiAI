const express=require('express')
const interviewRoute=express.Router()
const controller=require('../Controllers/interviewController')
const authorizeRoles=require('../Middleware/middleware')


interviewRoute.get('/questions/:id',authorizeRoles('user','admin'),controller.mainHandler)
interviewRoute.post('/interview-submition',authorizeRoles('user','admin'),controller.saveResult)



module.exports=interviewRoute