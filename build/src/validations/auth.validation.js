"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpValidation = exports.signInValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const messages = {
    'any.only': 'Status must be either "completed" or "pending".',
    'string.base': 'Field must be a string.',
    'string.empty': 'Field cannot be empty.',
    'number.base': 'Field must be a number.',
};
exports.signInValidation = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        isAdmin: joi_1.default.boolean().required(),
    }).messages(messages)
};
exports.signUpValidation = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        confirmPassword: joi_1.default.string().required(),
        phoneNumber: joi_1.default.string().optional(),
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        middleName: joi_1.default.string().optional(),
        isAdmin: joi_1.default.boolean().required(),
    }).messages(messages)
};
//# sourceMappingURL=auth.validation.js.map