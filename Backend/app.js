

const express=require('express')
const app=express()
require('dotenv').config()
const dbConnect=require("./Database/dbConnect")
const PORT=process.env.PORT

const adminRoute=require('./Routes/adminRoutes')
const resumeRoute = require('./Routes/resumRoute');
const userRoute=require('./Routes/authRoutes')
const interviewRoute=require('./Routes/interviewRoute')
const employerRoute=require('./Routes/employerRoute')
const paymentRoute=require('./Routes/paymentRoutes')
const cors = require('cors');




const allowedOrigins = [
  "http://localhost:5173",
  "https://resumiai-1.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json())
app.use('/auth',userRoute)
app.use('/admin',adminRoute)
app.use(resumeRoute)
app.use(interviewRoute)
app.use(employerRoute)
app.use(paymentRoute)



dbConnect()
app.listen(PORT,async()=>{

    try {
    
        console.log("Server Running Sucessfully");
        
    } catch (error) {
        
    }


})