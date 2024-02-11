"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.log(err);
    const statusCode = err.status || 500;
    const errorMessage = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        error: {
            message: errorMessage,
            success: false,
        },
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errohandling.middleware.js.map