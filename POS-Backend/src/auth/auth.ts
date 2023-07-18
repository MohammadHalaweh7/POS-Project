import { User } from "../model/userModel";
import jwt from "jsonwebtoken";
import { Router, Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}
export function generateAccessToken(user: User) {
  const expiresIn = "80m";
  return jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn,
  });
}
export function generateRefreshToken(user: User) {
  return jwt.sign(user.userName, process.env.REFRESH_TOKEN_SECRET!);
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    (err, user: string | any) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    }
  );
}