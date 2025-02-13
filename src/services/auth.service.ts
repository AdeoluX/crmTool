import Utils from "../utils/helper.utils";
import {
  IactivateCompany,
  IsignIn,
  IsignUp,
  ServiceRes,
} from "./types/app.types";
import { IUser, UserModel } from "../models/user.schema";
import { compare } from "bcrypt";
import { redisClient } from "../config/redis";
import { CompanyModel, ICompany } from "models/company.schema";
import { randomUUID } from "crypto";

export class AuthService {
  public async signIn(payload: IsignIn): Promise<ServiceRes> {
    const { email, password } = payload;
    const user: IUser | null = await UserModel.findOne({ email });
    if (!user) return { success: false, message: "Invalid credentials" };
    const isValid = await user.isValidPassword(password);
    if (!isValid) return { success: false, message: "Invalid credentials" };
    const token = Utils.signToken({ email, id: user._id, role: user.role });
    const sessionData = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    try {
      await redisClient.set(`session:${user._id}`, JSON.stringify(sessionData), {
        EX: 60 * 60 * 24,
      });
    } catch (error) {
      console.error("Error storing session in Redis:", error);
      return { success: false, message: "Failed to create session" };
    }
    return {
      success: true,
      message: "Logged in successfully.",
      token,
    };
  }

  public async signUp(payload: IsignUp): Promise<ServiceRes> {
    let { email, password, confirmPassword, phoneNumber, plan } = payload;
    let company: ICompany | null = await CompanyModel.findOne({ email });
    if (company) return { success: false, message: "Invalid credentials" };
    if(password !== confirmPassword) return { success: false, message: 'Passwords must match.' }
    if(!plan){
      plan = process.env.HOBBYPLAN! 
    }
    const uuid = randomUUID()
    company = await CompanyModel.create({
      email,
      password,
      phoneNumber,
      currentPlan: plan,
      activateId: uuid
    })
    //Send Email
    return {
      success: true,
      message: `User signed up successfully.`,
      ...(process.env.NODE_ENV !== 'production' && { data: { activateId: uuid } })
    };
  }

  public async activateCompany(payload: IactivateCompany): Promise<ServiceRes> {
    let { activateId, password, } = payload;
    let company: ICompany | null = await CompanyModel.findOne({ activateId });
    if (!company) return { success: false, message: "Invalid credentials" };
    const isValid = await company.isValidPassword(password);
    if(!isValid) return { success: false, message: 'Invalid credentials' }
    await company.updateOne({ activated: true })
    const token = Utils.signToken({ email: company.email, id: company._id });
    const sessionData = {
      id: company._id,
      email: company.email
    };
    try {
      await redisClient.set(`session:${company._id}`, JSON.stringify(sessionData), {
        EX: 60 * 60 * 24,
      });
    } catch (error) {
      console.error("Error storing session in Redis:", error);
      return { success: false, message: "Failed to create session" };
    }
    return {
      success: true,
      message: `User signed up successfully.`,
      data: {
        token
      }
    };
  }
}
