import express from "express";
import { User } from "../models/Users.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail"

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

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)          //sendGrid package for sending email messages
        const msg = {
            to: email, // Change to your recipient
            from: process.env.ACC_EMAIL, // Change to your verified sender
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
                    sgMail
                        .send(msg)
                        .then(() => {
                            return res.send({ message: "Email has been sent, kindly follow the instructions." })        //mail will send only if the token is valid
                        })
                        .catch((error) => {
                            return res.send({ message: error })
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