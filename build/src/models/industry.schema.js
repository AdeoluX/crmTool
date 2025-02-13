"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryModel = void 0;
const mongoose_1 = require("mongoose");
const IndustrySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.IndustryModel = (0, mongoose_1.model)("Industry", IndustrySchema);
//# sourceMappingURL=industry.schema.js.map