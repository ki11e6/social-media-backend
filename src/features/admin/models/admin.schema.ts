import { IAdminDocument } from '@admin/interfaces/admin.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const adminSchema: Schema = new Schema({
  authId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', index: true },
  username: { type: String },
  email: { type: String },
  avatarColor: { type: String },
  profilePicture: { type: String, default: '' },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin'
  },
  blockedByAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now }
});

const AdminModel: Model<IAdminDocument> = model<IAdminDocument>('Admin', adminSchema, 'Admin');
export { AdminModel };
