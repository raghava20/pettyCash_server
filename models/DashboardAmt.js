import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dashboardAmtSchema = new Schema({
    amount: {
        type: Number,
        required: true
    }
},
    { timestamps: true })

export const DashboardAmt = mongoose.model('DashboardAmt', dashboardAmtSchema, "dashboard")