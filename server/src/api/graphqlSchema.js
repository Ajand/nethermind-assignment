const { gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  enum WorkerStatus {
    Processing
    Empty
  }

  type Worker {
    id: String!
    status: WorkerStatus!
    jobId: String
    input: InputCalculation
  }

  enum InputCalculationStatus {
    Queued
    Processing
    Finished
    Stopped
  }

  type InputCalculation {
    value: String!
    lastProcessedNonce: String
    resultNonce: String
    status: InputCalculationStatus
    jobId: String
  }

  type Query {
    inputCalculations(values: [String!]!): [InputCalculation!]!
    inputCalculation(value: String): InputCalculation
    workers: [Worker!]!
  }

  type Mutation {
    addToQueue(value: String!): String!
    cancelQueuedItem(value: String!): String!
    stopProcessing(value: String!): String!
    emptyWorker(id: String!): String!
  }
`;

module.exports = typeDefs;
