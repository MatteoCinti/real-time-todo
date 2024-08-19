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

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
};

export type MutationCreateTodoArgs = {
  author: Scalars['String']['input'];
  board: Scalars['String']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getTodos?: Maybe<Array<Maybe<Todo>>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  todoCreated: Todo;
};

export type SubscriptionTodoCreatedArgs = {
  boardId: Scalars['String']['input'];
};

export type Todo = {
  __typename?: 'Todo';
  author?: Maybe<Scalars['String']['output']>;
  board: Scalars['String']['output'];
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type GetTodosQueryVariables = Exact<{ [key: string]: never }>;

export type GetTodosQuery = {
  __typename?: 'Query';
  getTodos?: Array<{
    __typename?: 'Todo';
    author?: string | null;
    description: string;
    title: string;
  } | null> | null;
};

export type ListenTodosSubscriptionVariables = Exact<{
  boardId: Scalars['String']['input'];
}>;

export type ListenTodosSubscription = {
  __typename?: 'Subscription';
  todoCreated: {
    __typename?: 'Todo';
    author?: string | null;
    description: string;
    title: string;
  };
};

export const GetTodosDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTodos' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getTodos' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'author' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetTodosQuery, GetTodosQueryVariables>;
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
            name: { kind: 'Name', value: 'boardId' }
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
                name: { kind: 'Name', value: 'boardId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'boardId' }
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'author' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } }
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
