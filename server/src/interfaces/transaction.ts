import { Document } from "mongoose"

export default interface Itransaction extends Document{
  email: string,
  time: number,
  amount: number,
  description: string,
  created_at: Date,
  status: number
  source: string,
} //not in use, using type from types/index instead for model