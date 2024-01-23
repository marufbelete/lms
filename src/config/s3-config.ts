import { S3Client } from "@aws-sdk/client-s3";
import config from "./config";

const S3Config = {
  region: config.AWS_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
};
const s3 = new S3Client(S3Config);

export default s3;
