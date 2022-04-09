import { query } from "./db";
import { Transaction } from "../types";
import SettingModel from '../models/setting'

type Setting = {
  _id: string;
  key: string;
  value: string;
};

 
export const getSetting = async (key: string) => {
 const result = await SettingModel.find({key:key}) as Setting[]
 return result.length ? result[0].value : null; 
}

// export const getSetting = async (key: string) => {
//   const sqlQuery = `SELECT * FROM public.settings WHERE key = $1`;
//   const result = await query(sqlQuery, [ key ]) as Setting[];
//   return result.length ? result[0].value : null;
// };



export const setSetting = async (key: string, value: string) => {
  const createdSetting = await SettingModel.create({
    key:key,
    value:value
  })
  console.log(createdSetting);
  createdSetting.save()
}

// export const setSetting = (key: string, value: string) => {
//   return query(
//     `INSERT INTO public.settings(key, value) VALUES($1, $2) ON CONFLICT ("key") DO UPDATE SET value = $2`,
//     [
//       key,
//       value
//     ]
//   );
// };
