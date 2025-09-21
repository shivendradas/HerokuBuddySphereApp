import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Use a blue-ish theme, can adjust as needed
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import RegisterLink from './RegisterLink';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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
        <h2 style={{ textAlign: 'center', marginBottom: '28px', letterSpacing: '2px', fontWeight: 500 }}>
          USER LOGIN
        </h2>
        <form>
          <div className="p-inputgroup" style={{ marginBottom: '18px' }}>
            <span className="p-inputgroup-addon">
              <i className="pi pi-user" style={{ color: '#60A5FA' }}></i>
            </span>
            <InputText
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ background: 'linear-gradient(90deg, #60a5fa 0%, #a5b4fc 100%)', borderRadius: '6px', color: '#222' }}
            />
          </div>
          <div className="p-inputgroup" style={{ marginBottom: '18px' }}>
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock" style={{ color: '#60A5FA' }}></i>
            </span>
            <Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              inputStyle={{ width: '260px', background: 'linear-gradient(90deg, #60a5fa 0%, #a5b4fc 100%)', borderRadius: '6px', color: '#222' }}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            fontSize: '0.95rem',
            color: '#e5e5e5',
          }}>
            <div className="p-field-checkbox" style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox id="remember" checked={rememberMe} onChange={e => setRememberMe(e.checked)} />
              <label htmlFor="remember" style={{ marginLeft: '8px' }}>Remember me</label>
            </div>
            <a href="#" style={{ color: '#e5e5e5', fontWeight: '400', textDecoration: 'underline' }}>
              Forgot password?
            </a>
          </div>
          <Button
            label="LOGIN"
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)',
              border: 'none',
              fontWeight: '600',
              fontSize: '1.08rem',
              letterSpacing: '1px',
              boxShadow: '0 2px 6px 0 rgba(0,0,0,0.15)',
            }}
          />
        </form>
        <RegisterLink />
      </div>
    </div>
  );
};

export default Login;
