import { Router } from "express";
import authRouter from "./auth";

const appRouter = Router();
appRouter.use("/auth", authRouter);

export default appRouter;
