"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (msg, status) => {
    const error = new Error(msg);
    // error. = status;
    throw error;
};
exports.handleError = handleError;
//# sourceMappingURL=handleError.js.map