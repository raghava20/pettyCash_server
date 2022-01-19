import express from "express";
import { User } from "../models/Users.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.route("/").post(async (req, res) => {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email: email }).exec();

    if (existUser) return res.status(400).send({ message: "Email already exists" })

    //Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        name: name,
        email: email,
        password: hashedPassword
    })
    try {

        var response = await user.save();
        res.send(response)
    }
    catch (err) {
        res.send(err);
    }

})

export const signupRouter = router;