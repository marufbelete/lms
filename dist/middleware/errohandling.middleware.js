"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        error: {
            message: errorMessage,
            success: false,
        },
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errohandling.middleware.js.map