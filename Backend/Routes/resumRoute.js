const express = require('express');
const multer = require('multer');
const resumeRoute = express.Router();
const controller=require("../Controllers/resumeController")
const authorizeRoles=require('../Middleware/middleware')



const upload = multer({ storage: multer.memoryStorage() });


resumeRoute.post('/upload-resume',authorizeRoles('user','admin'), upload.single('resume'),controller.resumeParser);
resumeRoute.post('/save-profile',authorizeRoles('user','admin'),upload.single('resume'),controller.saveResume)
resumeRoute.get('/check-resume',authorizeRoles('user','admin'),controller.getResume)


module.exports=resumeRoute