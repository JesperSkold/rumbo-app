import { query } from "./db";
import Project from "../models/project"


export const getProjects = async (
    email?: string
) => {
    if (email) {
        console.log("email");
        
        // Project.find FIX so when email exists: whereClause = `WHERE public.employees.email = $1`;
//         params = [ email ]
    }
    const projects = await Project.find({}, {id: true,project_name:true,})
    
    return projects
}

// export const getProjects = async (
//     email?: string
// ) => {
//     let whereClause = '';
//     let params = [];
//     if (email) {
//         whereClause = `WHERE public.employees.email = $1`;
//         params = [ email ]
//     }

//     const sqlQuery = `SELECT public.projects.id, public.projects.project_name FROM public.projects`;
    
//     return query(sqlQuery, params);
// }