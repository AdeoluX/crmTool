"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.RedisStore = void 0;
const redis_1 = require("redis");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redisClient = (0, redis_1.createClient)({
    socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
    },
});
exports.redisClient = redisClient;
redisClient.on("error", (err) => console.error("❌ Redis Client Error", err));
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
exports.RedisStore = RedisStore;
//# sourceMappingURL=redis.js.map