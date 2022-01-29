import mongoose from "mongoose";

export const mongo = () => {            //connection to mongodb from mongoose
    try {
        console.log("Mongo db is connected")
        mongoose.connect(process.env.MONGO_URL)
    }
    catch (err) {
        console.log(err)
        process.exit()
    }
}