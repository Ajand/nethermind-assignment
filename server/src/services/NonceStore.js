const NonceStore = (redisClient) => {
  const setCurrentNonce = async (input, nonce) => {
    return await redisClient.set(`input:current:${input}`, nonce);
  };

  const getCurrentNonce = async (input) => {
    return await redisClient.get(`input:current:${input}`);
  };

  const getResult = async (input) => {
    return await redisClient.get(`input:end:${input}`);
  };

  return {
    setCurrentNonce,
    getCurrentNonce,
    getResult,
  };
};

module.exports = NonceStore;
