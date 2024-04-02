"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionService = void 0;
const collection_model_1 = require("../models/collection.model");
class CollectionService {
    static async insertCollection(param, transaction = {}) {
        const new_collection = new collection_model_1.Collection(param);
        console.log(new_collection);
        const result = await new_collection.save({ ...transaction });
        return result;
    }
    static async fetchCollections(filter) {
        const result = await collection_model_1.Collection.findAll(filter);
        return result;
    }
    static async fetchCollection(filter) {
        const result = await collection_model_1.Collection.findOne(filter);
        return result;
    }
    static async editCollection(param, filter) {
        const result = await collection_model_1.Collection.update(param, filter);
        return result;
    }
    static async removeCollection(filter) {
        const result = await collection_model_1.Collection.destroy(filter);
        return result;
    }
}
exports.CollectionService = CollectionService;
