import axios from "axios";
import { Request, Response } from "express";
import routes from "../routes";

export async function handleProxy(req: Request, res: Response): Promise<void> {
    const method = req.method.toLowerCase();
    const path = req.path;

    const matchedRoute = Object.values(routes).find(route =>
        path.startsWith(route.path)
    );

    if (!matchedRoute || !matchedRoute.target) {
        res.status(502).json({ message: "No backend target defined!" });
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
    } catch (error: any) {
        res.status(error.response?.status || 500).json({
            message: 'Proxy error',
            detail: error.message
        });
    }
}
