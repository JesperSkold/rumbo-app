import { query } from "./db";
import Transaction from "../models/transaction"


export const getDescriptionsByEmail = async (myEmail: string) => {
    // const sqlQuery = `SELECT DISTINCT description FROM public.transactions WHERE email LIKE $1`;
    // return await query(sqlQuery, [ email ]);
    const emailStr = myEmail
    console.log(emailStr);
    const descriptions = await Transaction.find({email: emailStr})
    return descriptions

};
