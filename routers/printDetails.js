import express from "express";
import { PrintDetails } from "../models/PrintDetails.js"

const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        var response = await PrintDetails.find();                 //find will get all data from respective collection
        res.send(response)
    }
    catch (err) {
        res.send(err)
    }
}).post(async (req, res) => {
    const { companyName, address, email, contact } = req.body;      //Destructured the data from UI
    const result = new PrintDetails({                               //schema to add data to respective collection
        companyName: companyName,
        address: address,
        email: email,
        contact: contact
    })
    try {
        var response = await result.save();                         //saving data to database 
        res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }
}).put(async (req, res) => {
    const { companyName, address, email, contact } = req.body;

    var findDetails = await PrintDetails.find()                     //find will get all data from respective collection
    if (findDetails) {
        try {
            let result = await PrintDetails.updateMany({}, { $set: { companyName, address, email, contact } })      //updateMany will update the data provided to the respective collection
            return res.send(result)

        }
        catch (err) {
            return res.send(err)
        }
    }
    const result = new PrintDetails({                               //schema to add data to respective collection
        companyName: companyName,
        address: address,
        email: email,
        contact: contact
    })
    try {
        let response = await result.save();                         //saving the data to respective collection on mongodb
        return res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

export const printDetailsRouter = router;