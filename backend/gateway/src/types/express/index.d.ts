// src/types/express/index.d.ts

export {};

declare global {
    namespace Express {
        interface Request {
            user?: import('../../middlewares/auth.middleware').UserPayload;
        }
    }
}