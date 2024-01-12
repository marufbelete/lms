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
exports.getAllPrice = exports.createPrice = exports.getAllProduct = exports.createProduct = exports.updateCustomer = exports.createCustomer = void 0;
const config = require('../../config/config');
const stripe = require('stripe')(config.STRIPE_PRIVATE_KEY);
console.log(config.STRIPE_PRIVATE_KEY);
const createCustomer = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield stripe.customers.create({
        name: 'Jenny Rosen',
        email: 'jennyrosen@example.com',
        phone: "phone",
        // payment_method:"payment_method_id",
        shipping: {
            address: {
                city: "addis ababa",
                country: "ethiopia"
            },
            name: "shipping name",
            phone: "+251945913839"
        },
        address: {
            city: "city",
            country: "country",
            line1: "line1",
            line2: "line2",
            postal_code: "postal",
            state: "state"
        }
    });
});
exports.createCustomer = createCustomer;
const updateCustomer = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield stripe.customers.update("cus_PEDmtIGWVuAS3g", {
        name: 'Maruf Belete',
        // payment_method:"payment method",
    });
});
exports.updateCustomer = updateCustomer;
//use lient side sripe.js to save sensetive data do not send to server 
//otherwise it will need server side seurity whih ompliate thing
// const createPaymentMethod = async()=>{
//    return await stripe.paymentMethods.create({
//     type: 'card',
//     card: {
//       number: '4242424242424242',
//       exp_month: 8,
//       exp_year: 2026,
//       cvc: '314',
//     },
//   });
// }
// const charge = await stripe.charges.create({
//   amount: 1099,
//   currency: 'usd',
//   customer: 'user',
// The ID of an existing customer that will be charged in this request.
// should have association with ard
//   source: 'tok_visa',
// A payment source to be charged. This can be the ID of a card (i.e., credit or debit card), a bank account,
//  a source, a token, or a connected account. For certain sources—namely, cards, bank accounts, and attached sources—you must also pass the ID of the associated customer.
// });
const createProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield stripe.tokens.create({
        card: {
            number: '4242424242424242',
            exp_month: 2,
            exp_year: 2023,
            cvc: '314',
        }
    });
    return yield stripe.products.create({
        name: 'Bullet Plan',
        description: 'some random des',
        default_price: 'price_1OPn3fCFcaH1rLoISrCFzZki'
    });
});
exports.createProduct = createProduct;
const getAllProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield stripe.products.list({});
});
exports.getAllProduct = getAllProduct;
const createPrice = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield stripe.prices.create({
        currency: 'usd',
        unit_amount: 1000,
        recurring: {
            interval: 'month',
        },
        product: 'prod_PEFFOaT8lVjui5',
    });
});
exports.createPrice = createPrice;
const getAllPrice = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield stripe.prices.list({
        expand: ["data.product"]
    });
});
exports.getAllPrice = getAllPrice;
//# sourceMappingURL=index.js.map