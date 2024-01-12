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
exports.getPrices = exports.getProducts = exports.addPrice = exports.addProduct = exports.editCustomer = exports.addCustomer = void 0;
const stripe_1 = require("../payment/stripe");
const addCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_customer = yield (0, stripe_1.createCustomer)();
        console.log(new_customer);
        return res.json(new_customer);
    }
    catch (error) {
        next(error);
    }
});
exports.addCustomer = addCustomer;
const editCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield (0, stripe_1.updateCustomer)();
        console.log(customer);
        return res.json(customer);
    }
    catch (error) {
        next(error);
    }
});
exports.editCustomer = editCustomer;
// exports.createPaymentMethod=async(req, res,next)=>{
//     try {
//        const new_payment= await createPaymentMethod() 
//         console.log(new_payment)
//        return res.json(new_payment) 
//     } catch (error) {
//       next(error)  
//     }
// }
// exports.updatePaymentMethod=async(req, res,next)=>{
//     try {
//        const customer= await updateCustomer() 
//         console.log(customer)
//        return res.json(customer) 
//     } catch (error) {
//       next(error)  
//     }
// }
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield (0, stripe_1.createProduct)();
        console.log(customer);
        return res.json(customer);
    }
    catch (error) {
        next(error);
    }
});
exports.addProduct = addProduct;
const addPrice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield (0, stripe_1.createPrice)();
        console.log(customer);
        return res.json(customer);
    }
    catch (error) {
        next(error);
    }
});
exports.addPrice = addPrice;
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield (0, stripe_1.getAllProduct)();
        console.log(customer);
        return res.json(customer);
    }
    catch (error) {
        next(error);
    }
});
exports.getProducts = getProducts;
const getPrices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield (0, stripe_1.getAllPrice)();
        console.log(customer);
        return res.json(customer);
    }
    catch (error) {
        next(error);
    }
});
exports.getPrices = getPrices;
//# sourceMappingURL=stripe.controller.js.map