

const mongoose=require('mongoose')


const interviewResultSchema=new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
  score:{
    type:String,
    required:true
  },
  totalQuestions:{
    type:String,
    required:true
  },
  percentage:{
    type:String,
    required:true
  }
}, {
  timestamps: true 
})


module.exports=mongoose.model("InterviewResult", interviewResultSchema);