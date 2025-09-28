// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import axiosInstance from './utils/axiosInstance';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // LOGIN
        const res = await axiosInstance.post('/api/auth/login', { email, password });
        const { token, user } = res.data;

        if (!token || !user) throw new Error('Invalid login response');

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Initialize cart if not exists
        const cartKey = `cart-${user.email}`;
        if (!localStorage.getItem(cartKey)) localStorage.setItem(cartKey, JSON.stringify([]));

        alert(`Login successful! Welcome ${user.firstName || user.username}`);
        navigate('/'); // Redirect to homepage or dashboard
      } else {
        // REGISTER
        await axiosInstance.post('/api/auth/register', { firstName, lastName, email, password });
        alert('Account created successfully! You can now login.');
        setIsLogin(true); // Switch to login form after registration
      }

      // Clear form
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
    } catch (err) {
      console.error('Auth error:', err.response || err.message);
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>{isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}</h2>

          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isLogin && <p className="forgot">Forgot your Password?</p>}

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? (isLogin ? 'Signing in...' : 'Creating...') : isLogin ? 'SIGN IN' : 'CREATE'}
          </button>

          <p className="toggle-text">
            {isLogin ? (
              <>
                Don't have an account? <span onClick={toggleForm}>Create one</span>
              </>
            ) : (
              <>
                Already have an account? <span onClick={toggleForm}>Sign in</span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}




