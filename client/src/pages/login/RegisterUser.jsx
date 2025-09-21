import React, { useState } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Use a blue-ish theme, can adjust as needed
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';                              // PrimeNG icons CSS

const inputWrapperStyle = {
    position: 'relative',
    width: '100%',
    marginBottom: '20px',  // Increased margin to separate fields better
};

const iconStyle = {
    position: 'absolute',
    top: '50%',
    left: '12px',
    transform: 'translateY(-50%)',
    color: '#1f1434ff',
    fontSize: '18px',
    pointerEvents: 'none'
};

const inputStyle = {
    width: '100%',
    background: 'linear-gradient(90deg, #60a5fa 0%, #a5b4fc 100%)',
    border: 'none',
    borderRadius: '6px',
    color: '#222',
    padding: '12px 12px 12px 38px',
    fontSize: '16px',
    outline: 'none',
    height: '44px',  // Set height for consistent input size aligned with icons
    boxSizing: 'border-box'
};

const labelStyle = {
    alignSelf: 'flex-start',
    color: '#eee',
    fontWeight: '500',
    marginBottom: '8px'  // Positive margin to keep label above input and not cut
};

const buttonStyle = {
    width: '100%',
    background: 'linear-gradient(90deg, #fd5c63 0%, #ff9966 100%)',
    border: 'none',
    color: '#fff',
    padding: '13px 0',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '12px'
};

function RegisterUser() {
    const [form, setForm] = useState({ email: '', userId: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(form));
    };

    return (
        <div style={{
            minHeight: '60vh',
            background: 'linear-gradient(135deg, #c2e9fb 0%, #81a4fd 50%, #2471a3 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            flexDirection: 'column',
        }}>
            <div style={{
                background: 'rgba(28, 36, 62, 0.95)',
                borderRadius: '18px',
                padding: '40px 36px 28px 36px',
                maxWidth: '380px',
                width: '100%',
                color: 'white',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}>
                <form  onSubmit={handleSubmit}>
                    <h2 style={{ color: '#fff', letterSpacing: '2px', marginBottom: '32px' }}>
                        CREATE ACCOUNT
                    </h2>

                    <label style={labelStyle}>Email address</label>
                    <div style={inputWrapperStyle}>
                        <i className="pi pi-envelope" style={iconStyle}></i>
                        <input
                            style={inputStyle}
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                    </div>

                    <label style={labelStyle}>User ID</label>
                    <div style={inputWrapperStyle}>
                        <i className="pi pi-user" style={iconStyle}></i>
                        <input
                            style={inputStyle}
                            type="text"
                            placeholder="Choose a user ID"
                            name="userId"
                            required
                            value={form.userId}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                    </div>

                    <label style={labelStyle}>Password</label>
                    <div style={inputWrapperStyle}>
                        <i className="pi pi-lock" style={iconStyle}></i>
                        <input
                            style={inputStyle}
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" style={buttonStyle}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterUser;
