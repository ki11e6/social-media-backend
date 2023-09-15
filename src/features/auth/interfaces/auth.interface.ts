import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IUserDocument } from '@user/interfaces/user.interface';

//creating new property in Request Express,currentUser property
declare global {
  namespace Express {
    interface Request {
      currentUser?: AuthPayload;
    }
  }
}

//currentUser is based on AuthPayload
export interface AuthPayload {
  userId: string;
  uId: string;
  email: string;
  username: string;
  avatarColor: string;
  iat?: number;
}

//document schema
export interface IAuthDocument extends Document {
  _id: string | ObjectId;
  uId: string;
  username: string;
  email: string;
  password?: string;
  avatarColor: string;
  createdAt: Date;
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
  role: 'user' | 'admin';
  blockedByAdmin: boolean;
  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

export interface ISignUpData {
  _id: ObjectId;
  uId: string;
  email: string;
  username: string;
  password: string;
  avatarColor: string;
}

export interface IAuthJob {
  value?: string | IAuthDocument | IUserDocument;
}

// '?' is optional so info like password will not be shared and currentUser? is optional so it will not be available when user not logged in
