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
const config = require("../config/config");
exports.stripeWebHook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("webhook");
    const webhookSecret = config.STRIPE_WEBHOOK_SECRET;
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        const payload = req.body;
        event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
        console.log(event);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // await saveinfo()
            console.log("save to database the success");
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            console.log("save to database the attached");
            //do something
            break;
        case 'customer.subscription.deleted':
            const subscriptionCanceled = event.data.object;
            console.log("delete subscription deleted");
            //do something
            break;
        // ... handle other event types
        default:
            console.log('default');
            console.log(`Unhandled event type ${event.type}`);
    }
    return res.status(200).end();
});
// switch (eventType) {
//   case 'checkout.session.completed':
//     // Payment is successful and the subscription is created.
//     // You should provision the subscription and save the customer ID to your database.
//     break;
//   case 'invoice.paid':
//     // Continue to provision the subscription as payments continue to be made.
//     // Store the status in your database and check when a user accesses your service.
//     // This approach helps you avoid hitting rate limits.
//     break;
//   case 'invoice.payment_failed':
//     // The payment failed or the customer does not have a valid payment method.
//     // The subscription becomes past_due. Notify your customer and send them to the
//     // customer portal to update their payment information.
//     break;
//   default:
//   // Unhandled event type
// }
// for one time payment on type: 'charge.succeeded' you can get {receipt_url}=event.data.object (this will contain info for customer about payment)
//for subscription on type: 'invoice.created',type: 'invoice.paid',type: 'invoice.finalized',type: 'invoice.updated' 
// type: 'invoice.payment_succeeded,you get {hosted_invoice_url}=event.data.object subscription info
// const stripe = require('stripe')('sk_test_51Kma6GCFcaH1rLoINPNOqFbBgUasJGuALsGd1gyhaLyvBdakCmphVlUnxF2vEG9CK0dEwyaLg34gkCKD7p71TmrE00geKwD9xZ');
//update subscription
// const subscription = await stripe.subscriptions.retrieve('sub_49ty4767H20z6a');
// stripe.subscriptions.update(subscription.id, {
//   cancel_at_period_end: false,
//   proration_behavior: 'create_prorations',
//   items: [{
//     id: subscription.items.data[0].id,
//     price: 'price_CBb6IXqvTLXp3f',
//   }]
// });
//cancel at the end of subscription no proration
// stripe.subscriptions.update(subscription.id, {cancel_at_period_end: true});
// You can reactivate subscriptions scheduled for cancellation
//  (with the cancel_at_period_end parameter) by updating cancel_at_period_end:false
// You can reactivate the subscription at any point up to the end of the period.
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
// const stripe = require('stripe')('sk_test_51Kma6GCFcaH1rLoINPNOqFbBgUasJGuALsGd1gyhaLyvBdakCmphVlUnxF2vEG9CK0dEwyaLg34gkCKD7p71TmrE00geKwD9xZ');
const endpoint = await stripe.webhookEndpoints.create({
    url: 'https://example.com/my/webhook/endpoint',
    enabled_events: [
        'payment_intent.payment_failed',
        'payment_intent.succeeded',
    ],
});
//# sourceMappingURL=webhook.controller.js.map