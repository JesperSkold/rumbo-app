import mongoose, { Schema } from "mongoose"
// import Itransaction from "../interfaces/transaction"
import { Transaction } from "../types"

const transactionSchema: Schema = new Schema ({ //rename descriptionSchema to transactionSchema
  email:{type: String, required: true}, 
  time:{type: Date, required:true},
  amount:{type: Number, required:true},
  description:{type: String, required:true}, 
  created_at:{type: Date}, 
  sum:{type: Number},
  source_reference:{type: String},
  status:{type: Number}, 
  // source_reference:{type : { preference1 : String}, default : null}
})

export default mongoose.model<Transaction>("Transaction", transactionSchema)