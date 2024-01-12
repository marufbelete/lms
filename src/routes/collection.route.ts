import express from "express";
const route = express.Router({ mergeParams: true });
import { errorHandler } from "../middleware/errohandling.middleware";
import CollectionController from "../controllers/collection.controller";

route.post("/", CollectionController.addCollection, errorHandler);

route.get("/", CollectionController.getCollections, errorHandler);

route.put("/:id", CollectionController.updateCollection, errorHandler);

route.get("/:id", CollectionController.getCollection, errorHandler);

route.delete("/:id", CollectionController.deleteCollection, errorHandler);

export default route;
