import Queue from "bull";
import { cached as redis } from "./redis.js";

/**
 *
 * @scoop {global}
 * @params {name} menetukan nama queue untuk dijadikan key
 * @description config bull dengan ioredis
 * @return {object} data queue
 *
 */

export const createQueue = (name) => {
  return new Queue(name, {
    redis: redis,
    defaultJobOptions: {
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
      removeOnComplete: true,
      removeOnFail: true,
    },
  });
};
