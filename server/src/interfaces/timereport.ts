import { Document } from "mongoose"

//   id: number,
//   email:string,
//   time:string, //string or date or w/e?
//   hours:number,
//   description:string,
//   created_at: Date,
//   project_id:string
// }
export default interface Itimereport extends Document {
  id?: string,
  email: string;
  time: Date;
  description: string;
  hours: number;
  project_id: number;
}
