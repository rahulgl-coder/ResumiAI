const express = require('express');
const multer = require('multer');
const resumeRoute = express.Router();
const controller=require("../Controllers/resumeController")



const upload = multer({ storage: multer.memoryStorage() });


resumeRoute.post('/upload-resume', upload.single('resume'),controller.resumeParser);
resumeRoute.post('/save-profile',controller.saveResume)


module.exports=resumeRoute