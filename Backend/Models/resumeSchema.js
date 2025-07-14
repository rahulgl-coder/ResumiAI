const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencing the User model
    required: true
  },
  phone:{
    type:Number,
    require:true
  },

 skills: {
    type: [String], 
    required: true
  },

  qualifications: {
    type: [String], 
    required: true
  },

  dob:{
    type:Date,
    required:true
  },

  passoutYear:{
    type:Number,
    required:true
  },
 preferredLocation:{
  type:[String],
  required:true
 },

 currentLocation:{
  type:String,
  required:true
 },
  workModes: {
    type: [String],
    enum: ['Remote', 'Hybrid', 'Onsite'],
    default: []
  }




}, 



{
  timestamps: true 
});

module.exports = mongoose.model("Resume", resumeSchema);
