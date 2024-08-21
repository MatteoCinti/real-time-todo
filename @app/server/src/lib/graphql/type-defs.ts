import { gql } from 'apollo-server';

export default gql`
  type Todo {
    id: Int!
    board: Int!
    title: String!
    isDone: Boolean!
    description: String
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    createTodo(title: String!, description: String!, board: Int!): Todo!
  }

  type Subscription {
    todoCreated(board: String): Todo!
  }
`;
