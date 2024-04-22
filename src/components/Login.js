import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';  // Assuming the CSS is applicable globally

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Assuming you have a function to handle API calls
        // Simulate successful login
        console.log("Logged in");
        navigate('/home');  // Navigate to HomePage on successful login
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="navbar">
                <h2>Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="search-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="search-input"
                />
                <button type="submit" className="nav-button">Login</button>
            </form>
        </div>
    );
}

export default Login;

