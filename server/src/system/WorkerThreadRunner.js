const { createClient } = require("redis");
const Que = require("./Que");

module.exports = async () => {
  const workerRedisClient = createClient();
  await workerRedisClient.connect();
  Que(workerRedisClient).process();
};
