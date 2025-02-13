"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyPlanModel = void 0;
const mongoose_1 = require("mongoose");
const CompanyPlanSchema = new mongoose_1.Schema({
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    plan: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Plan',
        required: true,
    },
    isValid: {
        type: Boolean,
        default: true
    },
    startDate: {
        type: Date,
        default: null
    },
    endDate: {
        type: Date,
        default: null
    },
}, {
    timestamps: true
});
exports.CompanyPlanModel = (0, mongoose_1.model)("CompanyPlan", CompanyPlanSchema);
//# sourceMappingURL=companyPlan.schema.js.map