
import { Request, Response } from "express";
import routes from "../routes";
import axios from "axios";
import { AxiosError} from "@/src/types/axios"
import {HttpStatus} from "@/src/utils/http-status";
export async function handleProxy(req: Request, res: Response): Promise<void> {
    const method = req.method.toLowerCase();
    const path = req.path;

    const matchedRoute = Object.values(routes).find(route =>
        path.startsWith(route.path)
    );

    if (!matchedRoute || !matchedRoute.target) {
        res.status(HttpStatus.BAD_GATEWAY).json({ message: "No backend target defined!" });
        return;
    }

    const targetUrl = `${matchedRoute.target}${req.originalUrl}`;

    try {
        const axiosRes = await axios({
            method: method as any,
            url: targetUrl,
            headers: {
                ...req.headers,
            },
            data: req.body
        });
        res.status(axiosRes.status).json(axiosRes.data);
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const {
                status,
                data: { message },
            } = axiosError.response;

            res.status(status).json({
                message: 'Proxy error',
                detail: message,
            });
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Proxy error',
                detail: 'No response from upstream service',
            });
        }
    }
}
