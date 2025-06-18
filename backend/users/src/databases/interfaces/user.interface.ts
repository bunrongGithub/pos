import { ObjectId } from "mongoose";

export const IUserRoles = ["user", "admin", "manager", "cashier", "supervisor", "owner", "hr", "it", "auditor"] as const;
export type RolesType = typeof IUserRoles[number];

export default interface IUserSchema {
  _id?: string;

  // Basic Info
  username: string;
  email: string;
  passwordHash?: string; // hashed password
  gender?: "male" | "female" | "other";
  birthdate?: Date;
  phone_number?: string;
  profile_image?: string;
  description?: string;

  // Identity and Access
  role: RolesType; // you can allow array of roles if multi-role is needed
  user_status?: "active" | "inactive" | "suspended" | "terminated";
  email_verified?: boolean;
  phone_verified?: boolean;
  two_factor_enabled?: boolean;

  // Organization Links
  companyId: ObjectId;
  branchId?: ObjectId;
  departmentId?: ObjectId;
  position_title?: string;

  // Address (Optional)
  address_line?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;

  // Audit & Meta
  last_login_at?: Date;
  last_login_ip?: string;
  created_by?: ObjectId; // who created this user
  updated_by?: ObjectId;
  deleted_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
