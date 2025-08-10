"use client"

import { useState, useEffect } from "react"
import "./App.css"

import Auth from "./components/Auth/Auth"
import Dashboard from "./components/Dashboard/Dashboard"
import MovieSearch from "./components/MovieSearch/MovieSearch"
import Watchlist from "./components/watchlist/Watchlist"
import myIcon from "./Assests/8109065.png"; 

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentView, setCurrentView] = useState("dashboard")

  // Check for logged-in user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
  }, [])

  // Save logged-in user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    }
  }, [currentUser])

  // Handle login — will only be called when backend confirms user exists
  const handleLogin = (user) => {
    setCurrentUser(user)
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
    setCurrentView("dashboard")
  }

  // If not logged in, show only the Auth page
  if (!currentUser) {
    return <Auth onLogin={handleLogin} />
  }

  // If logged in, show the rest of the app
  return (
    <div className="App">
      <nav className="navbar">
         <img src={myIcon} alt="Navbar Icon" className="logo" />
        <div className="nav-brand">
         
          <h1>MovieList</h1>
        </div>
        <div className="nav-links">
          <button
            className={currentView === "dashboard" ? "active" : ""}
            onClick={() => setCurrentView("dashboard")}
          >
            Home
          </button>
          <button
            className={currentView === "search" ? "active" : ""}
            onClick={() => setCurrentView("search")}
          >
            Browse Movies
          </button>
          <button
            className={currentView === "watchlist" ? "active" : ""}
            onClick={() => setCurrentView("watchlist")}
          >
            My Watchlist
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <main className="main-content">
        {currentView === "dashboard" && <Dashboard user={currentUser} />}
        {currentView === "search" && <MovieSearch user={currentUser} />}
        {currentView === "watchlist" && <Watchlist user={currentUser} />}
      </main>
    </div>
  )
}

export default App