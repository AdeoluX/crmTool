"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanModel = void 0;
const mongoose_1 = require("mongoose");
const PlanSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    userLimit: {
        type: Number,
        required: true
    },
    contactLimit: {
        type: Number,
        required: true,
    },
    monthlyEmailLimit: {
        type: Number,
        required: true,
    },
    analyticalFeature: {
        type: String
    },
    staffLimit: {
        type: Number,
        required: true,
    },
    price: {
        type: Number
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.PlanModel = (0, mongoose_1.model)("Plan", PlanSchema);
//# sourceMappingURL=plan.schema.js.map