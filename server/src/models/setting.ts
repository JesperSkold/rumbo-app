import mongoose, {Schema} from "mongoose"
import Isetting from '../interfaces/project'

const settingSchema: Schema = new Schema({
  id:{type: Number, required: true}, 
  key:{type: String, required:true},
  value:{type: String, required:true},

})


export default mongoose.model<Isetting>("Setting", settingSchema)