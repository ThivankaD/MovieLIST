"use client"

import { useState, useEffect } from "react"
import { BsBookmark, BsBookmarkFill } from "react-icons/bs"
import './MovieSearch.css'

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <img src={movie.poster} alt={movie.title} className="modal-poster" />
        <div className="modal-details">
          <h2>
            {movie.title} <span>({movie.year})</span>
          </h2>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong> ⭐Rating:</strong> {movie.rating}
          </p>
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  )
}

const MovieSearch = ({ user }) => {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [watchlist, setWatchlist] = useState([])
  const [loadingWatchlist, setLoadingWatchlist] = useState(false)
  const [popupMsg, setPopupMsg] = useState("");
  const [popupType, setPopupType] = useState("");

  // Fetch all movies once
  useEffect(() => {
    fetch("http://localhost:8080/api/movies")
      .then(res => res.json())
      .then(data => {
        const normalized = data.map(m => ({
          ...m,
          id: m.id ?? m.movieId ?? m._id,
        }))
        setMovies(normalized)
        setFilteredMovies(normalized)
      })
      .catch(err => {
        console.error("Failed to fetch movies:", err)
      })
  }, [])

  // Fetch watchlist when user changes
  useEffect(() => {
    setLoadingWatchlist(true)
    fetch(`http://localhost:8080/api/users/by-username/${encodeURIComponent(user.name)}/watchlist`)
      .then(res => res.json())
      .then(data => {
        const normalizedWatchlist = Array.isArray(data)
        ? data.map(m => ({
            ...m,
            movieId: m.movieId ?? m.id ?? m._id,
          }))
        : [];
        setWatchlist(normalizedWatchlist)
        setLoadingWatchlist(false)
      })
      .catch(err => {
        setWatchlist([])
        setLoadingWatchlist(false)
        console.error("Failed to fetch watchlist:", err)
      })
  }, [user.name])

  // Filter movies on searchTerm or movies change
  useEffect(() => {
    const term = searchTerm.toLowerCase()
    setFilteredMovies(
      movies.filter(
        m =>
          m.title.toLowerCase().includes(term) ||
          m.genre.toLowerCase().includes(term)
      )
    )
  }, [searchTerm, movies])

  // Local isSaved check using local watchlist state
  const isSaved = (movie) => {
    return watchlist.some((m) => m.movieId === movie.id)
  }

  // Toggle watchlist in backend and update local watchlist state
  const toggleWatchlist = async (movie) => {
    if (!movie || typeof movie.id === "undefined" || movie.id === null) {
      setPopupMsg("Invalid movie or movie id!");
      setPopupType("error");
      return;
    }
    const saved = isSaved(movie);
    try {
      let url, options;
      if (!saved) {
        url = `http://localhost:8080/api/users/by-username/${encodeURIComponent(user.name)}/watchlist/add`;
        options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            movieId: movie.id,
            movieTitle: movie.title,
            moviePosterLink: movie.poster,
          }),
        };
      } else {
        url = `http://localhost:8080/api/users/by-username/${encodeURIComponent(user.name)}/watchlist/${movie.id}`;
        options = { method: "DELETE" };
      }
      const res = await fetch(url, options);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || res.statusText);
      }

      // Re-fetch watchlist after update
      const watchlistRes = await fetch(
        `http://localhost:8080/api/users/by-username/${encodeURIComponent(user.name)}/watchlist`
      );
      if (!watchlistRes.ok) {
        const errorText = await watchlistRes.text();
        throw new Error(errorText || watchlistRes.statusText);
      }
      let newWatchlist = [];
      const text = await watchlistRes.text();
      if (text) {
        newWatchlist = JSON.parse(text);
      }
      setWatchlist(newWatchlist);

      setPopupMsg(saved ? "Removed from watchlist!" : "Successfully added to watchlist!");
      setPopupType("success");
    } catch (err) {
      setPopupMsg("Failed to update watchlist! " + err.message);
      setPopupType("error");
    }
  };

  return (
    <div className="movie-search">
      {popupMsg && (
        <div className={`popup ${popupType}`}>
          {popupMsg}
          <button onClick={() => setPopupMsg("")}>×</button>
        </div>
      )}
      <div className="search-header">
        <h2>Browse Movies</h2>
        <input
          type="text"
          placeholder="Search by title or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loadingWatchlist ? (
        <div className="loading-indicator">Loading watchlist...</div>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-poster-wrapper"
              onClick={() => setSelectedMovie(movie)}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-poster"
              />
              <button
                className="bookmark-icon"
                onClick={e => {
                  e.stopPropagation()
                  toggleWatchlist(movie)
                }}
                title={isSaved(movie) ? "Remove from Watchlist" : "Save to Watchlist"}
                aria-label={isSaved(movie) ? "Remove from Watchlist" : "Save to Watchlist"}
                disabled={loadingWatchlist}
              >
                {isSaved(movie) ? <BsBookmarkFill /> : <BsBookmark />}
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  )
}

export default MovieSearch