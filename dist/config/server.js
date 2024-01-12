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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models/"));
const config_1 = __importDefault(require("../config/config"));
// const asyncVerify = util.promisify(jwt.verify);
console.log("servert");
const Server = (app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("servert11")
        // const apolloServer = new ApolloServer({     
        //   typeDefs,
        //   resolvers,      
        //   context: async ({ req, res }) => {
        //     const token = req.cookies.access_token; 
        //     if (!token) {          
        //       return { value: "no token" };
        //     }    
        //     const user = jwt.verify(token,config.ACCESS_TOKEN_SECRET)     
        //     return { user };
        //   },   
        //  });
        // await apolloServer.start();
        // apolloServer.applyMiddleware({ app, cors: false });
        // console.log("servert11")
        models_1.default.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
            app.listen(config_1.default.PORT || 7000, () => {
                console.log(`Server is running on port ${config_1.default.PORT}.`);
            });
        })).catch(error => {
            console.log(error);
        });
    }
    catch (error) {
        console.error("An error occurred while starting the server:", error);
    }
});
exports.default = Server;
//# sourceMappingURL=server.js.map