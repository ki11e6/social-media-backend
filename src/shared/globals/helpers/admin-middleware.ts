import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '@global/helpers/error-handler';

export class AdminMiddleware {
  public checkAdmin(req: Request, _res: Response, next: NextFunction): void {
    const currentUser = req.currentUser;
    if (currentUser && currentUser.role === 'admin') {
      // User has admin role, allow access to the route
      next();
    } else {
      throw new NotAuthorizedError('Higher Authentication is required to access this route.');
    }
  }
}

export const adminMiddleware: AdminMiddleware = new AdminMiddleware();
