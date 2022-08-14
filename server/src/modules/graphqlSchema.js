const { gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  enum WorkerStatus {
    PROCESSING
    EMPTY
  }

  type Worker {
    id: String!
    status: WorkerStatus!
  }

  enum InputCalculationSatus {
    QUEUED
    PROCESSING
    FINISHED
    STOPPED
  }

  type InputCalculation {
    value: String!
    lastProcessedNonce: String
    resultNonce: String
    status: InputCalculationSatus
  }

  type Query {
    inputCalculations(ids: [String!]!): [InputCalculation!]!
    inputCalculation(id: String): InputCalculation
    workers: [Worker!]!
  }

  type Mutation {
    addToQueue(value: String!): String!
    cancelQueuedItem(valued: String!): String!
    emptyWorker(id: String!): String!
  }
`;

module.exports = typeDefs;
