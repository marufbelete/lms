"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountConfirmationEmail = void 0;
const config_1 = __importDefault(require("../config/config"));
const accountConfirmationEmail = (email, username, token) => {
    const mailOptions = {
        from: config_1.default.FROM_EMAIL,
        to: config_1.default.TO_EMAIL,
        subject: "LMS Account Confirmation",
        html: `
        <div style="margin:auto; max-width:650px; background-color:#C2E7FF">
        <h1 style="text-align:center;color:#2791BD;padding:10px 20px;">
        Welcome <span style="text-transform:capitalize"}>Hello there</span>
        </h1>
        <p style="text-align:start;padding:10px 20px;">
        Follow the link to confirm your email.
        </p>
        <div style="text-align:center;padding-bottom:30px">
        </div>
        </div>
      `
    };
    return mailOptions;
};
exports.accountConfirmationEmail = accountConfirmationEmail;
//# sourceMappingURL=email.js.map