import express from "express";
const route = express.Router({ mergeParams: true });
import CollectionController from "../controllers/collection.controller";

route.post("/", CollectionController.addCollection);
route.get("/", CollectionController.getCollections);
route.put("/:id", CollectionController.updateCollection);
route.get("/:id", CollectionController.getCollection);
route.delete("/:id", CollectionController.deleteCollection);

export default route;
