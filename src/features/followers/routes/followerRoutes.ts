import express, { Router } from 'express';

class FollowerRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    return this.router;
  }
}

export const followerRoutes: FollowerRoutes = new FollowerRoutes();
