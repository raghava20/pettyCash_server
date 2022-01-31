import mongoose from "mongoose";

export const mongo = () => {            //connection to mongodb from mongoose
    try {
        mongoose.connect(process.env.MONGO_URL)
    }
    catch (err) {
        process.exit()
    }
}