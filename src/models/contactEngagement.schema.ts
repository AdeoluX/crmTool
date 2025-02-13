import { Document, Schema, model } from "mongoose";

export interface IContactEngagement extends Document {
  contact: Schema.Types.ObjectId;
  engagementType: string;
}

const ContactEngagementSchema: Schema<IContactEngagement> = new Schema<IContactEngagement>(
  {
    engagementType: {
      type: String,
      enum: ['email', 'call'],
      required: true,
    },
    contact: {
      type: Schema.Types.ObjectId,
      ref: 'Contact',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

export const ContactEngagementModel = model<IContactEngagement>("ContactEngagement", ContactEngagementSchema);
