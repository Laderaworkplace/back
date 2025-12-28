import express from "express";
import upload from "../middlerware/multerconfig.js";
import {
  addemployeeData,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../controller/admindataController.js";
import adminLogin from "../controller/adminloginController.js";

const adminRouter = express.Router();
adminRouter.post("/admin-login", adminLogin);
adminRouter.get("/get-employees", getEmployees);
adminRouter.post("/add-employee", upload.single("image"), addemployeeData);
adminRouter.put("/update-employee/:id", upload.single("image"), updateEmployee);
adminRouter.delete("/delete-employee/:id", deleteEmployee);

export default adminRouter;
