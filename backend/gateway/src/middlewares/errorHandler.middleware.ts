import type {Request,Response,NextFunction} from "express";
import {ApiResHandler} from "@/src/utils/api-res-handler";
export const errorHandlerMiddleware = (err: Error, _req: Request,res: Response,_next: NextFunction): Response => {
    if (err instanceof ApiResHandler){
        return res.status(err.statusCode).json(err.toString());
    }
    const serverError = ApiResHandler.internal()
    return res.status(serverError.statusCode).json(serverError.toJSON())
}