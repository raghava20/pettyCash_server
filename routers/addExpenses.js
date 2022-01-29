import express from "express";
import { Expenses } from "../models/Expenses.js";

const router = express.Router();

router.route('/').post(async (req, res) => {
    const { expensesCategory, date, amount, description } = req.body;       //Destructured the data from UI
    const exp = new Expenses({                      //Expenses schema will add the data to mongodb
        expensesCategory: expensesCategory,
        date: date,
        amount: amount,
        description: description,
    })
    try {
        var response = await exp.save();            //saving the expenses on the mongodb
        res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

export const addExpensesRouter = router;