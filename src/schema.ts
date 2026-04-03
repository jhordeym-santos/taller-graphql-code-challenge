import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from "graphql";

import { users } from "./data.js";

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    age: {
      type: GraphQLInt
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    getUser: {
      type: UserType,
      description: 'Returns an User',
      args: {
        id: {
          type: GraphQLID
        },
      },
      resolve: (_parent, args) => {
        return users.find(user => user.id === args.id)
      }
    },
    listUsers: {
      type: new GraphQLList(UserType),
      description: "Returns a list of Users with a limit argument",
      args: {
        limit: {
          type: GraphQLInt
        }
      },
      resolve: (_parent, args) => {
        return users.slice(0, args.limit)
      }
    }
  })
})

export const schema = new GraphQLSchema({
  query: RootQuery
})
