/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Todo } from '../models/Todo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

  /**
   * Delete a Todo
   * @param todoId Todo ID
   * @returns void
   * @throws ApiError
   */
  public static deleteTodo(
    todoId: string,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/todo/{todoId}',
      path: {
        'todoId': todoId,
      },
    });
  }

  /**
   * Modify a Todo
   * @param todoId Todo ID
   * @param requestBody A request body with a Todo in it
   * @returns any success
   * @throws ApiError
   */
  public static putTodo(
    todoId: string,
    requestBody?: Todo,
  ): CancelablePromise<{
    data: Todo;
  }> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/todo/{todoId}',
      path: {
        'todoId': todoId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get a Todo
   * @param todoId Todo ID
   * @returns any success
   * @throws ApiError
   */
  public static getTodo(
    todoId: string,
  ): CancelablePromise<{
    data: Todo;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/todo/{todoId}',
      path: {
        'todoId': todoId,
      },
    });
  }

  /**
   * Create a Todo
   * @param requestBody A request body with a Todo in it
   * @returns any success
   * @throws ApiError
   */
  public static postTodo(
    requestBody?: Todo,
  ): CancelablePromise<{
    data: Todo;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/todo',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get a list of Todos
   * @returns any success
   * @throws ApiError
   */
  public static getTodos(): CancelablePromise<{
    data: Array<Todo>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/todo',
    });
  }

}
