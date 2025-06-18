import express, { Request, Response } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
import { handleProxy } from "./serivices/proxy";

const app = express();
app.use(express.json());

app.use('/api/v1/:service/*', authMiddleware, handleProxy); // ✅ FIXED PATH

app.get("/health", (_req: Request, res: Response) => {
  res.send({ message: "Look Good" });
});

export default app;
