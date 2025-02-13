"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = void 0;
const mongoose_1 = require("mongoose");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const ContactSchema = new mongoose_1.Schema({
    email: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    middleName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    jobTitle: {
        type: String
    },
    companyName: {
        type: String
    },
    companyWebsite: {
        type: String
    },
    annualRevenue: {
        type: Number
    },
    noOfEmployees: {
        type: Number
    },
    dob: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    incomeLevel: {
        type: Number
    },
    maritalStatus: {
        type: String,
        enum: ['married', 'single']
    },
    timeZone: {
        type: String,
        required: true,
        default: "UTC",
        validate: {
            validator: (value) => moment_timezone_1.default.tz.zone(value) !== null,
            message: props => `${props.value} is not a valid IANA time zone!`
        },
    },
    preferedContactMethod: {
        type: String,
        enum: ['email', 'phone']
    },
    subscriptionStatus: {
        type: String,
        enum: ['opt-in', 'opt-out']
    },
    marketingPreference: {
        type: String,
        enum: ['weekly', 'monthly-newletter', 'product-updates', 'event-invitations']
    },
    socialMedia: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'SocialMediaInfo',
            required: true
        }],
    address: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Address'
        }],
    funnelStatus: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'FunnelStatus',
        required: true
    },
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    industry: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Industry',
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
exports.ContactModel = (0, mongoose_1.model)("Contact", ContactSchema);
//# sourceMappingURL=contact.schema.js.map