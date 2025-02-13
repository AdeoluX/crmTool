import mongoose, { Document, Schema, model } from "mongoose";

export interface ICompanyPlan extends Document {
  company: mongoose.Types.ObjectId;
  plan: mongoose.Types.ObjectId;
  isValid: boolean;
  startDate: Date;
  endDate: Date;
}

const CompanyPlanSchema = new Schema<ICompanyPlan>(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    plan: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true
  }
);

export const CompanyPlanModel = model<ICompanyPlan>("CompanyPlan", CompanyPlanSchema);
