
import mongoose from "mongoose";

const employeedataSchema=new mongoose.Schema({
    //guys this is basic employee detail guys
    image:{type:String,default:"",},
    employeeid:{type:String,required:true},
    empname:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    //guys this is professional details guys
    department:{type:String,required:true},
    designation:{type:String,required:true},
    salary:{type:String,required:true},
    joining:{type:String,required:true},
    employeetype:{type:String,required:true},
    //guys this is accounts details
    bankstatus:{type:String,required:true},
    managername:{type:String,required:true},
    //guys this is staff address details
    address:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true}
},{minimize:false})

const employeeModels = mongoose.model.employees || mongoose.model("employees",employeedataSchema)
export default employeeModels;