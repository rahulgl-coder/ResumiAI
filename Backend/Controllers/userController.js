
const User=require('../Models/userSchema')
const bcrypt = require('bcrypt');
require('dotenv').config
const jwt=require('jsonwebtoken')




const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, // payload
    process.env.JWT_SECRET             // secret
     )
};


const signUp=async(req,res)=>{
     
    try {

        const{name,email,password}=req.body
        
        if(!name||!email||!password){
        return res.status(400).json({message:"All fields required"})
}

        const user=await User.findOne({email})
     
        
        if (user) return res.status(409).json({ message: 'User already exists' });

      
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
   
            const newUser= await User.create({name,email,password:hashedPassword})

   
            const token = generateToken(newUser);
            console.log(token);
            

  res.status(201).json({
  message: 'Signup successful',
  token,
  user: {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email
  }
});

        

        
        } catch (error) {
         res.status(500).json({ message: 'Server error' });
        }
}


module.exports={signUp}