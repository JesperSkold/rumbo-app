import express from 'express';
import { getTransactionById, deleteTransactionById, getTransactions, addTransaction } from "../db/transaction";
import { validationResult } from "express-validator";


const router = express.Router();

router.delete("/:transactionId", async (req, res) => {
    if (!req["isAdmin"]) {
      res.sendStatus(401).end();
    } else {
  
      const transactionId = req.params.transactionId;
      console.log(transactionId, "HI FROM TRANSACTION ROUTER");
  
      if (Number.isInteger(transactionId)) {
        return res.sendStatus(400);
      } else {
        const transaction = await getTransactionById(transactionId);
        console.log(transaction, "HEY FROM LINE 20 ROUTER TRANSACTION");
        
        if (!transaction) {
          res.sendStatus(404);
        } else {
          await deleteTransactionById(transactionId);
          res.json(transaction);
        }
      }
  
      res.json();
    }
  });

  router.get("/", (req, res) => {
    let filter: any = {
      email: req["user"],
    };
  
    if (req.query.user) {
      console.log(req["user"]);
    }
    if (req.query.year) {
      filter.year = req.query.year;
    }
    if (req.query.month) {
      filter.month = req.query.month;
    }
    console.log(filter,"FILTER FROM TRANSACROUTER");
    console.log(req.query,"queries FROM TRANSACROUTER");
    
    getTransactions(filter).then((transactions) => res.json(transactions));
  });

  router.post("/", async (req, res) => {
    if (!req["isAdmin"]) {
      res.sendStatus(401).end();
    } else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const newTransaction = await addTransaction({
        email: req.body.email,
        time: req.body.time,
        amount: req.body.amount,
        description: req.body.description,
      });
      console.log(newTransaction, "HI FROM NEWTRANSACTION ROUTER");
      
      res.json(newTransaction[0]);
    }
  });

  export default router;