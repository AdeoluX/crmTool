"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setupServer_1 = require("./setupServer");
const express_1 = __importDefault(require("express"));
exports.default = new setupServer_1.Server((0, express_1.default)()).getApp();
//# sourceMappingURL=lamdaConfig.js.map