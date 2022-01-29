import mongoose from "mongoose";

const Schema = mongoose.Schema;

const printDetailsSchema = new Schema({
    companyName: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: Number
    }
},
    { timestamps: true })

export const PrintDetails = mongoose.model('PrintDetails', printDetailsSchema, "PrintDetails")