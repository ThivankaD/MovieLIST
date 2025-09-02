import React from "react";
import "./Dashboard.css"; 
import Slideshow from "../Dashboard/Slideshow/Slideshow";
import RecommendedMovies from "../Dashboard/Rec_movies/Rec_movies";
import ArticleSlideshow from"../Dashboard/Article/ArticleSlideshow";
const dummyMovies = [
  { id: 1, title: 'Last of Us', poster: 'https://i.pinimg.com/1200x/a0/f8/66/a0f86690e3e4fef4794e234ba6e4d59a.jpg' },
  { id: 2, title: 'Squid game S2', poster: 'https://i.pinimg.com/736x/0a/d3/7c/0ad37ca5fe1d120f976bc9b262a6fe77.jpg' },
  { id: 3, title: 'Inception', poster: 'https://i.pinimg.com/736x/7c/35/88/7c35881dc97da007e19f0b989685c888.jpg' },
  { id: 4, title: 'Harry Potter', poster: 'https://i.pinimg.com/736x/10/72/93/107293c18946574b9a4ee253c9f91bfa.jpg' },
];
const articles = [
  {
    headline: "Season 2 has ruined everything about this series.what a shame 💬",
    ins:"📌 Did they really have to do this.. why would the makers of such a great season 1, will infect themselves to ruin everything for themselves and the viewers... I'm so disgusted...please don't watch season 2 or if you do then just stop after first 2 episodes. That's it.. S1 has left such impressive memories of careful writing, acting, direction and everything. Now it has turned into a teen comedy show .. so unnecessary.. they should've stopped at season 1 for it to be remembered as one of the best apocalypse drama.. even the main character of Ellie has lost all its charisma, valour and personality. Just don't watch if you like S1.",
    image: "https://i.pinimg.com/1200x/b0/8e/d3/b08ed390768c8e4d59d170d89672c730.jpg"
  },
  {
    headline: "Possibly the best episode of Wednesday so far! 💬",
     ins:" 📌After the weird third episode I came into this one a little tentative. Boy was I surprised though. The story continues and is extremely compelling with sudden twists some of which are very shocking(in my opinion) and some great scenes like Billie Piper's character playing Zombie on the piano in that one scene! :> Absolutely devastating cliffhanger and I like the altered formula to make it different from the previous episodes. The relationship between Grandma-ma and Morticia is interesting and it's nice to see Morticia take some action. But the icing on the cake is the last 15-20 minutes with one banger of a cliffhanger. It's also always a plus to see Fester. Agnes is also a very interesting character and I would like to see more on her. Can't wait for Part 2 on September 3rd.",
    image: "https://i.pinimg.com/1200x/c7/97/4d/c7974dca37044b449d566b5adf16fcc3.jpg"
  },
  {
    headline: "Glorious Purpose! 💬",
     ins:" 📌This series proves that this is the BEST of Marvel in the small screen and even yet one of those top tier projects that they have throughout the course of their cinematic universe. The whole season 2 is full of more possibilities and more questions looming as to what Marvel can still offer. The ending and the whole Glorious Purpose of Loki has finally come together in the season finale.",
    image: "https://i.pinimg.com/1200x/cd/33/4d/cd334df0adc10b9e91ef8d035d33fe78.jpg"
  }
];



export default function Dashboard() {
  return (
      <div className="dashboard-container">
      <Slideshow />
      <RecommendedMovies movies={dummyMovies} />
       <ArticleSlideshow articles={articles} interval={8000} />
    </div>
  );
}
