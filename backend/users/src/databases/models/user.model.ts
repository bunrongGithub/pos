import mongoose, { Schema } from "mongoose";
import IUserSchema from "../interfaces/user.interface";


const userSchema = new Schema<IUserSchema>({
    username: { type: String, required: true },
    phone_number: { type: String },
    email: { type: String, required: true },
    gender: { type: String, enum: ["M", "F"], required: true },
    role: { type: String, enum: ["user", "admin"], default: "user", required: true },
    profile: { type: String },
    user_status: { type: String, enum: ["verify", "unverfiy"], default: "unverfiy" },
    description: { type: String },
    email_verified: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false })

export const userModel = mongoose.model("users", userSchema)