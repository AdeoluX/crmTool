import { randomUUID, UUID } from "crypto";
import { hash, compare } from "bcrypt";
import { Document, Schema, Types, model } from "mongoose";


export interface ICompany extends Document {
  isValidPassword(password: string): unknown;
  companyName: string;
  email: string;
  password: string;
  phoneNumber: string;
  currentPlan: Schema.Types.ObjectId;
  activateId: UUID;
  activated: boolean;
}

const CompanySchema : Schema<ICompany> = new Schema<ICompany>(
  {
    companyName: { 
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    currentPlan: {
      type: Schema.Types.ObjectId,
      ref: 'CompanyPlan',
    },
    activateId: {
      type: String,
    },
    activated: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

CompanySchema.method(
  "isValidPassword",
  async function (password: string): Promise<boolean> {
    const isValid = await compare(password, this.password);
    return isValid;
  }
);

CompanySchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});


export const CompanyModel = model<ICompany>("Company", CompanySchema);
