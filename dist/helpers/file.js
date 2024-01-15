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
exports.sanitizeImage = exports.removeImage = exports.getImage = exports.saveImages = exports.saveImage = exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_config_1 = __importDefault(require("../config/s3-config"));
const config_1 = __importDefault(require("../config/config"));
const fileStorage = multer_1.default.memoryStorage();
exports.uploadImage = (0, multer_1.default)({ storage: fileStorage, fileFilter: sanitizeImage });
const saveImage = (file, folder) => __awaiter(void 0, void 0, void 0, function* () {
    const uniquePrefix = Date.now();
    const imagetype = file.mimetype.split("/")[1];
    const path = file.originalname;
    const fullpath = `${folder}/${uniquePrefix}-${path}`;
    const params = {
        Bucket: config_1.default.AWS_BUCKET_NAME,
        Key: fullpath,
        Body: yield (0, sharp_1.default)(file.buffer)
            .resize({ width: 400, fit: "contain" })
            .toFormat(imagetype)
            .toBuffer(),
        ContentType: imagetype
    };
    yield s3_config_1.default.send(new client_s3_1.PutObjectCommand(params));
    return fullpath;
});
exports.saveImage = saveImage;
const saveImages = (files, folder) => __awaiter(void 0, void 0, void 0, function* () {
    const imgurl = [];
    for (let f = 0; f < (files === null || files === void 0 ? void 0 : files.length); f++) {
        const uniquePrefix = Date.now();
        const imagetype = files[f].mimetype.split("/")[1];
        const path = files[f].originalname;
        const fullpath = `${folder}/${uniquePrefix}-${path}`;
        imgurl.push(fullpath);
        const params = {
            Bucket: config_1.default.AWS_BUCKET_NAME,
            Key: fullpath,
            Body: yield (0, sharp_1.default)(files[f].buffer)
                .resize({ width: 400, fit: "contain" })
                .toFormat(imagetype)
                .toBuffer(),
            ContentType: imagetype
        };
        yield s3_config_1.default.send(new client_s3_1.PutObjectCommand(params));
    }
    return imgurl;
});
exports.saveImages = saveImages;
const getImage = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: config_1.default.AWS_BUCKET_NAME,
        Key: key
    };
    const command = new client_s3_1.GetObjectCommand(params);
    const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.default, command, { expiresIn: 36000 });
    return url;
});
exports.getImage = getImage;
const removeImage = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: config_1.default.AWS_BUCKET_NAME,
        Key: key,
    };
    const command = new client_s3_1.DeleteObjectCommand(params);
    yield s3_config_1.default.send(command);
    return true;
});
exports.removeImage = removeImage;
function sanitizeImage(req, file, cb) {
    const fileExts = [".png", ".jpg", ".jpeg"];
    const isAllowedExt = fileExts.includes(path_1.default.extname(file.originalname.toLowerCase()));
    const isAllowedMimeType = file.mimetype.startsWith("image/");
    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors 
    }
    else {
        cb("Error: File type not allowed!");
    }
}
exports.sanitizeImage = sanitizeImage;
//# sourceMappingURL=file.js.map