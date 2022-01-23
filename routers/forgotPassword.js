import express from "express";
import { User } from "../models/Users.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const router = express.Router();

router.route("/").put((req, res) => {
    const { email } = req.body;

    User.findOne({ email: email }, (err, user) => {
        if (err || !user) {
            return res.status(400).send({ message: "User with this email doesn't exists." })
        }
        const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: "20m" })

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.ACC_EMAIL,
                pass: process.env.ACC_PASSWORD
            }
        })
        var mailOptions = {
            from: process.env.ACC_EMAIL,
            to: email,
            subject: "Your New Password Resetting Link",
            html: `<h2>Please click on given link to reset your password</h2>
                <p>http://localhost:3000/reset-password/${token}</p>`
        }

        try {
            return user.updateOne({ resetLink: token }, (err, success) => {
                if (err) {
                    return res.status(400).send({ message: "Reset Password link error" })
                }
                else {
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            console.log(err)
                            return res.send({ message: err.message })
                        }
                        else {
                            console.log("Email sent" + info.response)
                            return res.send({ message: "Email has been sent, kindly follow the instructions." })
                        }
                    })
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    });

})

export const forgotPasswordRouter = router;