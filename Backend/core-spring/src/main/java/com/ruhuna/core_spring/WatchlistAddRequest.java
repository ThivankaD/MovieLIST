package com.ruhuna.core_spring;

public class WatchlistAddRequest {
    private Long movieId;
    private String movieTitle;
    private String moviePosterLink;

    // Getters and setters
    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }
    public String getMoviePosterLink() {
        return moviePosterLink;
    }

    public void setMoviePosterLink(String moviePosterLink) {
        this.moviePosterLink = moviePosterLink;
    }
}
