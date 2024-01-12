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
const auth_1 = __importDefault(require("./auth"));
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const pg_1 = __importDefault(require("pg"));
const server_1 = __importDefault(require("./config/server"));
const pgSession = (0, connect_pg_simple_1.default)(express_session_1.default);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000',
        'https://studio.apollographql.com'],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
// const pgPool = new pg.Pool({
//     // Insert pool options here
//     uri:'postgres://postgres:12345@localhost:5432/lmsdev',
//     // ssl:true
// });
const pgPool = new pg_1.default.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'lmsdev',
    password: '12345',
    port: 5432,
});
app.use((0, express_session_1.default)({
    store: new pgSession({
        // Insert connect-pg-simple options here
        pool: pgPool,
        createTableIfMissing: true, //create the table automa
        pruneSessionInterval: 60 //remove expired session from db in interval of in s
        // conString : 'postgres://postgres:12345@localhost:5432/lmsdev', 
    }),
    saveUninitialized: false, //do not save if the session 
    //is uninitialized(set with req.session.user)
    secret: 'session-serets',
    resave: false, //save during every request
    rolling: true,
    //Force the session identifier cookie to be set on every response. The expiration is reset to 
    //the original maxAge, resetting the expiration countdown
    //default false
    cookie: { httpOnly: true, maxAge: 15 * 1000 } // 30 days
}));
//initialize passport
app.use(auth_1.default.initialize());
app.use(auth_1.default.session());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
//for stripe webhook veryfiation
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
        next();
    }
    else {
        express_1.default.json()(req, res, next);
    }
});
app.use('/api', index_1.default);
(0, server_1.default)(app);
exports.default = app;
//# sourceMappingURL=app.js.map