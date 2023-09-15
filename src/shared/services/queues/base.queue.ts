import Queue, { Job } from 'bull';
import Logger from 'bunyan';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { config } from '@root/config';
import { IAuthJob } from '@auth/interfaces/auth.interface';
import { IEmailJob } from '@user/interfaces/user.interface';
import { IPostJobData } from '@post/interfaces/post.interface';

type IBaseJobData = IAuthJob | IEmailJob | IPostJobData;

let bullAdapters: BullAdapter[] = [];
export let serverAdapter: ExpressAdapter;

export abstract class BaseQueue {
  queue: Queue.Queue;
  log: Logger;

  constructor(queueName: string) {
    this.queue = new Queue(queueName, `${config.REDIS_HOST}`);
    bullAdapters.push(new BullAdapter(this.queue));
    //in case duplicates are created here using Set method we reassign the bullAdapters
    bullAdapters = [...new Set(bullAdapters)];
    serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/queues');

    createBullBoard({
      queues: bullAdapters,
      serverAdapter
    });

    this.log = config.createLogger(`${queueName}Queue`);

    // remove jobs when completed, it lision to event 'completed'.
    this.queue.on('completed', (job: Job) => {
      job.remove();
    });
    //console log when job are globally completed
    this.queue.on('global:completed', (jobId: string) => {
      this.log.info(`Job ${jobId} completed`);
    });
    //when job are stalled
    this.queue.on('global:stalled', (jobId: string) => {
      this.log.info(`Job ${jobId} is stalled`);
    });
  }

  //a new job  added to the Bull queue. If the job fails, it will be retried up to three times with a 5-second delay between each retry.
  protected addJob(name: string, data: IBaseJobData): void {
    this.queue.add(name, data, { attempts: 3, backoff: { type: 'fixed', delay: 5000 } });
  }
  //sets up a worker that listens to the specified job type in the Bull queue. When jobs of that type are added to the queue, the worker will execute the provided callback function for each job. concurrency is used to specify number  of jobs that can be processed concurrently
  protected processJob(name: string, concurrency: number, callback: Queue.ProcessCallbackFunction<void>): void {
    this.queue.process(name, concurrency, callback);
  }
}
