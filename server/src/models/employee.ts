import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({
  email:String, 
  firstname:String,
  lastname:String,
  fullname:String
})

export default mongoose.model("Employee", employeeSchema)