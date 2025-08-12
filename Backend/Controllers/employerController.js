const CompanyRegister=require('../Models/companyRegistration')





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
    
    if (!registered) {
      return res.status(200).json({ status: false, message: "Not registered" });
    }
    return res.status(400).json({
      status: true,
      message: "Already registered",
      data: registered,
    });
  } catch (error) {
    console.error("Error checking registration:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};



module.exports={register,checkRegistration}