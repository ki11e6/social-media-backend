import express, { Router } from 'express';

class CommentRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    return this.router;
  }
}

export const commentRoutes: CommentRoutes = new CommentRoutes();
