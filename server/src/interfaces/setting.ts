import { Document } from "mongoose"

export default interface Isetting extends Document {
    id:number, 
    key:string,
    value:string,
}