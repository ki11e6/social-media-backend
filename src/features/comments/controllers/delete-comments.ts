import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { CommentCache } from '@service/redis/comment.cache';
import { commentService } from '@service/db/comment.service';
import mongoose from 'mongoose';

const commentCache: CommentCache = new CommentCache();

export class Delete {
  public async singleComment(req: Request, res: Response): Promise<void> {
    const { postId, commentId } = req.params;
    await commentCache.deleteSingleCommentFromCache(postId, commentId, `${req.currentUser!.username}`);
    commentService.removeCommentDataFromDB(
      {
        _id: new mongoose.Types.ObjectId(commentId),
        postId: new mongoose.Types.ObjectId(postId)
      },
      `${req.currentUser!.username}`
    );
    res.status(HTTP_STATUS.OK).json({ message: 'Post deleted successfully' });
  }
}
