import { IAdminDocument } from '@admin/interfaces/admin.interface';
import { AdminModel } from '@admin/models/admin.schema';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { AuthModel } from '@auth/models/auth.schema';
import { InternalServerError, NotFoundError } from '@global/helpers/error-handler';
import { IUserDocument } from '@user/interfaces/user.interface';
import { UserModel } from '@user/models/user.schema';
import Logger from 'bunyan';
import { config } from '@root/config';

const log: Logger = config.createLogger('adminService');

class AdminService {
  public async getAllUsers(): Promise<IUserDocument[]> {
    const users: IUserDocument[] = await UserModel.aggregate([
      { $lookup: { from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId' } },
      { $unwind: '$authId' },
      { $sort: { createdAt: -1 } },
      { $project: this.aggregateProject() }
    ]);
    return users;
  }

  public async getTotalUsersInDB(): Promise<number> {
    const totalCount: number = await UserModel.find({}).countDocuments();
    return totalCount;
  }

  private aggregateProject() {
    return {
      _id: 1,
      username: '$authId.username',
      uId: '$authId.uId',
      email: '$authId.email',
      avatarColor: '$authId.avatarColor',
      role: '$authId.role',
      blockedByAdmin: '$authId.blockedByAdmin',
      createdAt: '$authId.createdAt',
      postsCount: 1,
      work: 1,
      school: 1,
      quote: 1,
      location: 1,
      blocked: 1,
      blockedBy: 1,
      followersCount: 1,
      followingCount: 1,
      notifications: 1,
      social: 1,
      bgImageVersion: 1,
      bgImageId: 1,
      profilePicture: 1
    };
  }

  public async updateBlockedByAdminStatus(authId: string, blockedByAdmin: boolean): Promise<IAuthDocument | null> {
    try {
      // Find the document with the specified authId
      const updatedAuth = await AuthModel.findOneAndUpdate(
        { _id: authId },
        { blockedByAdmin },
        { new: true } // Return the updated document
      );

      return updatedAuth;
    } catch (error) {
      throw new InternalServerError('Something went wrong');
    }
  }

  public async promoteToAdmin(authData: IAdminDocument): Promise<IAdminDocument> {
    try {
      const { authId } = authData;
      const updatedUser: IAuthDocument | null = await AuthModel.findOneAndUpdate({ _id: authId }, { role: 'admin' }, { new: true });
      if (!updatedUser) {
        throw new NotFoundError('User not found');
      }
      const newAdmin: IAdminDocument = await AdminModel.create(authData);
      return newAdmin;
    } catch (error) {
      log.error(error);
      throw new InternalServerError('Internal Server Error');
    }
  }
}

export const adminService: AdminService = new AdminService();
