import { Document, Schema, model } from "mongoose";

export interface IIndustry extends Document {
  name: string;
}

const IndustrySchema: Schema<IIndustry> = new Schema<IIndustry>(
  {
    name: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

export const IndustryModel = model<IIndustry>("Industry", IndustrySchema);
