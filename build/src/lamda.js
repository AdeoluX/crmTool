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
exports.handler = void 0;
const serverless_express_1 = __importDefault(require("@vendia/serverless-express"));
const lamdaConfig_1 = __importDefault(require("./lamdaConfig")); // Import your Express app
const server = (0, serverless_express_1.default)({ app: lamdaConfig_1.default }); //
const handler = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    return server(event, context, callback);
});
exports.handler = handler;
//# sourceMappingURL=lamda.js.map