
const User = require('../Models/userSchema')

const checkEmailLimit = async (req, res, next) => {
  try {
    const employer = await User.findById(req.user.id);

    if (!employer) return res.status(404).json({ msg: "Employer not found" });

    if (employer.hasPaid) {
      return next(); 
    }

    if (employer.credit >= 5) {
      return res.status(403).json({ msg: "Free limit reached. Please pay to unlock more emails." });
    }

    employer.credit+= 1;
    await employer.save();
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = checkEmailLimit;
