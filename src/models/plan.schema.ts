import { Document, Schema, model } from "mongoose";

export interface IPlan extends Document {
  name: string;
  userLimit: number;
  contactLimit: number;
  monthlyEmailLimit: number;
  analyticalFeature: string;
  staffLimit: number;
  price: number
}

const PlanSchema: Schema<IPlan> = new Schema<IPlan>(
  {
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
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

export const PlanModel = model<IPlan>("Plan", PlanSchema);
