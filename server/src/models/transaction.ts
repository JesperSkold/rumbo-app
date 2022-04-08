import mongoose, { Schema } from "mongoose"
import Itransaction from "../interfaces/transaction"

const descriptionSchema: Schema = new Schema ({ //rename descriptionSchema to transactionSchema
  email:{type: String, required: true}, 
  time:{type: Number, required:true},
  amount:{type: Number, required:true},
  description:{type: String, required:true}, 
  created_at:{type: Date, required:true}, 
  status:{type: Number, required:true}, 
  source_reference:{type : { preference1 : String}, default : null}
})

export default mongoose.model<Itransaction>("Transaction", descriptionSchema)