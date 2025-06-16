import { ObjectId } from "mongoose";

const IUserRoles = ["user", "admin"] as const
export type RolesType = typeof IUserRoles[number]
export default interface IUserSchema {
    _id?: string;
    username: string;
    email: string;
    gender?: string;
    phone_number?: string;
    role: RolesType;
    profile?: string;
    birthdate?: Date;
    description?: string;
    user_status?: string,
    email_verified?: boolean
    companyId: ObjectId 
    createdAt?: Date;
    updatedAt?: Date;
}