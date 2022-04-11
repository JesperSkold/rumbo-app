import { Document } from "mongoose"

export default interface Itimereport extends Document {
  _id?: string,
  email: string;
  time: Date;
  description: string;
  hours: number;
  project_id: string;
}
