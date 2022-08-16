const { ethers } = require("ethers");
const NonceStore = require("./NonceStore");

const NonceFinder = (
  redisClient,
  { storeLeap = 4000, increament = 1, offset = 0, freeMemory = 1000000 }
) => {
  const nonceStore = NonceStore(redisClient);

  let stopFinder = false;

  const find = async (input) => {
    if (await nonceStore.getResult(input)) {
      const targetNonce = await nonceStore.getResult(input);
      return targetNonce;
    }

    const currentNonce = await nonceStore.getCurrentNonce(input);
    const startWith = currentNonce ? Number(currentNonce) : 0;

    let nonce = ethers.BigNumber.from(startWith);
    const usableInput = "0x" + input;
    const inputNumber = ethers.BigNumber.from(usableInput);

    let hash = ethers.utils.keccak256(
      ethers.BigNumber.from(inputNumber.add(nonce))
    );

    let i = 0;

    while (ethers.BigNumber.from(hash).gte(inputNumber) && !stopFinder) {
      nonce = nonce.add(increament + offset);
      hash = ethers.utils.keccak256(
        ethers.BigNumber.from(inputNumber.add(nonce))
      );
      i++;
      if (i % storeLeap === 0) {
        if (await nonceStore.getResult(input)) {
          const targetNonce = await nonceStore.getResult(input);
          return targetNonce;
        }
        const currentNonce = await nonceStore.getCurrentNonce(input);

        if (!currentNonce || ethers.BigNumber.from(currentNonce).lt(nonce)) {
          await nonceStore.setCurrentNonce(input, nonce.toString());
        }
      }
    }

    if (!stopFinder) {
      if (ethers.BigNumber.from(hash).lt(inputNumber)) {
        await nonceStore.setResult(input, nonce.toString());
        return nonce;
      } else {
        await calculateNonce(nonce.add(increament + offset));
      }
    }

    await redisClient.set(`input:status:${input}`, "Stopped");

    throw new Error("Stopped with the nonce: ", nonce);
  };

  const stop = () => {
    stopFinder = true;
  };

  return {
    find,
    stop,
  };
};

module.exports = NonceFinder;
