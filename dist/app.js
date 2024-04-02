"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("./auth/passport"));
const server_1 = __importDefault(require("./config/server"));
const errohandling_middleware_1 = require("./middleware/errohandling.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://sorobanlearn.com",
        /\.netlify.app$/,
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
// app.use(helmet());
app.use(passport_1.default.initialize());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use("/api", index_1.default);
app.use(errohandling_middleware_1.errorHandler);
(0, server_1.default)(app);
exports.default = app;
