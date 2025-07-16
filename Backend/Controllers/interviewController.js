
const User=require('../Models/userSchema')
const Resume=require('../Models/resumeSchema')

const getQuestions=async(req,res)=>{

    try {

        const {id}=req.params

        const resume=await Resume.findOne({userId:id})
        const skills=resume.skills
       
          
        
        
    
    } catch (error) {
        
   
   
    }




}




module.exports={getQuestions}