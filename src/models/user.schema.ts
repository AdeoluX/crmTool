import { hash, compare } from "bcrypt";
import { Document, Schema, Types, model } from "mongoose";


export interface IUser extends Document {
  isValidPassword(password: string): unknown;
  company: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  middleName: string;
  email?: string;
  phoneNumber: string;
  password: string;
  role: string;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: String,
    email: String,
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "marketing", "sales"]
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

UserSchema.method(
  "isValidPassword",
  async function (password: string): Promise<boolean> {
    const isValid = await compare(password, this.password);
    return isValid;
  }
);

UserSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

export const UserModel = model<IUser>("User", UserSchema);
