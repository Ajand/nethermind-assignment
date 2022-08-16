const { isMainThread } = require("node:worker_threads");

const mainThreadRunner = require("./src/system/mainThreadRunner");
const WorkerThreadRunner = require("./src/system/WorkerThreadRunner");

const main = async () => {
  if (isMainThread) {
    await mainThreadRunner();
  } else {
    await WorkerThreadRunner();
  }
};

main();
