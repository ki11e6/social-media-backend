import { adminService } from '@service/db/admin.service';
// import { IUserDocument } from '@user/interfaces/user.interface';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export class Get {
  public async allUsers(req: Request, res: Response): Promise<void> {
    const user = await adminService.getAllUsers();
    const userCount: number = await adminService.getTotalUsersInDB();
    if (!userCount) {
      res.status(HTTP_STATUS.OK).json({ message: 'No users', users: user, totalUsers: userCount });
    } else {
      res.status(HTTP_STATUS.OK).json({ message: 'All users', users: user, totalUsers: userCount });
    }
  }
}
