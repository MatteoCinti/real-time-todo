/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Board = {
  __typename?: 'Board';
  id: Scalars['Int']['output'];
  owner: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  createTodo: Todo;
  createUser: User;
};

export type MutationCreateBoardArgs = {
  title: Scalars['String']['input'];
};

export type MutationCreateTodoArgs = {
  board: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type MutationCreateUserArgs = {
  firstName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getBoard: Board;
  getTodosByBoard?: Maybe<Array<Maybe<Todo>>>;
  getUser: User;
  getUserBoards?: Maybe<Array<Maybe<Board>>>;
  userLogin?: Maybe<User>;
};

export type QueryGetBoardArgs = {
  id: Scalars['Int']['input'];
  owner: Scalars['Int']['input'];
};

export type QueryGetTodosByBoardArgs = {
  board: Scalars['Int']['input'];
};

export type QueryUserLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  todoCreated: Todo;
};

export type SubscriptionTodoCreatedArgs = {
  board?: InputMaybe<Scalars['String']['input']>;
};

export type Todo = {
  __typename?: 'Todo';
  board: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDone: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  password?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type CreateBoardMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;

export type CreateBoardMutation = {
  __typename?: 'Mutation';
  createBoard: { __typename?: 'Board'; title: string };
};

export type GetUserDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserDataQuery = {
  __typename?: 'Query';
  getUser: {
    __typename?: 'User';
    id: number;
    username: string;
    firstName: string;
  };
  getUserBoards?: Array<{
    __typename?: 'Board';
    id: number;
    title: string;
  } | null> | null;
};

export type ListenTodosSubscriptionVariables = Exact<{
  board: Scalars['String']['input'];
}>;

export type ListenTodosSubscription = {
  __typename?: 'Subscription';
  todoCreated: {
    __typename?: 'Todo';
    title: string;
    description?: string | null;
    board: number;
  };
};

export type UserLoginQueryVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type UserLoginQuery = {
  __typename?: 'Query';
  userLogin?: {
    __typename?: 'User';
    id: number;
    username: string;
    firstName: string;
    token?: string | null;
  } | null;
};

export const CreateBoardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateBoard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'title' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createBoard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'title' }
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
export const GetUserDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserData' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getUserBoards' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetUserDataQuery, GetUserDataQueryVariables>;
export const ListenTodosDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'ListenTodos' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'board' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'todoCreated' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'board' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'board' }
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'board' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  ListenTodosSubscription,
  ListenTodosSubscriptionVariables
>;
export const UserLoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserLogin' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'username' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userLogin' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'username' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'username' }
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'password' }
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UserLoginQuery, UserLoginQueryVariables>;
