import bcrypt from "bcrypt";
import { parentPort, isMainThread } from "node:worker_threads";

/**
 *
 * @scoop {global}
 * @body {data} menetukan data hash dari worker (boject)
 * @description fungsi compare hash password
 * @return {object} boolean
 *
 */

if (!isMainThread) {
  parentPort.on("message", async (data) => {
    const result = await bcrypt.hash(data.data, 10);
    parentPort.postMessage(result);
  });
}
