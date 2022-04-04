import { Document } from "mongoose"

export default interface Itimereport extends Document {
  email:string,
  year:number,
  month:number,
  project:string
}