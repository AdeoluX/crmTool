import { Document, Schema, model } from "mongoose";

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

// Define the Mongoose schema without extending Document
const AddressSchema = new Schema<IAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  {
    timestamps: true, // Mongoose automatically adds createdAt and updatedAt
  }
);

// Use `model<IAddress>` without extending Document
export const AddressModel = model<IAddress>("Address", AddressSchema);
