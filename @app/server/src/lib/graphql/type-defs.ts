import { gql } from 'apollo-server';

export default gql`
  type User {
    id: Int!
    username: String!
    firstName: String!
    password: String
    token: String
  }

  type Board {
    id: Int
    owner: Int!
    title: String!
  }

  type BoardDeleted {
    id: Int!
    deleted: Boolean!
  }

  type Todo {
    id: Int!
    board: Int!
    title: String!
    isDone: Boolean!
    description: String
  }

  type Query {
    getUser: User!
    getBoard(id: Int!): Board!
    userLogin(username: String!, password: String!): User
    getUserBoards: [Board]
    getTodosByBoard(board: Int!): [Todo]
  }

  type Mutation {
    createUser(username: String!, firstName: String!, password: String!): User!
    createTodo(title: String!, description: String!, board: Int!): Todo!
    deleteBoard(id: Int!): BoardDeleted!
    createBoard(title: String!): Board!
  }

  type Subscription {
    todoCreated(board: Int): Todo!
  }
`;
