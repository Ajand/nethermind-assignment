const { Worker } = require("node:worker_threads");

/// TODO add worker amount customization
module.exports = (filename) => {
  const workers = Array(4)
    .fill(0)
    .map((v, i) => {
      const worker = new Worker(filename, {
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
  return {
    workers,
    stopJob: (value) => {
      workers.forEach((worker) => {
        worker.postMessage(`stop:${value}`);
      });
    },
  };
};
