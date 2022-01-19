import mongoose from "mongoose";

export const mongo = () => {
    try {
        console.log("Mongo db is connected")
        mongoose.connect(process.env.MONGO_URL)
    }
    catch (err) {
        console.log(err)
        process.exit()
    }
}