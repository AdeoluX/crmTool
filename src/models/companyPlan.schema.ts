import { Document, Schema, model } from "mongoose";

export interface ICompanyPlan extends Document {
  company: Schema.Types.ObjectId;
  plan: Schema.Types.ObjectId;
  isValid: boolean;
  startDate: Date;
  endDate: Date;
}

const CompanyPlanSchema: Schema<ICompanyPlan> = new Schema<ICompanyPlan>(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: 'Plan',
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
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

export const CompanyPlanModel = model<ICompanyPlan>("CompanyPlan", CompanyPlanSchema);
