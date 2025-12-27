import employeeModels from "../models/empdatModel.js";
import { v2 as cloudinary } from "cloudinary";

///guys this function is for create the demployee data
export const addemployeeData = async (req, res) => {
    try {
        const {
            employeeid, empname, email, phone, department, designation, salary, joining, employeetype, bankstatus, managername, address, city, state, country
        } = req.body
        const imageFile = req.file;
        if (!employeeid || !empname || !email || !phone || !department || !designation || !salary || !joining || !employeetype || !bankstatus || !managername || !address || !city || !state || !country) {
            return res.status(400).json({ success: false, message: "fill the all inputs" })
        }
  let imageUrl = "";
  if(imageFile){
    const result = await cloudinary.uploader.upload(file.path,{
        resource_type:"image"
    })
    imageUrl=result.secure_url;
  }
        const employeeData = {
            image: imageUrl, employeeid, empname, email, phone, department, designation, salary, joining, employeetype, bankstatus, managername, address, city, state, country
        };
        const newEmployee = new employeeModels(employeeData);
        await newEmployee.save()
        res.status(200).json({ success: true, message: "Employee Added Successfully", data: newEmployee });

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message })
    }
}
export const updateEmployee = async(req,res)=>{
    try {
          const {
            employeeid, empname, email, phone, department, designation, salary, joining, employeetype, bankstatus, managername, address, city, state, country
        } = req.body
        const imageFile = req.file;
        const id=req.params.id
         if (!employeeid || !empname || !email || !phone || !department || !designation || !salary || !joining || !employeetype || !bankstatus || !managername || !address || !city || !state || !country) {
            return res.status(400).json({ success: false, message: "fill the all inputs" })
        }
         const updateData = {
             employeeid, empname, email, phone, department, designation, salary, joining, employeetype, bankstatus, managername, address, city, state, country
        };
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{
                resource_type:"image",
            })
            updateData.image=imageUpload.secure_url;
        }
        const updatedEmployee = await employeeModels.findByIdAndUpdate(id,updateData,{new:true});
        if(!updateEmployee){
            return res.status(400).json({ success: false, message: "employee not found" });
        }
         res.json({
      success: true,
      message: "Employee updated successfully",
      updatedEmployee,
    });
    } catch (error) {
         console.log(error);
    res.status(400).json({ success: false, message: error.message });
    }
}

export const deleteEmployee = async(req,res)=>{
  try {
      const id=req.params.id;
    const deleteemployee = await employeeModels.findByIdAndDelete(id);
    if(!deleteemployee){
           return res
        .status(300)
        .json({ success: false, message: "Contact not found" });
    }
      res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      deleteemployee,
    });
  } catch (error) {
     console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
}