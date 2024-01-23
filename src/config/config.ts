import { Dialect } from "sequelize";
import { Environments } from "../types";
[
  "DEV_DATABASE_URL",
  "DATABASE_URL",
  "PORT",
  "ACCESS_TOKEN_SECRET",
  "LONG_ACCESS_TOKEN_EXPIRY",
  "ACCESS_TOKEN_EXPIRES",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "MAIL_PORT",
  "EMAIL",
  "MAIL_HOST",
  "MAIL_SERVICE",
  "MAIL_REDIRECT_URI",
  "MAIL_REFRESH_TOKEN",
  "BASE_URL",
  "FE_URL",
  "SENDGRID_API_KEY",
  "AWS_REGION",
  "AWS_BUCKET_NAME",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_PROFILE_FOLDER",
].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config: Environments = {
  DB_URL: process.env.DEV_DATABASE_URL,
  PORT: Number(process.env.PORT),
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  LONG_ACCESS_TOKEN_EXPIRY: process.env.LONG_ACCESS_TOKEN_EXPIRY!,
  ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  MAIL_PORT: Number(process.env.MAIL_PORT),
  MAIL_HOST: process.env.MAIL_HOST!,
  FROM_EMAIL: process.env.FROM_EMAIL!,
  TO_EMAIL: process.env.TO_EMAIL!,
  MAIL_SERVICE: process.env.MAIL_SERVICE!,
  MAIL_REDIRECT_URI: process.env.MAIL_REDIRECT_URI!,
  MAIL_REFRESH_TOKEN: process.env.MAIL_REFRESH_TOKEN!,
  BASE_URL: process.env.BASE_URL!,
  FE_URL: process.env.FE_URL!,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USER: process.env.DB_USER,
  DB_DIALECT: process.env.DB_DIALECT as Dialect,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY!,
  FORUM_API_KEY: process.env.FORUM_API_KEY!,
  AWS_REGION: process.env.AWS_REGION!,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
  AWS_PROFILE_FOLDER: process.env.AWS_PROFILE_FOLDER!,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME!,
  AWS_COURSE_FOLDER: process.env.AWS_COURSE_FOLDER!,
};
if (process.env.NODE_ENV === "production") {
  config.DB_URL = process.env.DATABASE_URL;
}
export default config;
