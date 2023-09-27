import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IAuthDocument } from '@auth/interfaces/auth.interface';

export interface IAdminDocument extends Document {
  authId: string | ObjectId;
  uId?: string;
  username?: string;
  email?: string;
  avatarColor?: string;
  profilePicture?: string;
  role: 'admin';
  blockedByAdmin: boolean;
  createdAt: Date;
}

export interface IAdminJob {
  value?: string | IAdminDocument | IAuthDocument;
}
