import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function Signup({onSuccess}) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simulate successful signup
            console.log("Signup successful");
            onSuccess();  // Call the onSuccess callback
        } catch (error) {
            console.error("Signup failed:", error.message);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="navbar">
                <h2>Sign Up</h2>
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="search-input" />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="search-input" />
                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="search-input" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="search-input" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="search-input" />
                <button type="submit" className="nav-button">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
