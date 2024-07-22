import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState(process.env.USER_EMAIL || '');
    const [password, setPassword] = useState(process.env.USER_PASSWORD || '');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const backendPort = process.env.PORT_BACKEND || 8000;
    const url = `http://localhost:${backendPort}`;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        console.log('url:', url);

        try {
            const response = await axios.post(`${url}/api/auth/login`, { email, password });
            if (response && response.data) {
                sessionStorage.setItem('token', response.data.token);
                setLoading(false);
                navigate('/todo');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            setLoading(false);
            console.error('Error during login:', err);
            setError(err.response?.data?.msg || 'An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
