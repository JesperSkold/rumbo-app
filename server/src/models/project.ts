import mongoose, {Schema} from "mongoose"
import Iproject from '../interfaces/project'

const projectSchema: Schema = new Schema({
  customer_name:{type: String, required: true}, 
  project_name:{type: String, required:true},
  agreement_ref:{type: String, required:true},
  active:{type: String, required:true},
  currentDate: {type: Date, required:true}
})


export default mongoose.model<Iproject>("Project", projectSchema)