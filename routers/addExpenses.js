import express from "express";
import { Expenses } from "../models/Expenses.js";


const router = express.Router();

router.route('/').post(async (req, res) => {
    const { expensesCategory, date, amount, description } = req.body;

    const exp = new Expenses({
        expensesCategory: expensesCategory,
        date: date,
        amount: amount,
        description: description,
    })

    try {
        var response = await exp.save();

        res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }

})

export const addExpensesRouter = router;