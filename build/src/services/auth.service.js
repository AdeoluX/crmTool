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
exports.AuthService = void 0;
const helper_utils_1 = __importDefault(require("../utils/helper.utils"));
const user_schema_1 = require("../models/user.schema");
const redis_1 = require("../config/redis");
const company_schema_1 = require("models/company.schema");
const crypto_1 = require("crypto");
class AuthService {
    signIn(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield user_schema_1.UserModel.findOne({ email });
            if (!user)
                return { success: false, message: "Invalid credentials" };
            const isValid = yield user.isValidPassword(password);
            if (!isValid)
                return { success: false, message: "Invalid credentials" };
            const token = helper_utils_1.default.signToken({ email, id: user._id, role: user.role });
            const sessionData = {
                id: user._id,
                email: user.email,
                role: user.role,
            };
            try {
                yield redis_1.redisClient.set(`session:${user._id}`, JSON.stringify(sessionData), {
                    EX: 60 * 60 * 24,
                });
            }
            catch (error) {
                console.error("Error storing session in Redis:", error);
                return { success: false, message: "Failed to create session" };
            }
            return {
                success: true,
                message: "Logged in successfully.",
                token,
            };
        });
    }
    signUp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password, confirmPassword, phoneNumber, plan } = payload;
            let company = yield company_schema_1.CompanyModel.findOne({ email });
            if (company)
                return { success: false, message: "Invalid credentials" };
            if (password !== confirmPassword)
                return { success: false, message: 'Passwords must match.' };
            if (!plan) {
                plan = process.env.HOBBYPLAN;
            }
            const uuid = (0, crypto_1.randomUUID)();
            company = yield company_schema_1.CompanyModel.create({
                email,
                password,
                phoneNumber,
                currentPlan: plan,
                activateId: uuid
            });
            //Send Email
            return Object.assign({ success: true, message: `User signed up successfully.` }, (process.env.NODE_ENV !== 'production' && { data: { activateId: uuid } }));
        });
    }
    activateCompany(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let { activateId, password, } = payload;
            let company = yield company_schema_1.CompanyModel.findOne({ activateId });
            if (!company)
                return { success: false, message: "Invalid credentials" };
            const isValid = yield company.isValidPassword(password);
            if (!isValid)
                return { success: false, message: 'Invalid credentials' };
            yield company.updateOne({ activated: true });
            const token = helper_utils_1.default.signToken({ email: company.email, id: company._id });
            const sessionData = {
                id: company._id,
                email: company.email
            };
            try {
                yield redis_1.redisClient.set(`session:${company._id}`, JSON.stringify(sessionData), {
                    EX: 60 * 60 * 24,
                });
            }
            catch (error) {
                console.error("Error storing session in Redis:", error);
                return { success: false, message: "Failed to create session" };
            }
            return {
                success: true,
                message: `User signed up successfully.`,
                data: {
                    token
                }
            };
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map