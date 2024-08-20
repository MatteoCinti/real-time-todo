import { gql } from 'apollo-server';

export default gql`
  type Todo {
    id: ID!
    board: String!
    title: String!
    author: String
    description: String!
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    createTodo(
      title: String!
      author: String!
      description: String!
      board: String!
    ): Todo!
  }

  type Subscription {
    todoCreated(board: String): Todo!
  }
`;
