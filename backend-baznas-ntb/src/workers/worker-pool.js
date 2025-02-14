import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 *
 * @scoop {global}
 * @description mengaitkan task worker
 * @return {object} data
 *
 */

const workerPath = {
  hashed: path.join(__dirname, "../modules/users/helpers/encrypt/hashing.js"),
  hashToken: path.join(
    __dirname,
    "../modules/users/helpers/encrypt/hashing-token.js"
  ),
  compareToken: path.join(
    __dirname,
    "../modules/users/helpers/encrypt/compare-hash.js"
  ),
  imageOptimized: path.join(
    __dirname,
    "../shared/utils/image-optimize/image-optimize.js"
  ),
  generateJwt: path.join(
    __dirname,
    "../modules/users/helpers/token/jwt-token.js"
  ),
  checkExpired: path.join(
    __dirname,
    "../shared/utils/times/check-expired-time.js"
  ),
};

/**
 *
 * @scoop {global}
 * @description class workerpool handel tugas berat
 * @return {object} data
 *
 */

class WorkerPool {
  constructor(numThreads = os.cpus().length) {
    this.workers = {};
    this.queue = {};
    this.currentWorker = {};

    Object.keys(workerPath).forEach((type) => {
      this.workers[type] = [];
      this.queue[type] = [];
      this.currentWorker[type] = 0;

      for (let i = 0; i < numThreads; i++) {
        const worker = new Worker(workerPath[type]);

        worker.on("message", (result) => {
          const callback = this.queue[type].shift();
          callback(result);
        });

        worker.on("error", (error) => {
          const callback = this.queue[type].shift();
          callback(null, error);
        });

        this.workers[type].push(worker);
      }
    });
  }

  worker(type, data) {
    return new Promise((resolve, reject) => {
      if (!workerPath[type]) {
        reject(new Error("Worker tidak dapat ditemukan"));
        return;
      }

      this.currentWorker[type] =
        (this.currentWorker[type] + 1) % this.workers[type].length;

      this.queue[type].push((result, error) => {
        if (error) reject(error);
        else resolve(result);
      });

      this.workers[type][this.currentWorker[type]].postMessage(
        data || { type }
      );
    });
  }

  terminate() {
    Object.values(this.workers).forEach((workerGroup) => {
      workerGroup.forEach((worker) => worker.terminate());
    });
  }
}

const workerPool = new WorkerPool();
export default workerPool;
