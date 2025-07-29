
const User=require('../Models/userSchema')
const bcrypt = require('bcrypt');
require('dotenv').config
const jwt=require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, // payload
    process.env.JWT_SECRET             // secret
     )
};


const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
   
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

   
    let user = await User.findOne({ email });


    if (!user) {
      user = await User.create({
        email,
        name,
        picture,
        googleId: sub,
      });
    }

    // Generate your own token
    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token: jwtToken,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Google authentication failed' });
  }
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

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Password does not match" });

    return res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
};





module.exports={signUp,signIn,googleAuth}