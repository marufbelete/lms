"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router({ mergeParams: true });
const errohandling_middleware_1 = require("../middleware/errohandling.middleware");
const collection_controller_1 = __importDefault(require("../controllers/collection.controller"));
route.post("/", collection_controller_1.default.addCollection, errohandling_middleware_1.errorHandler);
route.get("/", collection_controller_1.default.getCollections, errohandling_middleware_1.errorHandler);
route.put("/:id", collection_controller_1.default.updateCollection, errohandling_middleware_1.errorHandler);
route.get("/:id", collection_controller_1.default.getCollection, errohandling_middleware_1.errorHandler);
route.delete("/:id", collection_controller_1.default.deleteCollection, errohandling_middleware_1.errorHandler);
exports.default = route;
//# sourceMappingURL=collection.route.js.map