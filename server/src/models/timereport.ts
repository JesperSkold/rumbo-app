import mongoose, { Schema }from "mongoose"
import Itimereport from "../interfaces/timereport"

const timereportSchema: Schema = new Schema({
  id: {type: Number, required: true},
  email:{type: String, required: true}, 
  time:{type: String, required:true},
  hours:{type: Number, required:true},
  description:{type: String, required: true},
  created_at:{type: Date, required: true},
  project_id:{type: String, required:true}, 
})

export default mongoose.model<Itimereport>("time_report", timereportSchema)

/*

  email:string,
  time:string, //string or date or w/e?
  hours:number,
  description:string,
  created_at: Date,
  project_id:string

*/