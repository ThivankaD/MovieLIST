"use client"

import { useState, useEffect } from "react"
import './watchlist.css';

const Watchlist = ({ user }) => {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchWatchlist = async () => {
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:8080/api/users/by-username/${user.name}/watchlist`)
      if (!res.ok) throw new Error("Failed to fetch watchlist")
      const data = await res.json()
      setWatchlist(data)
    } catch (err) {
      setWatchlist([])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (user?.name) fetchWatchlist()
  }, [user.name])

  // Use movie.movieId for backend calls!
  const removeFromWatchlist = async (movieId) => {
    if (!movieId) {
      alert("Invalid movie id!");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8080/api/users/by-username/${user.name}/watchlist/${movieId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to remove movie");
      await fetchWatchlist();
    } catch (err) {
      alert("Failed to remove movie from watchlist.");
    }
  };

  const markAsWatched = async (movieId) => {
    if (!movieId) {
      alert("Invalid movie id!");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8080/api/users/by-username/${user.name}/watchlist/${movieId}/watched`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Failed to mark as watched");
      await fetchWatchlist();
      alert("Movie marked as watched!");
    } catch (err) {
      alert("Failed to mark as watched.");
    }
  };

  if (loading) {
    return <div>Loading watchlist...</div>
  }

  if (watchlist.length === 0) {
    return (
      <div className="watchlist-empty">
        <h2>Your Watchlist</h2>
        <div className="empty-state">
          <h3>🎬 Your watchlist is empty</h3>
          <p>Start adding movies you want to watch!</p>
          <button className="browse-btn">Browse Movies</button>
        </div>
      </div>
    )
  }

  return (
    <div className="watchlist">
      <div className="watchlist-header">
        <h2>My Watchlist ({watchlist.length} movies)</h2>
      </div>
      <div className="movie-grid">
        {watchlist.map((movie) => (
          <div key={movie.movieId} className="movie-card">
            <img
              src={movie.moviePosterLink || "/placeholder.svg"}
              alt={movie.movieTitle || "No Title"}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3>{movie.movieTitle || "Untitled"}</h3>
              <div className="movie-actions">
                <button
                  className="watch-btn"
                  onClick={() => markAsWatched(movie.movieId)}
                  disabled={movie.watched}
                >
                  ✓ {movie.watched ? "Watched" : "Mark as Watched"}
                </button>
                <button
                  className="remove-btn"
                  onClick={() => removeFromWatchlist(movie.movieId)}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Watchlist