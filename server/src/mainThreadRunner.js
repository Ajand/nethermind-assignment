const { createClient } = require("redis");
const Bull = require("bull");
const { Worker } = require("node:worker_threads");
const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const path = require("path");

const typeDefs = require("./modules/graphqlSchema");
const graphqlResolvers = require("./modules/graphqlResolvers");

module.exports = async () => {
  const client = createClient();
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  const inputCalculatorQueue = new Bull("input-calculator-queue");

  const workers = Array(4)
    .fill(0)
    .map((v, i) => {
      const worker = new Worker(path.resolve(__dirname, "..", "index.js"), {
        workerData: i,
      });

      worker.on("message", (m) => console.log(m));
      worker.on("error", (e) => console.log(e));
      worker.on("exit", (code) => {
        if (code !== 0)
          console.log(new Error(`Worker stopped with exit code ${code}`));
      });
      return worker;
    });

  const stopJob = (value) => {
    workers.forEach((worker) => {
      worker.postMessage(`stop:${value}`);
    });
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers: graphqlResolvers({
      inputCalculatorQueue,
      redisClient: client,
      stopJob,
      workers,
    }),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};
