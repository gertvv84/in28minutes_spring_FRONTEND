import { useEffect, useState } from "react";
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from "./api/ToDoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent() {
    const authContext = useAuth();
    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12,today.getMonth(),today.getDay());

    {/*const todos = [
                    {id: 1, description: 'Learn AWS', done: false, targetDate:targetDate},
                    {id: 2, description: 'Learn Fullstack DEV', done: false, targetDate:targetDate},
                    {id: 3, description: 'Learn DevOps', done: false, targetDate:targetDate},
                    {id: 4, description: 'Learn Angular', done: false, targetDate:targetDate}
                ];*/}

    const [todos,setTodos] = useState([]);
    const [msg, setMessage] = useState(null);
    const navigate = useNavigate();
    
    useEffect (() => refreshTodos(), []);

    function refreshTodos() {
        retrieveAllTodosForUsernameApi(authContext.username)
        .then(
            (response) => setTodos(response.data)
        )
        .catch((error) => console.log(error));
    }

    function clickDeleteTodo(id) {
        deleteTodoApi(authContext.username,id)
        .then(
            (response) => {
                setMessage("Deleted todo with id "+id);
                //refreshTodos();
            }
        )
        .catch((error) => console.log(error))
        .finally(() => refreshTodos());
    }

    function clickUpdateTodo(id) {
        navigate(`/todos/${id}`)
    }

    function addNewTodo(){
        navigate(`/todos/-1`);
    }

    return(
        <div className="container">
            <h1>Things you want to do </h1>
            { msg && <div className="alert alert-warning">{msg}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Targetdate</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate}</td>
                                        <td><button className="btn btn-warning" onClick={(id) => clickDeleteTodo(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={(id) => clickUpdateTodo(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            )

                        }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add Todo</div>
        </div>
    )
}