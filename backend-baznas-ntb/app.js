dotenv.config();
import os from "node:os";
import app from "./src/index.js";
import * as dotenv from "dotenv";
import cluster from "node:cluster";
import nodeProcess from "node:process";

/**
 *
 * @scoop {global}
 * @description menggunakan cluster
 *
 */

const cpuNum = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < cpuNum; i++) {
    cluster.fork();
  }

  cluster.on("exit", function (worker, code, signal) {
    console.log(`⛔ No!..worker ${worker.process.pid} stoped`);
    cluster.fork();
  });
} else {
  app.listen(process.env.PORT, function (err) {
    console.log(`✅ Ok!..worker ${nodeProcess.pid}`);
  });
}

nodeProcess.on("uncaughtException", (err) => {
  nodeProcess.exit(1);
});
