"use client"

import { useState } from "react"
import './Auth.css';

const Auth = ({ onLogin = () => {} }) => {
  const [isLogin, setIsLogin] = useState(true)
   const [showAuth, setShowAuth] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (isLogin) {
      // Login logic: call your backend
      try {
        const res = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })
        if (!res.ok) throw new Error("Invalid credentials!")
        const user = await res.json()
        if (typeof onLogin === "function") onLogin(user)
      } catch (err) {
        alert(err.message || "Login failed!")
      }
    } else {
      // Signup logic: call your backend
      try {
        const res = await fetch("http://localhost:8080/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Signup failed!")
        }
        const user = await res.json()
        if (typeof onLogin === "function") onLogin(user)
      } catch (err) {
        alert(err.message || "Signup failed!")
      }
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
     <div> {/* Only show page-container if showAuth is false */}
  {!showAuth && (
    <div className="page-container">
      {/* Title */}
      <h1 className="page-title">MovieList</h1>
      <h2 className="sec">Your Personal Movie Watchlist</h2>

      {/* Button to show/hide Auth Container */}
      <button className="open-auth-btn" onClick={() => setShowAuth(true)}>
        Join Now
      </button>
    </div>
  )}

      {/* Auth Container */}
      {showAuth && (
        <div className="auth-container">
          <div className="auth-card">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              )}
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading
                  ? isLogin
                    ? "Logging in..."
                    : "Signing up..."
                  : isLogin
                  ? "Login"
                  : "Sign Up"}
              </button>
            </form>
            <p className="auth-switch">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="link-btn"
                disabled={loading}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>

            {/* Close Button */}
            <button
              className="close-auth-btn"
              onClick={() => setShowAuth(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth