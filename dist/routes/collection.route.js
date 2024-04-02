"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router({ mergeParams: true });
const collection_controller_1 = __importDefault(require("../controllers/collection.controller"));
route.post("/", collection_controller_1.default.addCollection);
route.get("/", collection_controller_1.default.getCollections);
route.put("/:id", collection_controller_1.default.updateCollection);
route.get("/:id", collection_controller_1.default.getCollection);
route.delete("/:id", collection_controller_1.default.deleteCollection);
exports.default = route;
