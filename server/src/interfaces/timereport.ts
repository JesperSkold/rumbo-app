import { Document } from "mongoose"

//   id: number,
//   email:string,
//   time:string, //string or date or w/e?
//   hours:number,
//   description:string,
//   created_at: Date,
//   project_id:string
// }//email, time, hours, description, created_at, projekt_id LÄGG TILL
export default interface Itimereport extends Document {
  id?: number,
  email: string;
  time: Date;
  description: string;
  hours: number;
  project_id: number;
}//email, time, hours, description, created_at, projekt_id LÄGG TILL
