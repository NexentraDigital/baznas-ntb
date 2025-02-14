import crypto from "crypto";
import bcrypt from "bcrypt";
import { parentPort, isMainThread } from "node:worker_threads";

/**
 *
 * @scoop {global}
 * @body {data} menetukan data hashing dan token dari worker (boject)
 * @description fungsi compare hash password
 * @return {object} boolean
 *
 */

if (!isMainThread) {
  parentPort.on("message", async () => {
    const token = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(token, 10);
    parentPort.postMessage({ hash, token });
  });
}
