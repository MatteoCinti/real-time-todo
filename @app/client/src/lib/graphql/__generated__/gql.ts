/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CreateBoard($title: String!) {\n  createBoard(title: $title) {\n    id\n    title\n  }\n}": types.CreateBoardDocument,
    "mutation CreateTodo($title: String!, $board: Int!, $description: String!, $order: Int, $parentId: Int) {\n  createTodo(\n    title: $title\n    board: $board\n    description: $description\n    order: $order\n    parentId: $parentId\n  ) {\n    id\n    title\n    description\n    isDone\n    order\n    parentId\n  }\n}": types.CreateTodoDocument,
    "mutation DeleteBoard($id: Int!) {\n  deleteBoard(id: $id) {\n    id\n    deleted\n  }\n}": types.DeleteBoardDocument,
    "mutation DeleteTodo($id: Int!, $board: Int!) {\n  deleteTodo(id: $id, board: $board) {\n    id\n    deleted\n  }\n}": types.DeleteTodoDocument,
    "query GetBoardData($board: Int!) {\n  getBoard(id: $board) {\n    id\n    title\n  }\n}": types.GetBoardDataDocument,
    "query GetTodos($board: Int!) {\n  getTodosByBoard(board: $board) {\n    id\n    title\n    description\n    isDone\n    board\n    order\n    parentId\n  }\n}": types.GetTodosDocument,
    "query GetUserData {\n  getUser {\n    id\n    username\n    firstName\n  }\n  getUserBoards {\n    id\n    title\n  }\n}": types.GetUserDataDocument,
    "subscription ListenTodoCreated($board: Int!) {\n  todoCreated(board: $board) {\n    id\n    title\n    description\n    isDone\n    order\n    parentId\n  }\n}": types.ListenTodoCreatedDocument,
    "subscription ListenTodoDeleted($board: Int!) {\n  todoDeleted(board: $board) {\n    id\n    deleted\n  }\n}": types.ListenTodoDeletedDocument,
    "subscription ListenTodoUpdated($board: Int!) {\n  todoUpdated(board: $board) {\n    id\n    title\n    description\n    isDone\n    order\n    parentId\n  }\n}": types.ListenTodoUpdatedDocument,
    "mutation UpdateTodo($id: Int!, $title: String, $description: String, $isDone: Boolean, $order: Int, $parentId: Int) {\n  updateTodo(\n    id: $id\n    title: $title\n    description: $description\n    isDone: $isDone\n    order: $order\n    parentId: $parentId\n  ) {\n    id\n    title\n    description\n    isDone\n    order\n    parentId\n  }\n}": types.UpdateTodoDocument,
    "query UserLogin($username: String!, $password: String!) {\n  userLogin(username: $username, password: $password) {\n    id\n    username\n    firstName\n    token\n  }\n}": types.UserLoginDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateBoard($title: String!) {\n  createBoard(title: $title) {\n    id\n    title\n  }\n}"): (typeof documents)["mutation CreateBoard($title: String!) {\n  createBoard(title: $title) {\n    id\n    title\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateTodo($title: String!, $board: Int!, $description: String!, $order: Int, $parentId: Int) {\n  createTodo(\n    title: $title\n    board: $board\n    description: $description\n    order: $order\n    parentId: $parentId\n  ) {\n    id\n    title\n    description\n    isDone\n    order\n    parentId\n  }\n}"): (typeof documents)["mutation CreateTodo($title: String!, $board: Int!, $description: String!, $order: Int, $parentId: Int) {\n  createTodo(\n    title: $title\n    board: $board\n    description: $description\n    order: $order\n    parentId: $parentId\n  ) {\n    id\n    title\n    description\n    isDone\n    order\n    parentId\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteBoard($id: Int!) {\n  deleteBoard(id: $id) {\n    id\n    deleted\n  }\n}"): (typeof documents)["mutation DeleteBoard($id: Int!) {\n  deleteBoard(id: $id) {\n    id\n    deleted\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteTodo($id: Int!, $board: Int!) {\n  deleteTodo(id: $id, board: $board) {\n    id\n    deleted\n  }\n}"): (typeof documents)["mutation DeleteTodo($id: Int!, $board: Int!) {\n  deleteTodo(id: $id, board: $board) {\n    id\n    deleted\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetBoardData($board: Int!) {\n  getBoard(id: $board) {\n    id\n    title\n  }\n}"): (typeof documents)["query GetBoardData($board: Int!) {\n  getBoard(id: $board) {\n    id\n    title\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetTodos($board: Int!) {\n  getTodosByBoard(board: $board) {\n    id\n    title\n    description\n    isDone\n    board\n    order\n    parentId\n  }\n}"): (typeof documents)["query GetTodos($board: Int!) {\n  getTodosByBoard(board: $board) {\n    id\n    title\n    description\n    isDone\n    board\n    order\n    parentId\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetUserData {\n  getUser {\n    id\n    username\n    firstName\n  }\n  getUserBoards {\n    id\n    title\n  }\n}"): (typeof documents)["query GetUserData {\n  getUser {\n    id\n    username\n    firstName\n  }\n  getUserBoards {\n    id\n    title\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "subscription ListenTodoCreated($board: Int!) {\n  todoCreated(board: $board) {\n    id\n    title\n    description\n    isDone\n    order\n    parentId\n  }\n}"): (typeof documents)["subscription ListenTodoCreated($board: Int!) {\n  todoCreated(board: $board) {\n    id\n    title\n    description\n    isDone\n    order\n    parentId\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "subscription ListenTodoDeleted($board: Int!) {\n  todoDeleted(board: $board) {\n    id\n    deleted\n  }\n}"): (typeof documents)["subscription ListenTodoDeleted($board: Int!) {\n  todoDeleted(board: $board) {\n    id\n    deleted\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "subscription ListenTodoUpdated($board: Int!) {\n  todoUpdated(board: $board) {\n    id\n    title\n    description\n    isDone\n    order\n    parentId\n  }\n}"): (typeof documents)["subscription ListenTodoUpdated($board: Int!) {\n  todoUpdated(board: $board) {\n    id\n    title\n    description\n    isDone\n    order\n    parentId\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateTodo($id: Int!, $title: String, $description: String, $isDone: Boolean, $order: Int, $parentId: Int) {\n  updateTodo(\n    id: $id\n    title: $title\n    description: $description\n    isDone: $isDone\n    order: $order\n    parentId: $parentId\n  ) {\n    id\n    title\n    description\n    isDone\n    order\n    parentId\n  }\n}"): (typeof documents)["mutation UpdateTodo($id: Int!, $title: String, $description: String, $isDone: Boolean, $order: Int, $parentId: Int) {\n  updateTodo(\n    id: $id\n    title: $title\n    description: $description\n    isDone: $isDone\n    order: $order\n    parentId: $parentId\n  ) {\n    id\n    title\n    description\n    isDone\n    order\n    parentId\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query UserLogin($username: String!, $password: String!) {\n  userLogin(username: $username, password: $password) {\n    id\n    username\n    firstName\n    token\n  }\n}"): (typeof documents)["query UserLogin($username: String!, $password: String!) {\n  userLogin(username: $username, password: $password) {\n    id\n    username\n    firstName\n    token\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;