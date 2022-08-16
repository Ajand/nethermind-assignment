const Bull = require("bull");
const { parentPort, workerData } = require("node:worker_threads");
const NonceFinder = require("../services/NonceFinder");

module.exports = (redisClient) => {
  const inputCalculatorQueue = new Bull("input-calculator-queue");

  const storeProcessingData = async ({ workerData, job, value }) => {
    await redisClient.set(`worker:job:${workerData}`, job.id);
    await redisClient.set(`job:input:${job.id}`, value);
    await redisClient.set(`input:status:${value}`, "Processing");
  };

  const process = () => {
    return inputCalculatorQueue.process(async (job, done) => {
      const { value } = job.data;
      parentPort.postMessage(`"Worker is processing: ${value}`);

      await storeProcessingData({ workerData, job, value });

      const nonceFinder = NonceFinder(redisClient, {
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
          await redisClient.set(`input:status:${value}`, "Finished");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });
  };

  return {
    inputCalculatorQueue,
    process,
  };
};
