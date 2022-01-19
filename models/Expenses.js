import mongoose from "mongoose";

const Schema = mongoose.Schema;

const expensesSchema = new Schema({
    expensesCategory: {
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
    description: {
        type: String,
        required: true
    }
})

export const Expenses = mongoose.model('Expenses', expensesSchema, "expenses")