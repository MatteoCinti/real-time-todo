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
    order: Int!
    parentId: Int
  }

  input TodoInput {
    id: Int
    board: Int
    order: Int
    title: String
    isDone: Boolean
    parentId: Int
    description: String
  }

  type TodoDeleted {
    id: Int!
    deleted: Boolean!
  }

  type Query {
    getUser: User!
    getBoard(id: Int!): Board!
    userLogin(username: String!, password: String!): User
    getTodosByBoard(board: Int!): [Todo]
    getTodo(id: Int!): Todo
    getUserBoards: [Board]
  }

  type Mutation {
    createUser(username: String!, firstName: String!, password: String!): User!
    createTodo(todo: TodoInput!): Todo!
    deleteBoard(id: Int!): BoardDeleted!
    createBoard(title: String!): Board!
    deleteTodo(id: Int!, board: Int!): TodoDeleted!
    updateTodo(todo: TodoInput!, board: Int!): Todo!
    updateTodos(todos: [TodoInput!]!, board: Int!): [Todo]
  }

  type Subscription {
    todoCreated(board: Int!): Todo!
    todosUpdated(board: Int!): [Todo]!
    todoDeleted(board: Int!): TodoDeleted!
  }
`;
