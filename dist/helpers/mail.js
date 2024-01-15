"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_1 = __importDefault(require("../config/config"));
mail_1.default.setApiKey(config_1.default.SENDGRID_API_KEY);
const sendEmail = (mailOptions) => {
    return mail_1.default.send(mailOptions);
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mail.js.map