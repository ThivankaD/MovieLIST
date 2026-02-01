package com.ruhuna.core_spring;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WatchlistService {
    private final WatchlistRepository watchlistRepo;
    private final UserRepository userRepo;
    private final MovieRepository movieRepo;

    public WatchlistService(WatchlistRepository watchlistRepo, UserRepository userRepo, MovieRepository movieRepo) {
        this.watchlistRepo = watchlistRepo;
        this.userRepo = userRepo;
        this.movieRepo = movieRepo;
    }

    // Get all watchlist entries for a user
    public List<WatchlistDTO> getWatchlistForUser(String username) {
        User user = userRepo.findByUsername(username);
        if (user == null) throw new RuntimeException("User not found: " + username);

        List<Watchlist> watchlist = watchlistRepo.findByUser(user);

        // Map Watchlist entities to DTOs
        return watchlist.stream().map(w -> {
            WatchlistDTO dto = new WatchlistDTO();
            dto.setId(w.getId());
            dto.setMovieId(w.getMovie().getId());
            dto.setMovieTitle(w.getMovieTitle());
            dto.setMoviePosterLink(w.getMoviePosterLink());
            dto.setWatched(w.getWatched());
            return dto;
        }).collect(Collectors.toList());
    }

    // Add a movie to watchlist (classic way: just by movie ID)
    public Watchlist addToWatchlist(String username, Long movieId) {
        User user = userRepo.findByUsername(username);
        if (user == null) throw new RuntimeException("User not found: " + username);

        Movie movie = movieRepo.findById(movieId).orElseThrow(
                () -> new RuntimeException("Movie not found: " + movieId)
        );

        // Prevent duplicates
        List<Watchlist> existing = watchlistRepo.findByUserAndMovieId(user, movieId);
        if (!existing.isEmpty()) return existing.get(0);

        Watchlist item = new Watchlist();
        item.setUser(user);
        item.setMovie(movie);
        item.setWatched(false);
        item.setUsername(user.getUsername());
        item.setMovieTitle(movie.getTitle());
        item.setMoviePosterLink(movie.getPoster());
        item.setMovie(movie);
        return watchlistRepo.save(item);
    }

    // Add a movie to watchlist with details from frontend (custom endpoint)
    public Watchlist addToWatchlistWithDetails(String username, Long movieId, String movieTitle, String moviePosterLink) {
        User user = userRepo.findByUsername(username);
        if (user == null) throw new RuntimeException("User not found: " + username);

        Movie movie = movieRepo.findById(movieId).orElseThrow(
                () -> new RuntimeException("Movie not found: " + movieId)
        );

        // Prevent duplicates
        List<Watchlist> existing = watchlistRepo.findByUserAndMovieId(user, movieId);
        if (!existing.isEmpty()) return existing.get(0);

        Watchlist item = new Watchlist();
        item.setUser(user);
        item.setMovie(movie);
        item.setWatched(false);
        item.setUsername(user.getUsername());
        item.setMovieTitle(movieTitle);
        item.setMoviePosterLink(moviePosterLink);
        item.setMovie(movie);
        return watchlistRepo.save(item);
    }

    // Remove a movie from watchlist
    public void removeFromWatchlist(String username, Long movieId) {
        User user = userRepo.findByUsername(username);
        if (user == null) throw new RuntimeException("User not found: " + username);

        List<Watchlist> items = watchlistRepo.findByUserAndMovieId(user, movieId);
        for (Watchlist item : items) {
            watchlistRepo.delete(item);
        }
    }

    // Mark a movie as watched
    public Watchlist markAsWatched(String username, Long movieId) {
        User user = userRepo.findByUsername(username);
        if (user == null) throw new RuntimeException("User not found: " + username);

        List<Watchlist> items = watchlistRepo.findByUserAndMovieId(user, movieId);
        if (items.isEmpty()) throw new RuntimeException("Watchlist entry not found for user and movie.");
        Watchlist item = items.get(0);
        item.setWatched(true);
        return watchlistRepo.save(item);
    }
}