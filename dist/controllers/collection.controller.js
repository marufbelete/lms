"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleError_1 = require("../helpers/handleError");
const collection_validation_1 = require("../validation/collection.validation");
const index_service_1 = require("../service/index.service");
const course_model_1 = require("../models/course.model");
const common_1 = require("../helpers/common");
const common_validation_1 = require("../validation/common.validation");
exports.default = {
    addCollection: async (req, res, next) => {
        try {
            const param = req.body;
            const { error } = collection_validation_1.addCollectionSchema.validate(param);
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const result = await index_service_1.CollectionService.insertCollection(param);
            return res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    },
    getCollections: async (req, res, next) => {
        try {
            const filter = {
                include: [
                    {
                        model: course_model_1.Course,
                    },
                ],
            };
            const result = await index_service_1.CollectionService.fetchCollections(filter);
            const mapped_result = await (0, common_1.mapCollectionCourseImage)(result);
            return res.json(mapped_result);
        }
        catch (error) {
            next(error);
        }
    },
    updateCollection: async (req, res, next) => {
        try {
            const { id } = req.params;
            const param = req.body;
            const filter = {
                where: {
                    id,
                },
                returning: true,
            };
            const { error } = collection_validation_1.updateCollectionSchema.validate({
                id,
                ...param,
            });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const result = await index_service_1.CollectionService.editCollection(param, filter);
            return res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    },
    getCollection: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error } = common_validation_1.getByIdSchema.validate({ id });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const filter = {
                where: { id },
                include: [
                    {
                        model: course_model_1.Course,
                    },
                ],
            };
            const result = await index_service_1.CollectionService.fetchCollection(filter);
            if (!result)
                return res.json(result);
            const [mapped_result] = await (0, common_1.mapCollectionCourseImage)([result]);
            return res.json(mapped_result);
        }
        catch (error) {
            next(error);
        }
    },
    deleteCollection: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error } = common_validation_1.getByIdSchema.validate({ id });
            if (error) {
                (0, handleError_1.handleError)(error.message, 403);
            }
            const filter = {
                where: {
                    id,
                },
            };
            await index_service_1.CollectionService.removeCollection(filter);
            return res.json({
                status: true,
            });
        }
        catch (error) {
            next(error);
        }
    },
};
