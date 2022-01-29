import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetLink: {                            //resetLink will trigger only on forgot password request is processed.
        dataType: String,
        default: ''
    }
}, { timestamps: true })

export const User = mongoose.model('User', userSchema, "users")