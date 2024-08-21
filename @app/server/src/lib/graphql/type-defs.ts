import { gql } from 'apollo-server';

export default gql`
  type Todo {
    id: Int!
    board: Int!
    title: String!
    isDone: Boolean!
    description: String
  }

  type User {
    id: Int!
    username: String!
    firstName: String!
  }

  type Query {
    getTodos: [Todo]
    getUser(username: String!, password: String!): User
  }

  type Mutation {
    createTodo(title: String!, description: String!, board: Int!): Todo!
    createUser(username: String!, firstName: String!, password: String!): User!
  }

  type Subscription {
    todoCreated(board: String): Todo!
  }
`;
