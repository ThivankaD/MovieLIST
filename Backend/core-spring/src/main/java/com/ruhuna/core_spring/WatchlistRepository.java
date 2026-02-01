package com.ruhuna.core_spring;

import com.ruhuna.core_spring.Watchlist;
import com.ruhuna.core_spring.User;
import com.ruhuna.core_spring.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {
    List<Watchlist> findByUser(User user);
    Watchlist findByUserAndMovie(User user, Movie movie);
    List<Watchlist> findByUserAndMovieId(User user, Long movieId);
}

