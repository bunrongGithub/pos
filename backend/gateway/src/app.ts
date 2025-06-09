import express, { Request, Response } from "express";



const app = express();

app.get("/health", (_req: Request, res: Response) => {
  res.send({message: "Look Good"});
});


export default app;