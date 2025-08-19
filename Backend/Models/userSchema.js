

const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
         unique: true,
    },
    password:{
        type:String,
     
    },
    role:{
        type:String,
        default:"user"
    },
    picture:{
        type:String
    },
    googleId:{
        type:String
    },
    credit: {
        type: Number,
        default: 0
    },
     hasPaid: { type: Boolean, default: false }, 
    isVerified: { type: Boolean, default: false }
},
{timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;

