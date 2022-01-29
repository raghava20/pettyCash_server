import express from "express";
import { PrintDetails } from "../models/PrintDetails.js"

const router = express.Router();

router.route("/").get(async (req, res) => {

    try {
        var response = await PrintDetails.find();
        res.send(response)
    }
    catch (err) {
        res.send(err)
    }
}).post(async (req, res) => {
    const { companyName, address, email, contact } = req.body;

    const result = new PrintDetails({
        companyName: companyName,
        address: address,
        email: email,
        contact: contact
    })
    try {
        var response = await result.save();
        res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }
}).put(async (req, res) => {
    const { companyName, address, email, contact } = req.body;

    var findDetails = await PrintDetails.find()
    if (findDetails) {
        try {
            let result = await PrintDetails.updateMany({}, { $set: { companyName, address, email, contact } })
            return res.send(result)

        }
        catch (err) {
            return res.send(err)
        }
    }
    const result = new PrintDetails({
        companyName: companyName,
        address: address,
        email: email,
        contact: contact
    })
    try {
        let response = await result.save();
        return res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

export const printDetailsRouter = router;