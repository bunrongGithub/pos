import { Controller,Queries, Route, Get } from 'tsoa';
interface User {
    id: string;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface IQuery {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
    filter?: string;
    [key: string]: any;
}
@Route("/v1/users")
class UserControllers extends Controller {
    constructor() {
        super();
    }
    @Get("/")
    async getUsers(@Queries() query: IQuery): Promise<User[]> {
        console.log("Query Parameters:", query);
        return [
            {
                id: "1",
                name: "John Doe",
                email: "    ",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]
    }
    @Get("/me")
    async getMe(): Promise<User> {
        return {
            id: "1",
            name: "John Doe",
            email: "",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
}

export default UserControllers;