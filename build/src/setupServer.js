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
exports.Server = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const compression_1 = __importDefault(require("compression"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const express_session_1 = __importDefault(require("express-session"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = require("./utils/error-handler");
const redis_1 = require("./config/redis");
class Server {
    constructor(app) {
        this.app = app;
        this.setup();
    }
    start() {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.redisSessionMiddleware(this.app); // <-- Add Redis session middleware
        this.routesMiddleware(this.app);
        this.apiMonitoring(this.app);
        this.startServer(this.app);
        this.globalErrorHandler(this.app);
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.securityMiddleware(this.app);
            this.standardMiddleware(this.app);
            yield this.redisSessionMiddleware(this.app);
            this.routesMiddleware(this.app);
            this.apiMonitoring(this.app);
            this.globalErrorHandler(this.app);
        });
    }
    redisSessionMiddleware(app) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!redis_1.redisClient.isOpen)
                    yield redis_1.redisClient.connect();
                app.use((0, express_session_1.default)({
                    store: new redis_1.RedisStore({ client: redis_1.redisClient }),
                    secret: process.env.SESSION_SECRET || "your_secret_key",
                    resave: false,
                    saveUninitialized: false,
                    cookie: {
                        secure: process.env.NODE_ENV === "production",
                        httpOnly: true,
                        maxAge: 1000 * 60 * 60 * 24, // 1 day
                    },
                }));
            }
            catch (error) {
                console.error("❌ Redis Connection Error:", error);
            }
        });
    }
    standardMiddleware(app) {
        app.use((0, compression_1.default)());
        app.use((0, express_1.json)({ limit: "50mb" }));
        app.use((0, express_1.urlencoded)({ extended: true, limit: "50mb" }));
        app.disable("x-powered-by");
    }
    routesMiddleware(app) {
        (0, routes_1.default)(app);
    }
    apiMonitoring(app) {
        // Add API monitoring logic here (e.g., Prometheus, Datadog)
    }
    securityMiddleware(app) {
        app.use((0, hpp_1.default)());
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)({
            origin: "*",
            optionsSuccessStatus: 200,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        }));
        if (process.env.NODE_ENV !== "test") {
            const limiter = (0, express_rate_limit_1.default)({
                windowMs: 15 * 60 * 1000, // 15 minutes
                max: 100,
                message: "Too many requests from this IP, please try again later.",
            });
            app.use(limiter);
            app.set("trust proxy", 1);
        }
    }
    globalErrorHandler(app) {
        app.all("*", (req, res) => {
            res.status(http_status_codes_1.default.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
        });
        const errorHandler = (error, req, res, next) => {
            var _a;
            if (error instanceof error_handler_1.CustomError) {
                res.status(error.statusCode).json(error.serializeErrors());
            }
            else {
                res.status(http_status_codes_1.default.BAD_REQUEST).send({
                    status: "BAD_REQUEST",
                    message: (_a = error.message) !== null && _a !== void 0 ? _a : "Something went wrong.",
                    statusCode: http_status_codes_1.default.BAD_REQUEST,
                });
            }
        };
        app.use(errorHandler);
    }
    startServer(app) {
        app.listen(process.env.PORT, () => __awaiter(this, void 0, void 0, function* () { return console.log(`Listening on port ${process.env.PORT}`); }));
    }
    getApp() {
        return this.app;
    }
}
exports.Server = Server;
//# sourceMappingURL=setupServer.js.map