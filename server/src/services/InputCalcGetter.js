const InputCalcGetter = (redisClient) => async (inputValue) => {
  const currentNonce = await redisClient.get(`input:current:${inputValue}`);
  const result = await redisClient.get(`input:result:${inputValue}`);

  return {
    value: inputValue,
    lastProcessedNonce: currentNonce ? currentNonce : "0",
    resultNonce: result ? result : "0",
    status: await redisClient.get(`input:status:${inputValue}`),
  };
};

module.exports = InputCalcGetter;
