package com.ruhuna.core_spring;



import com.ruhuna.core_spring.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}

