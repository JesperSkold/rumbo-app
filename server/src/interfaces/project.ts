import { Document } from "mongoose"

export default interface Iproject extends Document {
    customer_name:string, 
    project_name:string,
    agreement_ref:string,
    active:boolean,
    currentDate:Date
}