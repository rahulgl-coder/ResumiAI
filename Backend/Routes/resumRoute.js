const express = require('express');
const multer = require('multer');
const resumeRoute = express.Router();



const upload = multer({ storage: multer.memoryStorage() });


resumeRoute.post('/upload-resume', upload.single('resume'),);


module.exports=resumeRoute