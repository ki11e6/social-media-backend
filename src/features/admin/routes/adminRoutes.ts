import { Edit } from '@admin/controllers/edit-users';
import { Get } from '@admin/controllers/get-users';
import { adminMiddleware } from '@global/helpers/admin-middleware';
import express, { Router } from 'express';

class AdminRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/admin/users', adminMiddleware.checkAdmin, Get.prototype.allUsers);
    this.router.put('/admin/user/block', adminMiddleware.checkAdmin, Edit.prototype.blockUser);
    this.router.post('/admin/user/promote', adminMiddleware.checkAdmin, Edit.prototype.promoteUser);
    return this.router;
  }
}

export const adminRoutes: AdminRoutes = new AdminRoutes();
