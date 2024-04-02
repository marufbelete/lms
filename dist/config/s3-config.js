"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = __importDefault(require("./config"));
const S3Config = {
    region: config_1.default.AWS_REGION,
    credentials: {
        accessKeyId: config_1.default.AWS_ACCESS_KEY_ID,
        secretAccessKey: config_1.default.AWS_SECRET_ACCESS_KEY,
    },
};
const s3 = new client_s3_1.S3Client(S3Config);
exports.default = s3;
