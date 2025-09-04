import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (e) => {
        e.preventDefault();
        if (username.trim() && password.trim()) {
            onLogin();
        } else {
            alert('Error: Please enter username and password');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Movie App</h1>
                <p className="text-center text-gray-500 mb-8">Sign in to continue</p>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-400 mt-6 text-sm">Demo: Enter any username and password</p>
            </div>
        </div>
    );
};

export default LoginScreen;
