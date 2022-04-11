import { query } from "./db";
import { TimeReport } from "../types";
import TimeReportModel from "../models/timereport";

type getTimeReportFilter = {
	email?: string;
	year?: number;
	month?: number;
	project?: string;
};




export const getTimeReport = async ({ email, year, month, project }: getTimeReportFilter) => {
let queries = {}
if (email) {
	queries['email'] = email 
}
if(year && !month){
	queries['time'] = {$gt: new Date(year, 0, 1), $lt: new Date(year+1, 0, 1)}
}
if(month && year){
	queries['time'] = {$gt: new Date(year, month-1, 1), $lt: new Date(year, month, 1)}
}
if(project){
	queries['project'] = project
}
return await TimeReportModel.find(queries)
}

export const getTimeReportById = async (timeReportId: string) => {
    const result = await TimeReportModel.find({_id: timeReportId}) 
	return result["length"] === 0 ? null : result[0];
	

};



export const deleteTimeReportById = async (timeReportId: string) => {
	await TimeReportModel.deleteOne({ _id: timeReportId }); 
};


export const getTimeReportMeta = async (email: string) => {
	const res = await TimeReportModel.aggregate([ {$match: {'email': email}}, {$group: { _id: {year: {$year: "$time" }, month: {$month: "$time"}}}}])
	return res.map(meta => ({year: Number(meta._id.year), month: Number(meta._id.month)}))
}


export const addTimeReport = async (timeReport: TimeReport) => { 
    const createdTimeReport = new TimeReportModel(timeReport)
    await createdTimeReport.save()
    return createdTimeReport
};

export const updateTimeReport = async (timeReport: TimeReport, id:string) => {
	const doc = await TimeReportModel.findOneAndUpdate( timeReport)
	return doc 
};
