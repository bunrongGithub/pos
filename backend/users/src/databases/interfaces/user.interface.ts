export type IUserRoles = "user" | "admin"
export default interface IUserSchema {
    _id?: string;
    username: string;
    email: string;
    gender?: string;
    phone_number?: string;
    role: IUserRoles;
    profile?: string;
    birthdate?: Date;
    description?: string;
    user_status?: string,
    email_verified?: boolean
    createdAt?: Date;
    updatedAt?: Date;
}