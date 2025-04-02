import { apiClient } from "./ApiClient";

const header ={headers: {Authorization: 'Basic aW4yOG1pbnV0ZXM6ZHVtbXk='} };

//GET ALL
export const retrieveAllTodosForUsernameApi = (username) => apiClient.get(`/users/${username}/todos`,header);
// DELETE
export const deleteTodoApi = (username,idTodo) => apiClient.delete(`/users/${username}/todos/${idTodo}`);
// GET - @GetMapping("/users/{username}/todos/{id}")
export const getTodoApi = (username, idTodo) => apiClient.get(`/users/${username}/todos/${idTodo}`);
// UPDATE
export const updateTodoApi = (username, idTodo, updatedTodo) => apiClient.put(`/users/${username}/todos/${idTodo}`, updatedTodo);
// CREATE
export const createTodoApi = (username, newTodo) => apiClient.post(`/users/${username}/todos`, newTodo);