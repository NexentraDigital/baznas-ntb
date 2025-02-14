import { parentPort, isMainThread } from "node:worker_threads";

if (!isMainThread) {
  parentPort.on("message", async (data) => {
    const { expiredAt } = data;
    const expired = new Date(expiredAt);
    const isNow = new Date();

    if (isNow > expired) {
      parentPort.postMessage(true);
      return; // Prevent double postMessage
    }

    parentPort.postMessage(false);
  });
}
