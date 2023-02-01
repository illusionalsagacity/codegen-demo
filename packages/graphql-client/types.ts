import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Void: any;
};

export type CreateTodoInput = {
  notes?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type DeleteTodoInput = {
  id: Scalars['ID'];
};

export type ModifyTodoInput = {
  id: Scalars['ID'];
  notes?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  deleteTodo?: Maybe<Scalars['Void']>;
  modifyTodo: Todo;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationDeleteTodoArgs = {
  input: DeleteTodoInput;
};


export type MutationModifyTodoArgs = {
  input: ModifyTodoInput;
};

export type Query = {
  __typename?: 'Query';
  allTodos: Array<Todo>;
  todoById?: Maybe<Todo>;
};


export type QueryTodoByIdArgs = {
  id: Scalars['ID'];
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type AllTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTodosQuery = { __typename?: 'Query', allTodos: Array<{ __typename?: 'Todo', id: string, title: string, notes?: string | null }> };

export type DeleteTodoMutationVariables = Exact<{
  input: DeleteTodoInput;
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo?: any | null };


export const AllTodosDocument = gql`
    query AllTodos {
  allTodos {
    id
    title
    notes
  }
}
    `;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($input: DeleteTodoInput!) {
  deleteTodo(input: $input)
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    AllTodos(variables?: AllTodosQueryVariables, options?: C): Promise<AllTodosQuery> {
      return requester<AllTodosQuery, AllTodosQueryVariables>(AllTodosDocument, variables, options) as Promise<AllTodosQuery>;
    },
    DeleteTodo(variables: DeleteTodoMutationVariables, options?: C): Promise<DeleteTodoMutation> {
      return requester<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, variables, options) as Promise<DeleteTodoMutation>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;