const { createClient } = require("redis");
const Bull = require("bull");
const path = require("path");

const WorkerSpawner = require("./WorkerSpawner");
const ServerRunner = require("../api/ServerRunner");
const Que = require("./Que");

module.exports = async () => {
  const client = createClient();
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  const { inputCalculatorQueue } = Que();

  const { workers, stopJob } = WorkerSpawner(
    path.resolve(__dirname, "..", "..", "index.js")
  );

  ServerRunner({
    inputCalculatorQueue,
    redisClient: client,
    stopJob,
    workers,
  });
};
