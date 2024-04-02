"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCollectionSchema = exports.addCollectionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addCollectionSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.any(),
});
exports.updateCollectionSchema = joi_1.default.object({
    id: joi_1.default.any().required(),
    title: joi_1.default.string().required(),
    description: joi_1.default.any(),
});
