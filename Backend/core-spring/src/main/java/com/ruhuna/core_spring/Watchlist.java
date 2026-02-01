package com.ruhuna.core_spring;



import jakarta.persistence.*;

@Entity
public class Watchlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }




    private boolean watched;
    private String movieTitle;
    private String username;

    public boolean getWatched() {
        return watched;
    }
    private String moviePosterLink;

    public void setWatched(boolean watched) {
        this.watched = watched;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    // Getter/setter for moviePosterLink
    public String getMoviePosterLink() {
        return moviePosterLink;
    }
    public void setMoviePosterLink(String moviePosterLink) {
        this.moviePosterLink = moviePosterLink;
    }
}

