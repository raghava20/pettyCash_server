import express from "express";
import { User } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.route("/").post(async (req, res) => {

    const { email, password } = req.body;
    var existUser = await User.findOne({ email: email }).exec();
    if (!existUser) return res.status(400).send({ message: "Email not registered" });

    try {
        if (await bcrypt.compare(password, existUser.password)) {
            const token = await jwt.sign({ id: existUser._id }, process.env.SECRET_KEY, { expiresIn: "8h" });
            res.status(200).send(token)
        }
        else {
            res.status(401).send({ message: "Invalid Credentials" })
        }
    }
    catch (err) {
        res.status(500).send(err)
    }

})

export const loginRouter = router;