import { Document } from "mongoose"

export default interface Itransaction extends Document{
  email: string,
  time: number,
  amount: number,
  description: string,
  created_at: Date,
  status: number
  source: string,
}