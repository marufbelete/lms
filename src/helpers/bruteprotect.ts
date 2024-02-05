import { Request,Response,NextFunction } from "express";
class Bouncer {
  private addresses: Record<string, { count: number; lastAttempt: number }> = {};
  private whitelist: string[] = [];
  private delays: number[] = [];

  constructor(min: number = 500, max: number = 600000, free: number = 2) {
    if (min < 1) min = 1;
    if (max < min) max = min;
    if (free < 0) free = 0;

    for (let i = 0; i < free; i++) {
      this.delays.push(0);
    }

    this.delays.push(min, min);
    while (true) {
      const value = this.delays[this.delays.length - 1] + this.delays[this.delays.length - 2];
      if (value > max) {
        this.delays.push(max);
        break;
      }
      this.delays.push(value);
    }

    setInterval(() => {
      const now = Date.now();
      for (const address in this.addresses) {
        if (now - this.addresses[address].lastAttempt > max) {
          delete this.addresses[address];
        }
      }
    }, 1800000);
  }

  reset=(req: Request): void=> {
    const address = this.extractAddress(req);
    address && delete this.addresses[address];
  }

  block=(req: Request, res: Response, next: NextFunction): void =>{
    console.log(
     req.ip,
    req.socket.remoteAddress)
    const address = this.extractAddress(req);

    if (!address || this.whitelist.includes(address)) {
      typeof next === "function" && next();
      return;
    }

    const fail = this.addresses[address] || { count: 0, lastAttempt: 0 };
    const remaining = fail.lastAttempt + this.delays[fail.count] - Date.now();

    if (remaining > 0) {
      this.blocked(req, res, next, remaining);
    } else {
      fail.lastAttempt = Date.now();
      if (fail.count < this.delays.length - 1) {
        fail.count++;
      }
      this.addresses[address] = fail;
      typeof next === "function" && next();
    }
  }

  private extractAddress(req: Request): string | undefined {
    try {    
      return(
      req.ip||
      req.socket.remoteAddress
      )     
    } catch (error) {
      return undefined;
    }
  }

  private blocked(req: Request, res: Response, next: NextFunction, remaining: number) {
    return res.status(429).json({
    message: `Too many attempts, please wait ${Math.round(
      remaining / 60000
    )} minutes`,
  });
    // res.status(429).send(
    //   `Too many requests have been made, please wait ${remaining / 1000} seconds`
    // );
  }
}

export default new Bouncer(300000, 900000, 5);

