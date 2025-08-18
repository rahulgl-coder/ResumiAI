
const User=require('../Models/userSchema')
const bcrypt = require('bcrypt');
require('dotenv').config
const jwt=require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const { sendVerificationEmail } = require('../utilities/nodeMailer');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email,role:user.role }, 
    process.env.JWT_SECRET            
     )
};


const googleAuth = async (req, res) => {
  const { token,role } = req.body;
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
        isVerified:true,
        role:role
       
      }); }

    const tok=await generateToken(user)
   
    
 res.json({
      message: 'Login successful',
      tok,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Google authentication failed' });
  }
};



const signUp = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
  

    

    if (!name || !email || !password ||!role) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const existing = await User.findOne({ email });
 
      if(existing&&existing.role!=role){
     
   return res.status(400).json({ message: 'Use another email for different category' });
    }

    if (existing && existing.googleId && !existing.password) {
      
      existing.name = name; 
      existing.password = await bcrypt.hash(password, 10);
      await existing.save();

      const token = await generateToken(existing);
      await sendVerificationEmail(existing, token);
      return res.status(200).json({ message: 'Email verification sent to Google-auth user' });
    }

    if (existing&&!existing.isVerified) {
      existing.password=await bcrypt.hash(password,10)
      await existing.save()
      const token = await generateToken(existing);
      await sendVerificationEmail(existing, token);
      return res.status(200).json({ message: 'Email verification sent to mail' });
    
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword,role });

    const token = await generateToken(newUser);
    await sendVerificationEmail(newUser, token);

    res.status(201).json({ message: 'Signup successful. Please verify your email.' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup. Please try again later.' });
  }
};


const signIn = async (req, res) => {
  try {
    const { email, password ,role} = req.body;
  


    if (!email || !password || !role)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
       if (!user)
      return res.status(404).json({ message: "Email not found" });
   
 
    
 if(!user.password){
      return res.status(400).json({message:"Sign Up First"})
    }
    if(!user.isVerified){
      return res.status(401).json({message:"user not verified"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    
    if (!isMatch)
      return res.status(401).json({ message: "Password does not match" });

    const token=await generateToken(user)

  return res.status(200).json({
  user,
  token,
  message: "User verified successfully"
});

  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
};



const verifyEmail= async (req, res) => {
  const { token } = req.query;


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
 
   
    
    if (!user) return res.status(404).json('User not found');

    if (user.isVerified && user.googleId) return res.status(201).json({user,token});
    if(user.isVerified) return res.status(402).json({message:"Email is verified try sign in"})

    user.isVerified = true;
    await user.save();

     
   return res.status(201).json({user,token})
  } catch (err) {
    console.log(err);
    
    res.status(400).send('Invalid or expired verification link.');
  }
};


const resendLink=async(req,res)=>{
try {

  const {email}=req.body

  const user = await User.findOne({ email });
   if (!user) return res.status(404).json({ message: "Email not found" });

   const token = await generateToken(user);
  await sendVerificationEmail(user, token);

    res.status(201).json({ message: 'Signup successful. Please verify your email.' });


  
} catch (error) {

  console.log(error);
    
    res.status(400).send('Error sending mail');
  
}
}

const changeName = async (req, res) => {
  try {
    const { name } = req.body;
    const _id = req.user.id;

    if (!name || name.trim() === "") {
      return res.status(400).json({ msg: "Name is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "Name updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { current, newPass } = req.body;
    const userId = req.user.id;

 
    if (!current || !newPass) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current and new password are required' 
      });
    }


    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

  
    if (!user.password) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have been sign In through Google.' 
      });
    }


    const isMatch = await bcrypt.compare(current, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password is incorrect' 
      });
    }

  
    if (newPass.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

   
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPass, salt);
    await user.save();

  
    res.status(200).json({ 
      success: true, 
      message: 'Password updated successfully' 
    });

  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error changing password',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};




module.exports={signUp,signIn,googleAuth,verifyEmail,resendLink,changeName,changePassword}