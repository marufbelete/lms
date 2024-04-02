"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bouncer {
    constructor(min = 500, max = 600000, free = 2) {
        this.addresses = {};
        this.whitelist = [];
        this.delays = [];
        this.reset = (req) => {
            const address = this.extractAddress(req);
            address && delete this.addresses[address];
        };
        this.block = (req, res, next) => {
            console.log(req.ip, req.socket.remoteAddress);
            const address = this.extractAddress(req);
            if (!address || this.whitelist.includes(address)) {
                typeof next === "function" && next();
                return;
            }
            const fail = this.addresses[address] || { count: 0, lastAttempt: 0 };
            const remaining = fail.lastAttempt + this.delays[fail.count] - Date.now();
            if (remaining > 0) {
                this.blocked(req, res, next, remaining);
            }
            else {
                fail.lastAttempt = Date.now();
                if (fail.count < this.delays.length - 1) {
                    fail.count++;
                }
                this.addresses[address] = fail;
                typeof next === "function" && next();
            }
        };
        if (min < 1)
            min = 1;
        if (max < min)
            max = min;
        if (free < 0)
            free = 0;
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
    extractAddress(req) {
        try {
            return (req.ip ||
                req.socket.remoteAddress);
        }
        catch (error) {
            return undefined;
        }
    }
    blocked(req, res, next, remaining) {
        return res.status(429).json({
            message: `Too many attempts, please wait ${Math.round(remaining / 60000)} minutes`,
        });
    }
}
exports.default = new Bouncer(300000, 900000, 5);
