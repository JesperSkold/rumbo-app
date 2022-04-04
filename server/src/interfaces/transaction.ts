import { Document } from "mongoose"

// export default interface Idescription extends Document {
//   email:string, 
//   time:number,
//   amount:
// date  created_at:string,
//   fullname:string
// }
export default interface Itransaction extends Document{
  email: string,
  time: number,
  amount: number,
  description: string,
  created_at: Date,
  status: number
  source: string,
}