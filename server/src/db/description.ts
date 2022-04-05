import { query } from "./db";
import Transaction from "../models/transaction"
import { ModuleResolutionKind } from "typescript";
export const getDescriptionsByEmail = async (myEmail: string) => {
    // const sqlQuery = `SELECT DISTINCT description FROM public.transactions WHERE email LIKE $1`;
    // return await query(sqlQuery, [ email ]);
    const emailStr = myEmail //måste man mellanlagra?
    const descriptions = await Transaction.find({email: emailStr}) //add distinct
    return descriptions

};
