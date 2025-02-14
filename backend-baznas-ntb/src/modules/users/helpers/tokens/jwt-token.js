import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { parentPort, isMainThread } from "node:worker_threads";

dotenv.config();

/**
 *
 * @scoop {user}
 * @description generate jwt token
 * @return {object} data
 *
 */

if (!isMainThread) {
  parentPort.on("message", async (data) => {
    const { type, payload } = data;

    if (type === "refresh_token") {
      const isJwtRef = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      parentPort.postMessage(isJwtRef);
      return;
    }

    const isJwt = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    parentPort.postMessage(isJwt);
  });
}
