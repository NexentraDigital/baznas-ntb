import cluster from "node:cluster";

export default async function clusterKill() {
  const interval = setInterval(() => {
    cluster.worker.kill();
  }, 1000);

  cluster.on("exit", () => {
    clearInterval(interval);
  });
}
