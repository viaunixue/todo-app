import axios from 'axios'

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);

//http://localhost:8080/users/in28minutes/todos
export const retrieveAllTodosForUsernameApi
    = (username) => apiClient.get(`/users/${username}/todos`)

//http://localhost:8080/users/in28minutes/todos
export const deleteTodoApi
    = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`)