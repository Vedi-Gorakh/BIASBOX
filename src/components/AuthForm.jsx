import React, { useState } from 'react';
import './AuthForm.css';
import axios from 'axios';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const API_URL = "http://localhost:5000/api/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post(`${API_URL}/login`, { email, password });

        const { token, user } = res.data;

        if (!token || !user) throw new Error("Invalid login response");

        // Save token and user in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Create cart key if not exists
        const userEmail = user.email;
        const cartKey = `cart-${userEmail}`;
        if (!localStorage.getItem(cartKey)) {
          localStorage.setItem(cartKey, JSON.stringify([]));
        }

        alert(`Login successful! Welcome ${user.firstName}`);
        window.location.reload(); // Refresh to update UI (navbar etc.)
      } else {
        // REGISTER
        const res = await axios.post(`${API_URL}/register`, {
          firstName,
          lastName,
          email,
          password,
        });

        alert("Account created successfully!");
      }

      // Clear form
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
    } catch (err) {
      console.error("Auth error:", err.response || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Clear form when switching
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
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

          <button type="submit">{isLogin ? 'SIGN IN' : 'CREATE'}</button>

          <p className="toggle-text">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <span onClick={toggleForm}>Create one</span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span onClick={toggleForm}>Sign in</span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

