import express from "express";
import { DashboardAmt } from "../models/DashboardAmt.js";
import { PrintDetails } from "../models/PrintDetails.js"

const router = express.Router();


router.route("/").get(async (req, res) => {
    try {
        var response = await DashboardAmt.find();
        res.send(response)
    }
    catch (err) {
        res.send(err)
    }

}).post(async (req, res) => {
    const { amount } = req.body;

    const acc = new DashboardAmt({
        amount: amount,
    })

    try {
        var response = await acc.save();
        res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }

}).delete(async (req, res) => {
    var response = await DashboardAmt.deleteMany();
    res.send(response)
})

export const dashboardRouter = router;