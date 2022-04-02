import express from 'express';
import { getEmployees } from "../db/employee";

const router = express.Router();

router.get('/', async (req, res) => {
  const employees = await getEmployees();
  console.log(employees);
  
  res.json(employees);
})

export default router;