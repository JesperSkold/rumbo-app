import mongoose, { Schema }from "mongoose"
import Itimereport from "../interfaces/timereport"

const timereportSchema: Schema = new Schema({
  email:{type: String, required: true}, 
  year:{type: Number, required:true},
  month:{type: Number, required:true},
  project:{type: String, required:true}, 
})

export default mongoose.model<Itimereport>("Timereport", timereportSchema)

