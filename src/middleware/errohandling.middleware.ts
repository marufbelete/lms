import { Request, Response, NextFunction } from "express";
import { IError } from "../helpers/handleError";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    error: {
      message: errorMessage,
      success: false,
    },
  });
};
