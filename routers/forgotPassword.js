import express from "express";
import { User } from "../models/Users.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const router = express.Router();
const CLIENT_URL = "https://quirky-keller-607fbf.netlify.app"

router.route("/").put((req, res) => {
    const { email } = req.body;

    User.findOne({ email: email }, (err, user) => {                  //findOne will check the db with the email provided
        if (err || !user) {                                          //return if email not exists
            return res.status(400).send({ message: "User with this email doesn't exists." })
        }

        //creating token
        const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: "20m" })

        var transporter = nodemailer.createTransport({              //nodemailer package for sending email messages
            service: "gmail",
            auth: {
                user: process.env.ACC_EMAIL,
                pass: process.env.ACC_PASSWORD
            }
        })
        var compose = {
            from: process.env.ACC_EMAIL,
            to: email,
            subject: "Your New Password Resetting Link",
            html: `<h2>Please click on given link to reset your password</h2>
                <p>${CLIENT_URL}/reset-password/${token}</p>`
        }

        try {
            return user.updateOne({ resetLink: token }, (err, success) => {      //updateOne will update the user with current reset link
                if (err) {
                    return res.status(400).send({ message: "Reset Password link error" })
                }
                else {
                    transporter.sendMail(compose, (err, info) => {          //mail will send only if the token is valid
                        if (err) {
                            return res.send({ message: err.message })
                        }
                        else {
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