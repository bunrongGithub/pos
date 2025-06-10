export interface IRoutes {
  [route: string]: IRoute;
}

type UserRolesType = Array<"user" | "admin" | "cashier">
interface IRoute{
    path: string;
    target?: string;
    method?: {
        [method: string]:{
            authRequired: boolean;
            roles: UserRolesType 
        }
    },
    nestedRoutes?: IRoute[] | undefined; 
}