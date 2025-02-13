import { Document, Schema, model } from "mongoose";

export interface ISocialMediaInfo extends Document {
  socialMedia: string;
  url: string;
}

const SocialMediaInfoSchema: Schema<ISocialMediaInfo> = new Schema<ISocialMediaInfo>(
  {
    socialMedia: {
      type: String,
      enum: ['linkedIn', 'facebook', 'twitter', 'instagram'],
      required: true,
    },
    url: {
      type: String,
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

export const SocialMediaInfoModel = model<ISocialMediaInfo>("SocialMediaInfo", SocialMediaInfoSchema);
