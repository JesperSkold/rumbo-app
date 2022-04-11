import Transaction from "../models/transaction"
export const getDescriptionsByEmail = async (myEmail: string) => {
    const emailStr = myEmail
    const descriptions = await Transaction.find({email: emailStr})
    return descriptions

};
