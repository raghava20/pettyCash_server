import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accountsSchema = new Schema({
    accountName: {
        type: String,
        required: true
    }
},
    { timestamps: true })

export const Accounts = mongoose.model('Accounts', accountsSchema, "accounts")