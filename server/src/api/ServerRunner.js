const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const typeDefs = require("./graphqlSchema");
const graphqlResolvers = require("./graphqlResolvers");

module.exports = ({ inputCalculatorQueue, redisClient, stopJob, workers }) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers: graphqlResolvers({
      inputCalculatorQueue,
      redisClient,
      stopJob,
      workers,
    }),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  // TODO add port customization
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};
