import bcrypt from "bcrypt";
import { parentPort, isMainThread } from "node:worker_threads";

/**
 *
 * @scoop {global}
 * @body {data} menetukan data encrypt dari worker (boject)
 * @description fungsi compare hash password
 * @return {object} boolean 
 *
 */

if (!isMainThread) {
  parentPort.on("message", async (data) => {
    if (!data) throw new Error("Data tidak ditemukan");
    const result = await bcrypt.compare(data.data, data.hash);
    parentPort.postMessage(result);
  });
}
