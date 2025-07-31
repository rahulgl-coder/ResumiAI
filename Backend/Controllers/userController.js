
const User=require('../Models/userSchema')
const bcrypt = require('bcrypt');
require('dotenv').config
const jwt=require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email,role:user.role }, 
    process.env.JWT_SECRET            
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
      { userId: user._id,role:user.role },
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








const transporter = nodemailer.createTransport({
  service: 'Gmail', // or your SMTP host
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // <- Allow self-signed certs
  },
});




// const signUp=async(req,res)=>{
     
//     try {

//         const{name,email,password}=req.body
        
//         if(!name||!email||!password){
//         return res.status(400).json({message:"All fields required"})
// }

//         const user=await User.findOne({email})
     
        
//         if (user) return res.status(409).json({ message: 'User already exists' });

      
//             const saltRounds = 10;
//             const hashedPassword = await bcrypt.hash(password, saltRounds);
   
//             const newUser= await User.create({name,email,password:hashedPassword})

   
//             const token = generateToken(newUser);
//             console.log(token);
            

//   res.status(201).json({
//   message: 'Signup successful',
//   token,
//   user: {
//     _id: newUser._id,
//     name: newUser.name,
//     email: newUser.email
//   }
// });

        

        
//         } catch (error) {
//          res.status(500).json({ message: 'Server error' });
//         }
// }


const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Simple validations
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: 'Invalid email format' });
    }

  
    if (password.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
    }

  
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const link = `${process.env.BASE_URL}/verify-email?token=${token}`;
   
    


await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: 'Verify Your Email',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9fafb; padding: 30px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
      <h2 style="color: #111827;">Hello, ${name} 👋</h2>
      <p style="color: #4b5563; font-size: 16px;">
        Thank you for registering with us! Please click the button below to verify your email address and complete your sign-up process.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${link}" target="_blank"
          style="background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">
          ✅ Verify Email
        </a>
      </div>
      <p style="color: #6b7280; font-size: 14px;">
        If the button above doesn't work, you can also copy and paste the following link into your browser:
      </p>
      <p style="color: #1f2937; font-size: 14px; word-break: break-all;">
        <a href="${link}" target="_blank" style="color: #2563eb;">${link}</a>
      </p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="color: #9ca3af; font-size: 12px;">
        This link will expire in 24 hours. If you didn't request this, please ignore this email.
      </p>
    </div>
  `,
});

 res.status(201).json({ msg: 'Signup successful. Please verify your email.' });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ msg: 'Server error during signup. Please try again later.' });
  }
};


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



const verifyEmail= async (req, res) => {
  const { token } = req.query;


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
 
   
    
    if (!user) return res.status(404).json('User not found');

    if (user.isVerified) return res.status(401).json({message:'Email already verified'});

    user.isVerified = true;
    await user.save();

     
   return res.status(201).json({user,token})
  } catch (err) {
    console.log(err);
    
    res.status(400).send('Invalid or expired verification link.');
  }
};




module.exports={signUp,signIn,googleAuth,verifyEmail}