import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, setTodos } from './store/todoSlice';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
    const [text, setText] = useState('');
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const backendPort = process.env.REACT_APP_PORT_BACKEND || 8000;
    const url = `http://localhost:${backendPort}`;

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchTodos = async () => {
            try {
                const response = await axios.get(`${url}/api/tasks`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                dispatch(setTodos(response.data));
            } catch (err) {
                console.error('Error fetching tasks:', err);
            }
        };

        fetchTodos();
    }, [navigate, dispatch, url]);

    const handleAddTodo = async () => {
        const token = sessionStorage.getItem('token');
        if (!text.trim() || text.length > 50 || !token) return;

        try {
            const response = await axios.post(`${url}/api/tasks`, { text }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(addTodo({
                id: response.data.id,
                text: response.data.text,
                completed: false,
            }));
            setText('');
        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    const handleRemoveTodo = async (id) => {
        const token = sessionStorage.getItem('token');
        if (!token) return;

        try {
            await axios.delete(`${url}/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(removeTodo(id));
        } catch (err) {
            console.error('Error removing task:', err);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Todo List</h2>
                    <button
                        onClick={handleLogout}
                        className="border py-2 px-4 rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter a task (max 50 characters)"
                        maxLength="50"
                    />
                    <button
                        onClick={handleAddTodo}
                        className={`w-full text-white py-2 px-4 rounded mt-2 ${text.trim() ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={!text.trim()}
                    >
                        Add Task
                    </button>
                </div>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id} className="flex justify-between items-center mb-2">
                            <span>{todo.text}</span>
                            <button
                                onClick={() => handleRemoveTodo(todo.id)}
                                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                            >
                                Done
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todo;
