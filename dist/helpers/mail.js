"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const config_1 = __importDefault(require("../config/config"));
const sendEmail = (mailOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const oAuth2Client = new googleapis_1.google.auth.OAuth2(config_1.default.GOOGLE_CLIENT_ID, config_1.default.GOOGLE_CLIENT_SECRET, config_1.default.MAIL_REDIRECT_URI);
    oAuth2Client.setCredentials({
        refresh_token: config_1.default.MAIL_REFRESH_TOKEN,
    });
    const accessToken = yield oAuth2Client.getAccessToken();
    const nodemailerOptions = {
        service: config_1.default.MAIL_SERVICE,
        host: config_1.default.MAIL_HOST,
        port: config_1.default.MAIL_PORT,
        secure: true,
        debug: true,
        auth: {
            type: "OAuth2",
            user: config_1.default.FROM_EMAIL,
            clientId: config_1.default.GOOGLE_CLIENT_ID,
            clientSecret: config_1.default.GOOGLE_CLIENT_SECRET,
            refreshToken: config_1.default.MAIL_REFRESH_TOKEN,
            accessToken: accessToken,
        },
    };
    const transporter = nodemailer_1.default.createTransport(nodemailerOptions);
    yield transporter.sendMail(mailOptions);
    return true;
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=mail.js.map