import mongoose from "mongoose";
import { Schema } from "mongoose";

const user = new Schema({
    name: String,
    email: String,
    password: String,
    confirmPassword: String,
    access_token: String
});

export default mongoose.model("user", user);