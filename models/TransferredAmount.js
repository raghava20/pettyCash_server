import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transferredAmountSchema = new Schema({
    bankName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    }
},
    { timestamps: true })

export const TransferredAmount = mongoose.model('TransferredAmount', transferredAmountSchema, "credit")