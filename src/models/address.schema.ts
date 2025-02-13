import { Document, Schema, model } from "mongoose";

export interface IAddress extends Document {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string
}

const AddressSchema: Schema<IAddress> = new Schema<IAddress>(
  {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    postalCode: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

export const AddressModel = model<IAddress>("Address", AddressSchema);
