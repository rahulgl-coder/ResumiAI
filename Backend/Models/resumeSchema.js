const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencing the User model
    required: true
  },

  name: {
    type: String,
    required: true
  },

  skills: {
    type: [String], 
    required: true
  },

  qualification: {
    type: [String], 
    required: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model("Resume", resumeSchema);
