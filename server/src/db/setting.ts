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

export const setSetting = async (key: string, value: string) => {
  const createdSetting = await SettingModel.create({
    key:key,
    value:value
  })
  createdSetting.save()
}

