const express=require('express')
const interviewRoute=express.Router()
const controller=require('../Controllers/interviewController')
const authorizeRoles=require('../Middleware/middleware')


interviewRoute.get('/questions',authorizeRoles('user','admin'),controller.mainHandler)
interviewRoute.post('/interview-submition',authorizeRoles('user','admin'),controller.saveResult)
interviewRoute.get('/questions/backup',authorizeRoles('user','admin'),controller.questionDatabase)



module.exports=interviewRoute