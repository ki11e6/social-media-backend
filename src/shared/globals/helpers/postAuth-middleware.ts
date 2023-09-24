import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError, NotFoundError } from '@global/helpers/error-handler';
import { PostModel } from '@post/models/post.schema';

export class PostAuthMiddleware {
  public async checkAuthentication(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const userId = req.currentUser?.userId;
    const postId = req.params.postId;
    // Check if the user is authenticated
    if (!userId) {
      throw new NotAuthorizedError('Authentication is required to access this route.');
    }
    // Check if the post exists
    let post;
    try {
      post = await PostModel.findById(postId);
    } catch (error) {
      throw new NotFoundError('Post not found');
    }
    if (post?.userId.toString() !== userId) {
      // Check if the authenticated user is the owner of the post
      throw new NotAuthorizedError('You are not authorized to modify this post.');
    }
    next();
  }
}

export const postAuthMiddleware: PostAuthMiddleware = new PostAuthMiddleware();
