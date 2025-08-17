import { GraphQLDateTime, GraphQLJSON } from 'graphql-scalars';
import adminResolvers from './admin.js';
import studentResolvers from './student.js';
import sharedResolvers from './shared.js';

export const resolvers = {
  Date: GraphQLDateTime,
  JSON: GraphQLJSON,
  Query: {
    ...sharedResolvers.Query,
    ...adminResolvers.Query
  },
  Mutation: {
    ...adminResolvers.Mutation,
    ...studentResolvers.Mutation
  }
};
