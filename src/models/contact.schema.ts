import { Document, Schema, Types, model } from "mongoose";
import moment from 'moment-timezone';


export interface IContact extends Document {
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  jobTitle: string;
  companyName: string;
  companyWebsite: string;
  noOfEmployees: number;
  annualRevenue: number;
  dob: Date;
  gender: string;
  incomeLevel: number;
  maritalStatus: string;
  preferedLanguage: string;
  timeZone: string;
  preferedContactMethod: string;
  subscriptionStatus: string;
  marketingPreference: string;
  company: Schema.Types.ObjectId;
  industry: Schema.Types.ObjectId;
  funnelStatus: Schema.Types.ObjectId;
  socialMedia: Array<Schema.Types.ObjectId>;
  address: Array<Schema.Types.ObjectId>;
  deletedAt: Date;
}

const ContactSchema : Schema<IContact> = new Schema<IContact>(
  {
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
    incomeLevel:{
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
        validator: (value: string) => moment.tz.zone(value) !== null,
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
      type: Schema.Types.ObjectId,
      ref: 'SocialMediaInfo',
      required: true
    }],
    address: [{
      type: Schema.Types.ObjectId,
      ref: 'Address'
    }],
    funnelStatus: {
      type: Schema.Types.ObjectId,
      ref: 'FunnelStatus',
      required: true
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    },
    industry: {
      type: Schema.Types.ObjectId,
      ref: 'Industry',
      required: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);


export const ContactModel = model<IContact>("Contact", ContactSchema);
