import express from "express";
import { Expenses } from "../models/Expenses.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        var response = await Expenses.find();                   //find will get all data from respective collection
        res.send(response)
    }
    catch (err) {
        res.send(err)
    }
})

router.route("/:id").delete(async (req, res) => {
    const { id } = req.params;
    var response = await Expenses.findByIdAndRemove(id)         //delete the data by ID from the endpoint
    res.send(response)
})

export const expensesListRouter = router;