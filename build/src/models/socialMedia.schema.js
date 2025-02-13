"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaInfoModel = void 0;
const mongoose_1 = require("mongoose");
const SocialMediaInfoSchema = new mongoose_1.Schema({
    socialMedia: {
        type: String,
        enum: ['linkedIn', 'facebook', 'twitter', 'instagram'],
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.SocialMediaInfoModel = (0, mongoose_1.model)("SocialMediaInfo", SocialMediaInfoSchema);
//# sourceMappingURL=socialMedia.schema.js.map