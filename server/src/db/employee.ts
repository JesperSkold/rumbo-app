// import { query } from "./db";
// import mongoose from "mongoose"
import Employee from "../models/employee"

// const employeeSchema = new mongoose.Schema({email:String, firstname:String, lastname:String, fullname:String})
// const Employee = mongoose.model('Employee', employeeSchema)


export const getEmployees = async () => {
   const employees = await Employee.find({})
    return employees
}

// export const getEmployees = async () => {
//     const sqlQuery = `SELECT * FROM public.employees`;
//     return await query(sqlQuery);
// }; 


