import React from "react";
import "./Dashboard.css"; 
import Slideshow from "../Dashboard/Slideshow/Slideshow";
import RecommendedMovies from "../Dashboard/Rec_movies/Rec_movies"
const dummyMovies = [
  { id: 1, title: 'Jujutsu Kaisen', poster: 'https://cdn.myanimelist.net/images/anime/3/40451.jpg' },
  { id: 2, title: 'Demon Slayer', poster: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg' },
  { id: 3, title: 'Spy x Family', poster: 'https://cdn.myanimelist.net/images/anime/1433/123098.jpg' },
  { id: 4, title: 'Bleach: Thousand-Year Blood War', poster: 'https://cdn.myanimelist.net/images/anime/1908/135431.jpg' },
];



export default function Dashboard() {
  return (
      <div className="dashboard-container">
      <Slideshow />
      <RecommendedMovies movies={dummyMovies} />
    </div>
  );
}
