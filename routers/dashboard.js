import express from "express";
import { DashboardAmt } from "../models/DashboardAmt.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        var response = await DashboardAmt.find();           //find will get all data from respective collection
        res.send(response)
    }
    catch (err) {
        res.send(err)
    }
}).post(async (req, res) => {
    const { amount } = req.body;                            //Destructured the data from UI
    const acc = new DashboardAmt({                          //schema to add data to respective collection
        amount: amount,
    })
    try {
        var response = await acc.save();                    //saving data to database
        res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }
}).delete(async (req, res) => {
    var response = await DashboardAmt.deleteMany();        //delete all data in the respective collection
    res.send(response)
})

export const dashboardRouter = router;