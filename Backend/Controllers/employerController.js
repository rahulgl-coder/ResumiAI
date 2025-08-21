const CompanyRegister=require('../Models/companyRegistration')
const Resume=require('../Models/resumeSchema')
const User=require('../Models/userSchema')
const nodemailer = require('nodemailer');
const SavedCandidates=require('../Models/savedCandidate')


require('dotenv').config




const getTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
      tls: {
    rejectUnauthorized: false, 
  },
  });
};





const register = async (req, res) => {
  try {
    const { companyName, companyAddress, registrationNumber, about } = req.body;
    const userId = req.user.id; 

    if (!companyName || !companyAddress || !registrationNumber || !about) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const company=await CompanyRegister.findOne({userId})

    if(company){
       return res.status(400).json({ message: "Company already registerd" });
    }

    const newCompany = await CompanyRegister.create({
      userId,
      companyName,
      companyAddress,
      registrationNumber,
      about,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      data: newCompany,
    });
  } catch (error) {
    console.error("Error registering company:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



const checkRegistration = async (req, res) => {
  try {
    const userId = req.user.id;

    const registered = await CompanyRegister.findOne({ userId });

    console.log(registered);
    
    
    if (!registered) {
      return res.status(200).json({ status: false, message: "Not registered" });
    }
    return res.status(202).json({
      status: true,
      message: "Already registered",
      data: registered,
    });
  } catch (error) {
    console.error("Error checking registration:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};


const getCandidates=async(req,res)=>{

  try {
   
    
    const candidates = await Resume.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'interviewresults',
          localField: 'userId',
          foreignField: 'userId',
          as: 'interviewResult'
        }
      },
      { $unwind: { path: '$interviewResult', preserveNullAndEmptyArrays: true } },
      { $match: { 'user.role': 'user' } },
      { $project: { 'user.password': 0, 'user.googleId': 0 } }
    ]);

  
    
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const sendMail = async (req, res) => {
  try {
    const { candidateId, subject, message, jobTitle } = req.body;

    // Candidate (receiver)
    const user = await User.findById(candidateId);
    if (!user) {
      return res.status(404).json({ msg: "Candidate not found" });
    }

    // Sender (logged in user)
    const sender = await User.findById(req.user.id);
    if (!sender) {
      return res.status(404).json({ msg: "Sender not found" });
    }

    const transporter = getTransporter();

  
    const mailOptions = {
      from: `"${sender.name}" <${process.env.EMAIL_USER}>`, 
      to: user.email,
      subject: subject || `Job Opportunity: ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
          <h2>${jobTitle}</h2>
          <p><strong>From:</strong> ${sender.name} (${sender.email})</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error sending email", error: error.message });
  }
};
const checkPayment = async (req, res) => {
  try {
    const _id = req.user?.id;
    if (!_id) {
      return res.status(401).json({ msg: "Unauthorized: No user ID provided" });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ hasPaid: user.hasPaid });
  } catch (error) {
    console.error("Error checking payment status:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const saveCandidate = async (req, res) => {
  try {
    const { candidateId } = req.body;
    const userId = req.user.id;

    // Find if this user already has a savedCandidates doc
    let data = await SavedCandidates.findOne({ userId });

    if (data) {
      // Use addToSet to prevent duplicates
      await SavedCandidates.updateOne(
        { userId },
        { $addToSet: { candidateIds: candidateId } }
      );
    } else {
      data = await SavedCandidates.create({
        userId,
        candidateIds: [candidateId],
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate saved successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const checkSavedCandidates=async(req,res)=>{

try {
  
  
} catch (error) {
  
}

}



module.exports={register,checkRegistration,getCandidates,sendMail,checkPayment,saveCandidate}