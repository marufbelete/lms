"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphqlErrorHandler = (message, code) => {
    throw new graphql_1.GraphQLError(message, {
        extensions: {
            code
        }
    });
};
exports.default = graphqlErrorHandler;
//# sourceMappingURL=errorHandler.js.map