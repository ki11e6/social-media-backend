import { BaseCache } from '@service/redis/base.cache';
import Logger from 'bunyan';
import { find } from 'lodash';
import { config } from '@root/config';
import { NotAuthorizedError, NotFoundError, ServerError } from '@global/helpers/error-handler';
import { Helpers } from '@global/helpers/helpers';
import { ICommentDocument, ICommentNameList } from '@comment/interfaces/comment.interface';

const log: Logger = config.createLogger('commentsCache');

export class CommentCache extends BaseCache {
  constructor() {
    super('commentsCache');
  }

  public async savePostCommentToCache(postId: string, value: string): Promise<void> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      //push at beginning of list.
      await this.client.LPUSH(`comments:${postId}`, value);
      //get commentsCount from post.
      const commentsCount: string[] = await this.client.HMGET(`posts:${postId}`, 'commentsCount');
      let count: number = Helpers.parseJson(commentsCount[0]) as number;
      count += 1;
      //update commentsCount in post.
      await this.client.HSET(`posts:${postId}`, 'commentsCount', `${count}`);
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async getCommentsFromCache(postId: string): Promise<ICommentDocument[]> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      const reply: string[] = await this.client.LRANGE(`comments:${postId}`, 0, -1);
      const list: ICommentDocument[] = [];
      for (const item of reply) {
        list.push(Helpers.parseJson(item));
      }
      return list;
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async getCommentsNamesFromCache(postId: string): Promise<ICommentNameList[]> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      const commentsCount: number = await this.client.LLEN(`comments:${postId}`);
      const comments: string[] = await this.client.LRANGE(`comments:${postId}`, 0, -1);
      const list: string[] = [];
      for (const item of comments) {
        const comment: ICommentDocument = Helpers.parseJson(item) as ICommentDocument;
        list.push(comment.username);
      }
      const response: ICommentNameList = {
        count: commentsCount,
        names: list
      };
      return [response];
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async getSingleCommentFromCache(postId: string, commentId: string): Promise<ICommentDocument[]> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      const comments: string[] = await this.client.LRANGE(`comments:${postId}`, 0, -1);
      const list: ICommentDocument[] = [];
      for (const item of comments) {
        list.push(Helpers.parseJson(item));
      }
      const result: ICommentDocument = find(list, (listItem: ICommentDocument) => {
        return listItem._id === commentId;
      }) as ICommentDocument;

      return [result];
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  //remove single comment of an user.
  public async deleteSingleCommentFromCache(postId: string, commentId: string, username: string): Promise<void> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      const comments: string[] = await this.client.LRANGE(`comments:${postId}`, 0, -1);
      const list: ICommentDocument[] = [];
      for (const item of comments) {
        list.push(Helpers.parseJson(item));
      }
      const result: ICommentDocument = find(list, (listItem: ICommentDocument) => {
        return listItem._id === commentId;
      }) as ICommentDocument;

      if (!result) {
        throw new NotFoundError('Comment not found');
      }

      if (result.username === username) {
        const multi: ReturnType<typeof this.client.multi> = this.client.multi();
        multi.LREM(`comments:${postId}`, 1, JSON.stringify(result));
        await multi.exec();
        const commentsCount: string[] = await this.client.HMGET(`posts:${postId}`, 'commentsCount');
        let count: number = Helpers.parseJson(commentsCount[0]) as number;
        count -= 1;
        //update commentsCount in post.
        await this.client.HSET(`posts:${postId}`, 'commentsCount', `${count}`);
      } else {
        throw new NotAuthorizedError('User is not the author of this comment');
      }
    } catch (error) {
      if (error instanceof NotAuthorizedError || error instanceof NotFoundError) {
        // Handle the UnauthorizedError here if needed
        log.error('Error:', error);
        throw error;
      } else {
        // Handle other errors here
        log.error(error);
        throw new ServerError('Server error. Try again.');
      }
    }
  }
}
