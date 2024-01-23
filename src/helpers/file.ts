import multer from "multer";
import sharp from "sharp";
import path from "path";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import s3 from "../config/s3-config";
import config from "../config/config";
import { Request } from "express";

const storage = multer.memoryStorage();
export const uploadImage = multer({
  storage: storage,
  fileFilter: sanitizeImage,
});

export const saveImage = async (file: Express.Multer.File, folder: string) => {
  const uniquePrefix = Date.now();
  const imagetype = file.mimetype.split("/")[1];
  const path = file.originalname;
  const fullpath = `${folder}/${uniquePrefix}-${path}`;

  const params = {
    Bucket: config.AWS_BUCKET_NAME,
    Key: fullpath,
    Body: await sharp(file.buffer)
      .resize({ width: 400, fit: "contain" })
      .toBuffer(),
    ContentType: imagetype,
  };
  await s3.send(new PutObjectCommand(params));
  return fullpath;
};

export const saveImages = async (
  files: Express.Multer.File[],
  folder: string
) => {
  const imgurl = [];
  for (let f = 0; f < files?.length; f++) {
    const uniquePrefix = Date.now();
    const imagetype = files[f].mimetype.split("/")[1];
    const path = files[f].originalname;
    const fullpath = `${folder}/${uniquePrefix}-${path}`;

    imgurl.push(fullpath);
    const params = {
      Bucket: config.AWS_BUCKET_NAME,
      Key: fullpath,
      Body: await sharp(files[f].buffer)
        .resize({ width: 400, fit: "contain" })
        .toBuffer(),
      ContentType: imagetype,
    };
    await s3.send(new PutObjectCommand(params));
  }
  return imgurl;
};

export const getImage = async (key: string) => {
  const params = {
    Bucket: config.AWS_BUCKET_NAME,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3, command, { expiresIn: 36000 });
  return url;
};
export const removeImage = async (key: string) => {
  const params = {
    Bucket: config.AWS_BUCKET_NAME,
    Key: key,
  };
  const command = new DeleteObjectCommand(params);
  await s3.send(command);
  return true;
};

export function sanitizeImage(
  req: Request,
  file: Express.Multer.File,
  cb: CallableFunction
) {
  const fileExts = [".png", ".jpg", ".jpeg"];

  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    cb("Error: File type not allowed!");
  }
}
