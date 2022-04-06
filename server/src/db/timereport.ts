import { query } from "./db";
import { TimeReport } from "../types";
import TimeReportModel from "../models/timereport";

type getTimeReportFilter = {
	email?: string;
	year?: number;
	month?: number;
	project?: string;
};
/**
 db.timereport.aggregate([
	 db.timereport.find({'id', 'email': email, 'time', 'descriptions', 'hours', project_id})
	 time:{
{
		$dateFromParts:{'year': year, 'month': month} 
	 }
	 }
	 
 ])
 */

 /*
 	
  db.timereport.find({'id', 'email': email, 'time', 'descriptions', 'hours', project_id})
  */
export const getTimeReport = async ({ email, year, month, project }: getTimeReportFilter) => {
	// let where = []; //['email = $1', 'DATE_PART('year',"time") = 2', 'DATE_PART('month',"time") = 3', 'project_id = 4' ]
	// let params = []; // ['celly.com', '1999', '04', 'dressman']
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

	// const whereClause = !where.length ? "" : "WHERE " + where.join(" AND "); // WHERE EMAIL = $1 AND DATE_PART('year',"time") = 2' AND  'DATE_PART('month',"time") = 3 //DATE PART LÄGGER I HOPP ALLT TILL TIME VARIABLE
	// const sqlQuery = `SELECT * FROM (SELECT id, email, time, description, hours, project_id FROM public.time_reports) AllTimeReports ${whereClause}`; // VAD ÄR ALLTIMEREPORTS? ALIAS?
	// console.log(sqlQuery, "QUERY");
	// console.log(params, "PARAMS");
	// return query(sqlQuery, params).then((res) => res as TimeReport[]); //SELECT id, email, time, description, hours, project_id FROM public.time_reports HAMNAR I TIMEREPORT TYPEN
	// const timeReports = await TimeReportModel.find({email:email}) //använd MATCH timeReports.aggregate
	// console.log(timeReports, "MONGO TIMEREPORTS");
	// const lol = TimeReportModel.aggregate([time: {$dateFromParts: {'year':year, 'month':month}}])
	// const timeReports = TimeReportModel.aggregate([
	// 	{$match:
	// 	 {}
	// 	},
	// 	{$group:{_id: '$email', time: {$dateFromParts: {'year':year, 'month':month}}}}
	// 	// time: {$dateFromParts: {'year':year, 'month':month}}
	// ]).then((res) => res as TimeReport[])
	// return timeReports

	// const timeReports = TimeReportModel.aggregate([
	// 	{
	// 		time: {
	// 				$dateFromString: {

	// 			}
	// 		}
	// 	}
	// ])


// const yearMonth = `${year}-${month}`
// const timeReports = TimeReportModel.find({email:email, time:{$regex: yearMonth}}).then((res) => res as TimeReport[])
// console.log(timeReports);
let queries = {}
if (email) {
	queries['email'] = email
}
if(year){
	queries['year'] = year
}
if(month){
	queries['month'] = month
}
if(project){
	queries['project'] = project
}
return TimeReportModel.find(queries)
// return timeReports 
// console.log(year, "ÅR");
// console.log(month, "MÅNAD");

// 	const timeReports = TimeReportModel.aggregate([
// 		{$match:
// 		 {email:email, time: new Date(`${year}-${month}-06T22:00:00.000Z`)}
// 		}]).then((res) => res as TimeReport[])
// 		return timeReports
	// {$group:{_id: '$email', time: {$dateFromParts: {'year':year, 'month':month}}}}
	// time: {$dateFromParts: {'year':year, 'month':month}}	
}



/*
TimeReportModel.aggregate([
	{$match:
	 {email:email}
	},{$dateFromParts: {'year':year, 'month':year}}
])
/*
        db.transactions.find({email:email, }).then(res => res as TimeReport[]) 
        const whereClause = db.find({email:email, /$dateToPart, project:project})
        DB.FIND({email:email, time: `${year}-${month}, project:project`})
        */
export const getTimeReportById = async (timeReportId: number) => {
    const result = await TimeReportModel.find({id: timeReportId})
    console.log(result["length"], "<---- LNGTH");
    
	return result["length"] === 0 ? null : result[0]; // replace result["length"]??
	/*
    
    db.transactions.find({}).then(res)
    */
};



export const deleteTimeReportById = async (timeReportId: number) => {
	await TimeReportModel.deleteOne({ id: timeReportId });
};

/*

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
		timeReport.id,
	]);
};
