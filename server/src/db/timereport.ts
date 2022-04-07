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
	// let where = []; //['email = $1', 'DATE_PART('year',"time") = 2', 'DATE_PART('month',"time") = 3', 'project_id = 4' ]
	// let params = []; // 
	// if (email) {
	// 	params.push(email);
	// 	where.push(`email = $${params.length}`);
	// }
	// if (year) {
	// 	params.push(year);
	// 	where.push(`DATE_PART('year',"time") = $${params.length}`);
	// }
	// if (month) {
	// 	params.push(month);
	// 	where.push(`DATE_PART('month',"time") = $${params.length}`);
	// }
	// if (project) {
	// 	params.push(project);
	// 	where.push(`project_id = $${params.length}`);
	// }

	// const whereClause = !where.length ? "" : "WHERE " + where.join(" AND "); // WHERE EMAIL = $1 AND DATE_PART('year',"time") = 2' AND  'DATE_PART('month',"time") = 3 
	// const sqlQuery = `SELECT * FROM (SELECT id, email, time, description, hours, project_id FROM public.time_reports) AllTimeReports ${whereClause}`; // VAD ÄR ALLTIMEREPORTS? ALIAS?
	// console.log(sqlQuery, "QUERY");
	// console.log(params, "PARAMS");
	// return query(sqlQuery, params).then((res) => res as TimeReport[]); //SELECT id, email, time, description, hours, 
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
// return await TimeReportModel.find({time: {$gt: new Date(), $lt: new Date()}})
// return await TimeReportModel.find({email:email})
// let lol
// if (month && year) {
// 	lol = await TimeReportModel.find({time:{$where : `return this.time.getMonth() == ${month}`, `return this.time.getYear() == ${month}`}})
// }else if(month){
// 	lol = await TimeReportModel.find({$where : `return this.time.getMonth() == ${month}`})
// }else if(year){
// 	lol = await TimeReportModel.find({$where : `return this.time.getYear() == ${month}`})
// }
// const lol = await TimeReportModel.find({$where : `return this.time.getMonth() == ${month}`})
// console.log(month);
// console.log(year);

// const lol = await TimeReportModel.find({})
// console.log(lol, "AEWWWE");
// return lol
//
// return await TimeReportModel.find({$where : `return this.date.getMonth() == ${month}`})
// 	const timeReports = TimeReportModel.aggregate([
// 		{$match:
// 		 {email:email, time: new Date(`${year}-${month}-06T22:00:00.000Z`)}
// 		}]).then((res) => res as TimeReport[])
// 		return timeReports

// return await TimeReportModel.find({time: {$gt: new Date(), $lt: new Date()}})
}

export const getTimeReportById = async (timeReportId: string) => {
	console.log(timeReportId, "FROM ID")
    const result = await TimeReportModel.find({_id: timeReportId}) //Change ID
    console.log(result["length"], "<---- LNGTH");
    
	return result["length"] === 0 ? null : result[0];
	

};



export const deleteTimeReportById = async (timeReportId: string) => {
	console.log(timeReportId, "FROM ID")
	await TimeReportModel.deleteOne({ _id: timeReportId }); //Change ID
};


/*
export const getTimeReportMeta = async (email: string) => {
	const result = await TimeReportModel.find({ })
}
*/
export const getTimeReportMeta = async (email: string) => {
	const sqlQuery = `SELECT
                        EXTRACT(year from time) as year,
                        EXTRACT(month from time) as month
                    FROM
                        ((SELECT time FROM time_reports WHERE email = 
                        $1)
                        UNION (SELECT NOW() as time)) as nested
                    GROUP BY EXTRACT(month from time), EXTRACT(year from time)
                    ORDER BY year, month`;

	/*
        export const getTimeReportMeta = async (
            email: string
        ) => {
            const timeReports = await TimeReportModel.find({})
        }
    */
	const res: any = await query(sqlQuery, [email]);
	return res.map((meta) => ({ year: Number(meta.year), month: Number(meta.month) }));
};

export const addTimeReport = async (timeReport: TimeReport) => { //do next
    console.log(timeReport, "<--TIME REPORT");
    const createdTimeReport = new TimeReportModel(timeReport)
    // const createdTimeReport = await TimeReportModel.create({
    //     id: timeReport.id,
    //     email: timeReport.email,
    //     time: timeReport.time,
    //     description: timeReport.description,
    //     hours: timeReport.hours,
    //     'project_id': timeReport.id,
    // })
    console.log(createdTimeReport, "CREATED TIME REPORT");
    await createdTimeReport.save()
    
    return createdTimeReport
	// return query('INSERT INTO public.time_reports(email, "time", description, hours, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
	// 	timeReport.email,
	// 	timeReport.time,
	// 	timeReport.description,
	// 	timeReport.hours,
	// 	timeReport.project_id,
	// ]);
};

export const updateTimeReport = (timeReport: TimeReport) => { //do next
	return query("UPDATE public.time_reports SET email = $1, time = $2, description = $3, hours = $4, project_id = $5 WHERE id = $6 RETURNING *", [
		timeReport.email,
		timeReport.time,
		timeReport.description,
		timeReport.hours,
		timeReport.project_id,
		timeReport._id,
	]);
};
