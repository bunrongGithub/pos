/// <reference path="./types/express/index.d.ts" />

import express, { Request, Response, NextFunction } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
import { handleProxy } from "./serivices/proxy";
import {errorHandlerMiddleware} from "@/src/middlewares/errorHandler.middleware";

const app = express();
app.use(express.json());

app.use(authMiddleware, handleProxy);

app.get("/health", (_req: Request, res: Response) => {
  res.send({ message: "Look Good" });
});
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  errorHandlerMiddleware(err, _req, res, _next);
});
export default app;
