import express from "express";
import { Expenses } from "../models/Expenses.js";
import { Accounts } from "../models/Accounts.js";

const router = express.Router();


router.route("/").get(async (req, res) => {
    try {
        var response = await Expenses.find();
        res.send(response)
    }
    catch (err) {
        res.send(err)
    }

}).post(async (req, res) => {
    const { accountName } = req.body;

    const acc = new Accounts({
        accountName: accountName,
    })
    console.log(acc)

    try {
        var response = await acc.save();
        res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }

})


export const dashboardRouter = router;