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
exports.authMiddleware = exports.AuthMiddleware = void 0;
const error_handler_1 = require("../utils/error-handler");
const helper_utils_1 = __importDefault(require("../utils/helper.utils"));
const redis_1 = require("../config/redis");
class AuthMiddleware {
    constructor(allowedRoles = []) {
        this.allowedRoles = allowedRoles;
        this.verifyUser = this.verifyUser.bind(this);
    }
    verifyUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
                throw new error_handler_1.NotAuthorizedError("Token is not available. Please login again.");
            }
            try {
                const BearerToken = (_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization.split(" ")[1];
                if (!BearerToken) {
                    throw new error_handler_1.NotAuthorizedError("Token is not available. Please login again.");
                }
                const payload = helper_utils_1.default.verifyToken(BearerToken);
                if (!payload) {
                    throw new error_handler_1.NotAuthorizedError("You do not have permission to perform this action.");
                }
                const sessionData = yield redis_1.redisClient.get(`session:${payload.id}`);
                if (!sessionData) {
                    throw new error_handler_1.NotAuthorizedError("Session has expired. Please login again.");
                }
                const parsedSessionData = JSON.parse(sessionData);
                if (this.allowedRoles.length > 0 && !this.allowedRoles.includes(parsedSessionData.role)) {
                    throw new error_handler_1.NotAuthorizedError("You do not have permission to perform this action.");
                }
                req.body = Object.assign(Object.assign({}, req.body), { authorizer: parsedSessionData });
            }
            catch (error) {
                next(new error_handler_1.NotAuthorizedError("You do not have permission to perform this action. Please login."));
            }
            next();
        });
    }
    static withRoles(allowedRoles) {
        return new AuthMiddleware(allowedRoles);
    }
}
exports.AuthMiddleware = AuthMiddleware;
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=auth.middleware.js.map