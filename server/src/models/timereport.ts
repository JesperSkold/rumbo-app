import mongoose, { Schema }from "mongoose"
import Itimereport from "../interfaces/timereport"

const timereportSchema: Schema = new Schema({
  email:{type: String, required: true}, 
  time:{type: Date, required:true},
  description:{type: String, required: true},
  hours:{type: Number, required:true},
  project_id:{type: String, required:true}, 
})

export default mongoose.model<Itimereport>("time_report", timereportSchema)
