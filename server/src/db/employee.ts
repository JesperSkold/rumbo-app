import Employee from "../models/employee"



export const getEmployees = async () => {
   const employees = await Employee.find({})
    return employees
}
