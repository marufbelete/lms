const bouncer = require("express-bouncer")(300000, 900000, 7);
import { Request, Response, NextFunction } from "express";
bouncer.blocked = function (
  req: Request,
  res: Response,
  next: NextFunction,
  remaining: number
) {
  return res.status(429).json({
    message: `Too many attempts, please wait ${Math.round(
      remaining / 60000
    )} minutes`,
  });
};
export default bouncer;
