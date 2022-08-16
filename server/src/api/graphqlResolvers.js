const InputCalcGetter = require("../services/InputCalcGetter");

const resolvers = ({
  inputCalculatorQueue,
  redisClient,
  stopJob,
  workers,
}) => ({
  Query: {
    inputCalculations: async (_, { values }) => {
      return Promise.all(
        values.map((value) => InputCalcGetter(redisClient)(value))
      );
    },

    workers: async (_) => {
      return workers.map(async (worker, i) => {
        const jobId = await redisClient.get(`worker:job:${i}`);
        const jobInput = await redisClient.get(`job:input:${jobId}`);
        if (!jobId)
          return {
            id: i,
            status: "Empty",
            jobId: null,
          };
        const job = await inputCalculatorQueue.getJob(jobId);

        const jobState = await job.getState();

        return {
          id: i,
          status: jobState === "active" ? "Processing" : "Empty",
          jobId: jobState === "active" ? jobId : null,
          input: jobInput ? InputCalcGetter(redisClient)(jobInput) : null,
        };
      });
    },
  },
  Mutation: {
    addToQueue: async (_, { value }) => {
      await redisClient.set(`input:status:${value}`, "Queued");
      const job = await inputCalculatorQueue.add({ value });
      await redisClient.set(`input:jobId:${value}`, job.id);
      return "Added To Queue";
    },
    stopProcessing: async (_, { value }) => {
      stopJob(value);
      return "Process stopped";
    },
    cancelQueuedItem: async (_, { value }) => {
      const jobId = await redisClient.get(`input:jobId:${value}`);
      const job = await inputCalculatorQueue.getJob(jobId);
      await job.remove();
      await redisClient.set(`input:status:${value}`, "Stopped");
      return "Job canceled";
    },
    emptyWorker: async (_, { id }) => {
      const jobId = await redisClient.get(`worker:job:${id}`);
      const job = await inputCalculatorQueue.getJob(jobId);
      stopJob(job.data.value);
      return "Worker Emptied";
    },
  },
});

module.exports = resolvers;
