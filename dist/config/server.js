"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models/"));
const config_1 = __importDefault(require("../config/config"));
const Server = async (app) => {
    try {
        models_1.default
            .authenticate()
            .then(async () => {
            app.listen(config_1.default.PORT || 7000, () => {
                console.log(`Server is running on port ${config_1.default.PORT}.`);
            });
        })
            .catch((error) => {
            console.log(error);
        });
    }
    catch (error) {
        console.error("An error occurred while starting the server:", error);
    }
};
exports.default = Server;
