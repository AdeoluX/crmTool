"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModel = void 0;
const mongoose_1 = require("mongoose");
// Define the Mongoose schema without extending Document
const AddressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true }
}, {
    timestamps: true, // Mongoose automatically adds createdAt and updatedAt
});
// Use `model<IAddress>` without extending Document
exports.AddressModel = (0, mongoose_1.model)("Address", AddressSchema);
//# sourceMappingURL=address.schema.js.map