// Use dotenv for all environments except production. On prod, env vars are set directly.
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// Database config.
require('../../config/db');

// Apollo
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql-types');
const resolvers = require('./graphql-resolvers');
const context = require('./graphql-context');
const server = new ApolloServer({ typeDefs, resolvers, context });

// Start the server!
if (process.env.NODE_ENV !== 'test')
  server.listen({ port: 3000 }).then(({ url }) => console.log(`🚀 Here we GO!: ${url}`));