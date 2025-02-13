"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactEngagementModel = void 0;
const mongoose_1 = require("mongoose");
const ContactEngagementSchema = new mongoose_1.Schema({
    engagementType: {
        type: String,
        enum: ['email', 'call'],
        required: true,
    },
    contact: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Contact',
        required: true,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.ContactEngagementModel = (0, mongoose_1.model)("ContactEngagement", ContactEngagementSchema);
//# sourceMappingURL=contactEngagement.schema.js.map