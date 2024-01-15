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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionService = void 0;
const collection_model_1 = require("../models/collection.model");
class CollectionService {
    static insertCollection(param, transaction = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const new_collection = new collection_model_1.Collection(param);
            console.log(new_collection);
            const result = yield new_collection.save(Object.assign({}, transaction));
            return result;
        });
    }
    static fetchCollections(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield collection_model_1.Collection.findAll(filter);
            return result;
        });
    }
    static fetchCollection(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield collection_model_1.Collection.findOne(filter);
            return result;
        });
    }
    static editCollection(param, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield collection_model_1.Collection.update(param, filter);
            return result;
        });
    }
    static removeCollection(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield collection_model_1.Collection.destroy(filter);
            return result;
        });
    }
}
exports.CollectionService = CollectionService;
//# sourceMappingURL=collection.service.js.map