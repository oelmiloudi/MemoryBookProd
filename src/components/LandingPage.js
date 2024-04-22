import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import './LandingPage.css';

function LandingPage() {
    const [showForm, setShowForm] = useState('login');

    return (
        <div className="landing-page">
            <center><h1 className="header-center">Welcome to MemoryBook</h1></center>
            <center><h2 className="header-center slogan">Create and Preserve your Memories</h2></center>

            <div className="auth-form">
                <div className="auth-form-header">
                    <button 
                        onClick={() => setShowForm('login')} 
                        className={showForm === 'login' ? 'active' : ''}>
                        Login
                    </button>
                    <button 
                        onClick={() => setShowForm('signup')} 
                        className={showForm === 'signup' ? 'active' : ''}>
                        Signup
                    </button>
                </div>
                {showForm === 'login' && <Login />}
                {showForm === 'signup' && <Signup />}
            </div>
        </div>
    );
}

export default LandingPage;
