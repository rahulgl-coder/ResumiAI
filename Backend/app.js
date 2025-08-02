

const express=require('express')
const app=express()
require('dotenv').config()
const dbConnect=require("./Database/dbConnect")
const PORT=process.env.PORT

const adminRoute=require('./Routes/adminRoutes')
const resumeRoute = require('./Routes/resumRoute');
const userRoute=require('./Routes/authRoutes')
const interviewRoute=require('./Routes/interviewRoute')
const cors = require('cors');





app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));

app.use(express.json())
app.use('/auth',userRoute)
app.use('/admin',adminRoute)
app.use(resumeRoute)
app.use(interviewRoute)



dbConnect()
app.listen(PORT,async()=>{

    try {
    
        console.log("Server Running Sucessfully");
        
    } catch (error) {
        
    }


})