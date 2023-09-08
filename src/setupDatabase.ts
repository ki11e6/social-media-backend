import mongoose from 'mongoose';
import Logger from 'bunyan';
import { config } from '@root/config';
// import { redisConnection } from '@service/redis/redis.connection';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info('Successfully connected to database.');
        // redisConnection.connect();
      })
      .catch((error) => {
        log.error('Error connecting to database', error);
        //this will exit form the current process (there will be some processes)
        return process.exit(1);
      });
  };
  connect();
  //this is an event , if disconnected it will try to reconnect
  mongoose.connection.on('disconnected', connect);
};
