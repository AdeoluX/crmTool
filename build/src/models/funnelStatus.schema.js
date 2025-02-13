"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunnelStatusModel = void 0;
const mongoose_1 = require("mongoose");
const BASE_URL = process.env.BASE_URL;
const FunnelStatusSchema = new mongoose_1.Schema({
    status: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.FunnelStatusModel = (0, mongoose_1.model)("FunnelStatus", FunnelStatusSchema);
//# sourceMappingURL=funnelStatus.schema.js.map