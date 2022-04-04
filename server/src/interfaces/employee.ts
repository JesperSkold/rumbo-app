import { Document } from "mongoose"

export default interface Iemployee extends Document {
  email:string, 
  firstname:string,
  lastname:string,
  fullname:string
}