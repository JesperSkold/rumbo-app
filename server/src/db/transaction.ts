import { query } from "./db";
import { Transaction, TransactionStatus } from "../types";
import TransactionModel from "../models/transaction";

type getTransactionFilter = {
  email?: string;
  year?: number;
  month?: number;
  description?: string;
};


export const getTransactions = async ({email, year, month, description} : getTransactionFilter) => {
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
if(description){
  queries['description'] =  `/^${description}/i`
}

return await TransactionModel.find(queries)
}

export const getTransactionById = async (transactionId: string) => {
  const result = await TransactionModel.find({'_id': transactionId})
  return result['length'] === 0 ? null : result[0];
};


export const deleteTransactionById = async (transactionId: string) => {
  await TransactionModel.deleteOne({'_id': transactionId}) 
};

export const getTransactionsMeta = async (email:string) => {
  const res = await TransactionModel.aggregate([
    {$match: {'email': email}}, {$group: { _id:{year: {$year: "$time" }, month: {$month: "$time"}}}}
  ])
  return res.map(meta => ({year: Number(meta._id.year), month: Number(meta._id.month)}))
}


export const addTransaction = async (transaction: Transaction) => {
    const createdTransaction = await TransactionModel.create({
    email: transaction.email,
    time: transaction.time,
    amount: transaction.amount,
    description: transaction.description,
    status: TransactionStatus.Final
    })
  return createdTransaction
};


export const filterOutExistingTransactions = async (transactions: Transaction[]): Promise<Transaction[]> => {
  if (transactions.length === 0) {
    return [];
  }
  const sqlQuery = `SELECT source_reference FROM "transactions" WHERE source_reference in (${transactions.map((transaction, index) => "$" + (index + 1)).join(", ")})`;
  const params = transactions.map(transaction => transaction.sourceReference);
  const existingTransactionSourceReferences = (await query(sqlQuery, params) as any[])
    .map(existingTransaction => existingTransaction.source_reference);
  return transactions.filter(transaction => existingTransactionSourceReferences.indexOf(transaction.sourceReference) === -1);
}