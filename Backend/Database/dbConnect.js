




const mongoose=require('mongoose')
require('dotenv').config()

const dBconnect=async()=>{

try {
 

    await mongoose.connect(process.env.dbURL)
    console.log("DB Connected Sucessfully")

    
} catch (error) {

    console.log(error.message);
    process.exit(1)
    
    
}



}


module.exports= dBconnect;