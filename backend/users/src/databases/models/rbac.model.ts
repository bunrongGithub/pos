import mongoose, { Schema, Document } from "mongoose";
import { RolesType } from "../interfaces/user.interface"; // e.g., type RolesType = "admin" | "user" | "moderator";

interface IRoleRule {
  role: RolesType;
  paths: string[]; // or single string if you prefer
  labels?: string[]; // optional menu labels
}

export interface IRbac extends Document {
  roles: IRoleRule[];
}

const rbacSchema = new Schema<IRbac>({
  roles: [
    {
      role: { type: String, enum: ["admin", "user", "moderator"], required: true },
      paths: [{ type: String, required: true }],
      labels: [{ type: String }],
    },
  ],
});

export const RbacModel = mongoose.model<IRbac>("role_based_access_control", rbacSchema);
