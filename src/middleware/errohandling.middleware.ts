import { Request, Response, NextFunction } from "express";
import { IError } from "../helpers/handleError";
export const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if (err.errors) {
  //   return res.status(400).json({
  //     error: {
  //       message: err.errors[0].message,
  //       success: false,
  //     },
  //   });
  // }
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
