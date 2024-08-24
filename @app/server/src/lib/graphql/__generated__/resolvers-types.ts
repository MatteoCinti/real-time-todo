import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Board = {
  __typename?: 'Board';
  id: Scalars['Int']['output'];
  owner: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type BoardDeleted = {
  __typename?: 'BoardDeleted';
  deleted: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  createTodo: Todo;
  createUser: User;
  deleteBoard: BoardDeleted;
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


export type MutationDeleteBoardArgs = {
  id: Scalars['Int']['input'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Board: ResolverTypeWrapper<Board>;
  BoardDeleted: ResolverTypeWrapper<BoardDeleted>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Todo: ResolverTypeWrapper<Todo>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Board: Board;
  BoardDeleted: BoardDeleted;
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  Todo: Todo;
  User: User;
};

export type BoardResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardDeletedResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['BoardDeleted'] = ResolversParentTypes['BoardDeleted']> = {
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationCreateBoardArgs, 'title'>>;
  createTodo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationCreateTodoArgs, 'board' | 'description' | 'title'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'firstName' | 'password' | 'username'>>;
  deleteBoard?: Resolver<ResolversTypes['BoardDeleted'], ParentType, ContextType, RequireFields<MutationDeleteBoardArgs, 'id'>>;
};

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<QueryGetBoardArgs, 'id'>>;
  getTodosByBoard?: Resolver<Maybe<Array<Maybe<ResolversTypes['Todo']>>>, ParentType, ContextType, RequireFields<QueryGetTodosByBoardArgs, 'board'>>;
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  getUserBoards?: Resolver<Maybe<Array<Maybe<ResolversTypes['Board']>>>, ParentType, ContextType>;
  userLogin?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserLoginArgs, 'password' | 'username'>>;
};

export type SubscriptionResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  todoCreated?: SubscriptionResolver<ResolversTypes['Todo'], "todoCreated", ParentType, ContextType, Partial<SubscriptionTodoCreatedArgs>>;
};

export type TodoResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  board?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isDone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloContext> = {
  Board?: BoardResolvers<ContextType>;
  BoardDeleted?: BoardDeletedResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

