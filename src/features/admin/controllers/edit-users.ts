import { IAdminDocument } from '@admin/interfaces/admin.interface';
import { Helpers } from '@global/helpers/helpers';
import { adminService } from '@service/db/admin.service';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import mongoose from 'mongoose';

export class Edit {
  public async blockUser(req: Request, res: Response): Promise<void> {
    const { authId, blockedByAdmin } = req.body;
    const updatedBlockStatus = await adminService.updateBlockedByAdminStatus(authId, blockedByAdmin);
    res.status(HTTP_STATUS.OK).json({ message: 'User Blocked Status Updated', user: updatedBlockStatus });
  }

  public async promoteUser(req: Request, res: Response): Promise<void> {
    const { authId, uId, username, email, avatarColor, profilePicture } = req.body;
    const userData: IAdminDocument = {
      authId: new mongoose.Types.ObjectId(authId),
      uId,
      username: Helpers.firstLetterUppercase(username),
      email: Helpers.lowerCase(email),
      avatarColor,
      profilePicture,
      role: 'admin',
      blockedByAdmin: false,
      createdAt: new Date()
    } as IAdminDocument;
    const newAdmin: IAdminDocument = await adminService.promoteToAdmin(userData);
    res.status(HTTP_STATUS.OK).json({ message: 'New Admin is Created', user: newAdmin });
  }
}
