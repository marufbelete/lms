"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
[
    'DEV_DB_URL',
    'DB_URL',
    'PORT',
    'ACCESS_TOKEN_SECRET',
    'LONG_ACCESS_TOKEN_EXPIRY',
    'ACCESS_TOKEN_EXPIRES',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'MAIL_PORT',
    'FROM_EMAIL',
    'TO_EMAIL',
    'MAIL_HOST',
    'MAIL_SERVICE',
    'MAIL_REDIRECT_URI',
    'MAIL_REFRESH_TOKEN',
    'BASE_URL',
    'FE_URL',
    'STRIPE_WEBHOOK_SECRET'
].forEach((name) => {
    if (!process.env[name]) {
        throw new Error(`Environment variable ${name} is missing`);
    }
});
const config = {
    DB_URL: process.env.DEV_DB_URL,
    PORT: Number(process.env.PORT),
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    LONG_ACCESS_TOKEN_EXPIRY: process.env.LONG_ACCESS_TOKEN_EXPIRY,
    ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    MAIL_PORT: Number(process.env.MAIL_PORT),
    MAIL_HOST: process.env.MAIL_HOST,
    FROM_EMAIL: process.env.FROM_EMAIL,
    TO_EMAIL: process.env.TO_EMAIL,
    MAIL_SERVICE: process.env.MAIL_SERVICE,
    MAIL_REDIRECT_URI: process.env.MAIL_REDIRECT_URI,
    MAIL_REFRESH_TOKEN: process.env.MAIL_REFRESH_TOKEN,
    BASE_URL: process.env.BASE_URL,
    FE_URL: process.env.FE_URL,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USER: process.env.DB_USER,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
};
if (process.env.NODE_ENV === 'production') {
    config.DB_URL = process.env.DB_URL;
}
exports.default = config;
//# sourceMappingURL=config.js.map