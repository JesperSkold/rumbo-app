import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  customer_name:String, 
  project_name:String,
  agreement_ref:String,
  active:Boolean,
  currentDate:Date
})

export default mongoose.model("Project", projectSchema)