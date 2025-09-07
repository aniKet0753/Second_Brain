import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { Jwt_Paswoord } from "./config";
import { Express, NextFunction, Request, Response } from "express";


declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}


export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
     const token = req.headers.authorization;
     console.log("Auth Header:", req.headers.authorization);
        if (!token) {
          console.log("Auth Header:", req.headers.authorization);

      return res.status(401).json({ message: "No token provided" });
    }
        const decoded = jwt.verify(token, Jwt_Paswoord);

    if (typeof decoded === "object" && "id" in decoded) {
      req.userId = (decoded as JwtPayload).id as string;
      return next();
    }

    return res.status(401).json({ message: "Invalid token format" });
  } catch (e) {
    console.error("JWT verification failed:", e);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
