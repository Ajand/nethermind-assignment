const { createClient } = require("redis");
const NonceFinder = require("../services/NonceFinder");
const Bull = require("bull");
const { parentPort, workerData } = require("node:worker_threads");

module.exports = async () => {
  const workerRedisClient = createClient();

  await workerRedisClient.connect();

  const inputCalculatorQueue = new Bull("input-calculator-queue");

  inputCalculatorQueue.process(async (job, done) => {
    const { value } = job.data;
    await workerRedisClient.set(`worker:job:${workerData}`, job.id);
    await workerRedisClient.set(`job:input:${job.id}`, value);

    await workerRedisClient.set(`input:status:${value}`, "Processing");
    parentPort.postMessage(`"Worker is processing: ${value}`);

    const nonceFinder = NonceFinder(workerRedisClient, {
      storeLeap: 4000,
      increament: 1,
      offset: 0,
      freeMemory: 1000000,
    });

    parentPort.on("message", (message) => {
      if (message.includes("stop")) {
        const stopValue = message.substring(5, message.length);

        console.log("stopValue: ", stopValue);
        if (stopValue == value) {
          nonceFinder.stop();
        }
      }
    });

    return nonceFinder
      .find(value)
      .then(async (nonce) => {
        console.log(nonce);
        await workerRedisClient.set(`input:status:${value}`, "Finished");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
};
