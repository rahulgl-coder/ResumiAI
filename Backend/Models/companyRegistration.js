const mongoose=require('mongoose')


const companyRegister= new mongoose.Schema({

    userId:{
         type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true
    },

    companyName:{
        type:String,
        required:true
    },
    companyAddress:{
        type:String,
        required:true
    },
    registrationNumber:{
        type:Number,
        required:true
    },
    about:{
        type:String,
        required:true
    },
}, {
  timestamps: true 
})


module.exports=mongoose.model("CompanyRegister",companyRegister)