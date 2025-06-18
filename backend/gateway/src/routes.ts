import { IRoutes } from "./interfaces/routes.interface";
/**
 *  http://localhost:4000/api/(*)
 *  http://localhost:4000/api/(*)
 *  http://localhost:4000/api/v1/auth -> http://localhost:4001/api/v1/auth/ 
 *  login -> http://localhost:4000/api/v1/auth -> http://localhost:4001/api/v1/auth/ 
 * 
 * 
 * 
 */

const routes: IRoutes = {
    AUTH_SERVICE: {
        path: "/v1/auth",
        target: "http://localhost:4001",
        method: {
            get: { authRequired: false, roles: ["admin", "cashier", "user"] },
            post: { authRequired: true, roles: ["admin", "cashier", "user"] },
            put: { authRequired: true, roles: ["admin", "cashier", "user"] },
            delete: { authRequired: true, roles: ["admin", "cashier", "user"] }
        }
    },
    USER_SERVICE: {
        path: "/v1/users",
        target: "http://localhost:4002",
        method: {
            get: { authRequired: false, roles: ["admin", "cashier", "user"] },
            post: { authRequired: true, roles: ["admin", "cashier", "user"] },
            put: { authRequired: true, roles: ["admin", "cashier", "user"] },
            delete: { authRequired: true, roles: ["admin", "cashier", "user"] }
        }
    }
}


export default routes;