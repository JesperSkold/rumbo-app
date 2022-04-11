import { query } from "./db";
import Project from "../models/project"


export const getProjects = async (
    email?: string
) => {
    if (email) {
        const projects = await Project.find({email:email})
        return projects
    }else{
        const projects = await Project.find({}, {project_name:true})
        return projects
    }
}
