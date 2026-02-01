package com.ruhuna.core_spring;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Ensure frontend access
public class WatchlistController {
    private final WatchlistService service;

    public WatchlistController(WatchlistService service) {
        this.service = service;
    }

    // Get the user's watchlist by username
    @GetMapping("/by-username/{username}/watchlist")
    public List<WatchlistDTO> getWatchlistByUsername(@PathVariable String username) {
        List<WatchlistDTO> items = service.getWatchlistForUser(username);
        return items.stream().map(w -> {
            WatchlistDTO dto = new WatchlistDTO();
            dto.setId(w.getId());
            dto.setMovieId(w.getMovieId());
            dto.setMovieTitle(w.getMovieTitle());
            dto.setMoviePosterLink(w.getMoviePosterLink());
            dto.setWatched(w.getWatched());
            return dto;
        }).collect(Collectors.toList());
    }

    // Add a movie to the user's watchlist by username (classic: only movieId)
    @PostMapping("/by-username/{username}/watchlist/{movieId}")
    public Watchlist addToWatchlist(@PathVariable String username, @PathVariable Long movieId) {
        return service.addToWatchlist(username, movieId);
    }

    // Add a movie to the user's watchlist by username, with details from frontend
    @PostMapping("/by-username/{username}/watchlist/add")
    public WatchlistDTO addToWatchlist(@PathVariable String username, @RequestBody WatchlistAddRequest req) {
        Watchlist w = service.addToWatchlistWithDetails(username, req.getMovieId(), req.getMovieTitle(), req.getMoviePosterLink());
        WatchlistDTO dto = new WatchlistDTO();
        dto.setId(w.getId());
        dto.setMovieId(w.getMovie().getId());
        dto.setMovieTitle(w.getMovieTitle());
        dto.setMoviePosterLink(w.getMoviePosterLink());
        dto.setWatched(w.getWatched());
        return dto;
    }

    // Remove a movie from the user's watchlist by username
    @DeleteMapping("/by-username/{username}/watchlist/{movieId}")
    public void removeFromWatchlist(@PathVariable String username, @PathVariable Long movieId) {
        service.removeFromWatchlist(username, movieId);
    }

    // Mark a movie as watched in the user's watchlist by username
    @PostMapping("/by-username/{username}/watchlist/{movieId}/watched")
    public WatchlistDTO markAsWatched(@PathVariable String username, @PathVariable Long movieId) {
        Watchlist w = service.markAsWatched(username, movieId);
        WatchlistDTO dto = new WatchlistDTO();
        dto.setId(w.getId());
        dto.setMovieId(w.getMovie().getId());
        dto.setMovieTitle(w.getMovieTitle());
        dto.setMoviePosterLink(w.getMoviePosterLink());
        dto.setWatched(w.getWatched());
        return dto;
    }
}