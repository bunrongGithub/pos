import mongoose, { Schema } from "mongoose";
import IUserSchema from "../interfaces/user.interface";


const userSchema = new Schema<IUserSchema>({
    username: {type: String, required: true}
})

export const userModel = mongoose.model("users", userSchema)