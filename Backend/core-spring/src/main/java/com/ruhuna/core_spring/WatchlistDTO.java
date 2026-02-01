package com.ruhuna.core_spring;

public class WatchlistDTO {
    private Long id;
    private Long movieId;
    private String movieTitle;
    private String moviePosterLink;
    private Boolean watched;

    // Getters and setters
    public Long getMovieId() { return movieId; }
    public void setMovieId(Long movieId) { this.movieId = movieId; }

    public String getMovieTitle() { return movieTitle; }
    public void setMovieTitle(String movieTitle) { this.movieTitle = movieTitle; }

    public Boolean getWatched() {
        return watched;
    }

    public void setWatched(Boolean watched) {
        this.watched = watched;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMoviePosterLink() { return moviePosterLink; }
    public void setMoviePosterLink(String moviePosterLink) { this.moviePosterLink = moviePosterLink; }
}
