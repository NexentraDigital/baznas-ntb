import { emailWorker } from "./email-worker.js";
import { createQueue } from "#root/src/configs/bull.js";

/**
 *
 * @scoop {user}
 * @params {key} menetukan key queue email
 * @description fungsi membuat job queue email
 * @return {object} data
 *
 */

export const emailQueue = createQueue("email_queue");

emailQueue.on("completed", (job) => {
  job.remove();
  console.log(`Job ${job.id} completed successfully`);
});

emailQueue.on("failed", (job, err) => {
  job.remove();
  console.log(`Job ${job.id} failed with error: ${err.message}`);
});

emailQueue.on("progress", (job, progress) => {
  console.log(`Job ${job.id} is ${progress}% complete`);
});

export const addEmailJob = async (option, data) => {
  const opts = { priority: 0, attempts: 5 };
  emailQueue.add(option, data, {
    attempts: opts.attempts,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: true,
  });
};

emailQueue.process("send_email", (job, done) => {
  return emailWorker(job, done);
});
