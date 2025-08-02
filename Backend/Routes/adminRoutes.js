const express=require('express')
const adminRoute=express()
const controller=require('../Controllers/adminController')
const authorizeRoles=require('../Middleware/middleware')



adminRoute.post('/skill',authorizeRoles('admin'),controller.addSkill)
adminRoute.get('/getskill',authorizeRoles('admin'),controller.getSkill)
adminRoute.post('/save_question',authorizeRoles('admin'),controller.addQuestion)








module.exports=adminRoute