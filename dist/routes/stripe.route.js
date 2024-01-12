"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_controller_1 = require("../controllers/stripe.controller");
const errohandling_middleware_1 = require("../middleware/errohandling.middleware");
const route = express_1.default.Router({ mergeParams: true });
route.post('/customer', stripe_controller_1.addCustomer, errohandling_middleware_1.errorHandler);
route.post('/product', stripe_controller_1.addProduct, errohandling_middleware_1.errorHandler);
route.get('/product', stripe_controller_1.getProducts, errohandling_middleware_1.errorHandler);
route.post('/price', stripe_controller_1.addPrice, errohandling_middleware_1.errorHandler);
route.get('/price', stripe_controller_1.getPrices, errohandling_middleware_1.errorHandler);
route.put('/customer', stripe_controller_1.editCustomer, errohandling_middleware_1.errorHandler);
exports.default = route;
//# sourceMappingURL=stripe.route.js.map