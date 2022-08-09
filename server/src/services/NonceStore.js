const NonceStore = (redisClient) => {
  const setCurrentNonce = async (input, nonce) => {
    return await redisClient.set(`input:current:${input}`, nonce);
  };

  const getCurrentNonce = async (input) => {
    return await redisClient.get(`input:current:${input}`);
  };

  const setResult = async (input, nonce) => {
    return await redisClient.set(`input:result:${input}`, nonce);
  };

  const getResult = async (input) => {
    return await redisClient.get(`input:result:${input}`);
  };

  return {
    setCurrentNonce,
    getCurrentNonce,
    setResult,
    getResult,
  };
};

module.exports = NonceStore;
