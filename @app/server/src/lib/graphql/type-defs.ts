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
    id: Int!
    owner: Int!
    title: String!
  }

  type Todo {
    id: Int!
    board: Int!
    title: String!
    isDone: Boolean!
    description: String
  }

  type Query {
    userLogin(username: String!, password: String!): User
    getUser: User!
    getUserBoards(owner: Int!): [Board]
    getBoard(owner: Int!, id: Int!): Board!
    getTodosByBoard(board: Int!): [Todo]
  }

  type Mutation {
    createTodo(title: String!, description: String!, board: Int!): Todo!
    createUser(username: String!, firstName: String!, password: String!): User!
    createBoard(owner: Int!, title: String!): Board!
  }

  type Subscription {
    todoCreated(board: String): Todo!
  }
`;
