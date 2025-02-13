import { Document, Schema, model } from "mongoose";

const BASE_URL = process.env.BASE_URL;

export interface IFunnelStatus extends Document {
  status: string;
}

const FunnelStatusSchema: Schema<IFunnelStatus> = new Schema<IFunnelStatus>(
  {
    status: {
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

export const FunnelStatusModel = model<IFunnelStatus>("FunnelStatus", FunnelStatusSchema);
