import express from "express";
import { TransferredAmount } from "../models/TransferredAmount.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        var response = await TransferredAmount.find();           //find will get all data from respective collection
        res.send(response)
    }
    catch (err) {
        res.send(err)
    }
}).post(async (req, res) => {
    const { bankName, accountNumber, date, amount } = req.body;

    const transfer = new TransferredAmount({                    //schema to add data to respective collection
        bankName: bankName,
        accountNumber: accountNumber,
        date: date,
        amount: amount
    })
    try {
        var result = await transfer.save();                   //saving the data to respective collection
        res.send(result);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

export const transferredAmountRouter = router;