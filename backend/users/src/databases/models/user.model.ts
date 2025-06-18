import mongoose, { Schema } from "mongoose";
import IUserSchema, { IUserRoles } from "../interfaces/user.interface";


const userSchema = new Schema<IUserSchema>({
    username: { type: String, required: true },
    companyId: { type: mongoose.Types.ObjectId, ref: "company" },
    phone_number: { type: String },
    email: { type: String, required: true },
    gender: { type: String, enum: ["M", "F"], required: true },
    role: { type: String, enum: IUserRoles, default: "user", required: true },
    user_status: { type: String, enum: ["active", "inactive", "suspended", "terminated"], default: "active" },
    description: { type: String },
    email_verified: { type: Boolean, default: false },
    passwordHash: { type: String, required: true },
    birthdate: { type: Date },
    two_factor_enabled: { type: Boolean, default: false },
    phone_verified: { type: Boolean, default: false },
    departmentId: { type: mongoose.Types.ObjectId, ref: "department" },
    branchId: { type: mongoose.Types.ObjectId, ref: "branch" },
    position_title: { type: String },
    address_line: { type: String },
    city: { type: String },
    state: { type: String },
    postal_code: { type: String },
    country: { type: String },
    last_login_at: Date,
    last_login_ip: { type: String },
    created_by: { type: mongoose.Types.ObjectId, ref: "users" }, // who created this user
    updated_by: { type: mongoose.Types.ObjectId, ref: "users" },
    deleted_at: { type: Date },
    createdAt: { type: Date },
    updatedAt: { type: Date },

}, { timestamps: true, versionKey: false })

export const userModel = mongoose.model("users", userSchema)