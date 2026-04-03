import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from "graphql";

const users = [
  {
    id: "1",
    name: 'User 1',
    email: 'user1@test.com',
    age: 18
  },
  {
    id: "2",
    name: 'User 2',
    email: 'user2@test.com',
    age: 20
  },
  {
    id: "3",
    name: 'User 3',
    email: 'user3@test.com',
    age: 22
  }
]

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
