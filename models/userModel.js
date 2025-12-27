import mongoose from 'mongoose';
//guys this is the schema for register the userprofile 
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
})

const userModel = mongoose.model.user || mongoose.model("userProfile",userSchema)

export default userModel;