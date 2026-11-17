import { NextFunction } from "connect";
import { Request, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { AppError } from "./common/utils/globalErrorHandling";
import { GlobalErrorHandler } from "./common/utils/globalErrorHandling";
import authRouter from "./modules/auth/auth.controller";
import ConnectionDB from "./DB/connectionDB";
import redisService from "./DB/redis.connection";
const express = require("express");
const app = express();
const port =3000;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit :20,
    message:{
        success:false,
        message:"Too many requests from this IP, please try again after 15 minutes"
    }
});

const bootstrap = async () => {
    app.use(express.json(),helmet(),cors(),limiter);
    await ConnectionDB();
    await redisService.connect();
    app.get("/", (req: Request, res:Response,next:NextFunction) => {
        res.status(200).json({ message: "hello on my app" });
    });
    app.use("/auth", authRouter);
    
   
    app.use("{/*demo}", (req: Request, res:Response,next:NextFunction) => {
     throw new AppError(`Url:${req.originalUrl} with method:${req.method} not found`, 404);
    });
    app.use(GlobalErrorHandler);
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};
export default bootstrap;
