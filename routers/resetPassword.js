import express from "express";
import { User } from "../models/Users.js";
import _ from "lodash";
import jwt from "jsonwebtoken"

const router = express.Router();

router.route("/").put((req, res) => {
    const { resetLink, newPassword } = req.body;

    if (resetLink) {
        jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (err, decodedData) => {       //check jwt token is valid or not
            if (err) {
                return res.send({ message: "Incorrect token or it is expired!" })
            }
            User.findOne({ resetLink: resetLink }, (err, user) => {             //findOne will check the db with the resetLink provided
                if (err || !user) {
                    return res.status(400).send({ message: "User with this token doesn't exists." })
                }

                const obj = {
                    password: newPassword,
                    resetLink: ''
                }
                user = _.extend(user, obj)                  //lodash library for updating user with provided data
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).status.send({ message: "Reset Password error" })
                    }
                    else {
                        return res.status(200).send({ message: "Your password has been changed successfully!" })
                    }
                })


            });
        })
    }
    else {
        return res.status(401).send({ message: "Authentication error!!!" })
    }
})

export const resetPasswordRouter = router;