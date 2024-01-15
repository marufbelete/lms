import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import {handleError } from "../helpers/handleError";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      handleError("please login", 403);
    }
    const user = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
    return;
  } catch (error: any) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      error.message = "Invalid token.";
      error.statusCode = 401;
    }
    next(error);
  }
};
