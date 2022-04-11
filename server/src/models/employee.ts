import mongoose, { Schema }from "mongoose"
import Iemployee from "../interfaces/employee"

const employeeSchema: Schema = new Schema({
  email:{type: String, required: true}, 
  firstname:{type: String, required:true},
  lastname:{type: String, required:true},
  fullname:{type: String, required:true},
})

export default mongoose.model<Iemployee>("Employee", employeeSchema)