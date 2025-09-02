"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import "./App.css"

import Auth from "./components/Auth/Auth"
import Dashboard from "./components/Dashboard/Dashboard"
import MovieSearch from "./components/MovieSearch/MovieSearch"
import Watchlist from "./components/watchlist/Watchlist"
import Profile from "./components/Profile/profile"
import myIcon from "./Assests/8109065.png"

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true) // loading state

  // Update user after profile changes
  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
  }

  // Delete user (logout + clear)
  const handleDeleteUser = () => {
    handleLogout()
  }

  // Check for logged-in user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
    setLoadingUser(false) // finished loading
  }, [])

  // Save logged-in user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    }
  }, [currentUser])

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  // Protect routes
  const ProtectedRoute = ({ children }) => {
    if (loadingUser) return null // or show a spinner while loading
    if (!currentUser) return <Navigate to="/auth" replace />
    return children
  }

  return (
    <Router>
      <div className="App">
        {/* Navbar visible only if logged in */}
        {currentUser && <Navbar onLogout={handleLogout} />}

        <main className="main-content">
          <Routes>
            {/* Auth page */}
            <Route
              path="/auth"
              element={<AuthWrapper onLogin={setCurrentUser} />}
            />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard user={currentUser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <MovieSearch user={currentUser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/watchlist"
              element={
                <ProtectedRoute>
                  <Watchlist user={currentUser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile
                    user={currentUser}
                    onUpdate={handleUpdateUser}
                    onDelete={handleDeleteUser}
                  />
                </ProtectedRoute>
              }
            />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

// Navbar component
const Navbar = ({ onLogout }) => {
  const navigate = useNavigate()
  const currentPath = window.location.pathname

  const NavButton = ({ to, label }) => {
    const isActive = currentPath === to
    return (
      <button className={isActive ? "active" : ""} onClick={() => navigate(to)}>
        <h4>{label}</h4>
      </button>
    )
  }

  return (
    <nav className="navbar">
      <img src={myIcon} alt="Navbar Icon" className="logo" />
      <div className="nav-brand">
        <h1>MovieList</h1>
      </div>
      <div className="nav-links">
        <NavButton to="/" label="Home" />
        <NavButton to="/search" label="Browse Movies" />
        <NavButton to="/watchlist" label="My Watchlist" />
        <NavButton to="/profile" label="Profile" />
        <button onClick={onLogout} className="logout-btn">
          <h4>Logout</h4>
        </button>
      </div>
    </nav>
  )
}

// Auth wrapper to redirect after login
const AuthWrapper = ({ onLogin }) => {
  const navigate = useNavigate()

  const handleLogin = (user) => {
    onLogin(user)
    navigate("/", { replace: true }) // redirect to dashboard after login
  }

  return <Auth onLogin={handleLogin} />
}

export default App
