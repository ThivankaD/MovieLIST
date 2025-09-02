import React, { useState, useEffect } from "react";
import "../Article/ArticleSlideshow.css";

const ArticleSlideshow = ({ articles, interval = 8000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === articles.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [articles.length, interval]);

  if (!articles || articles.length === 0) return null;

  return (
   <div className="c"> 
       
    <div className="slideshow-container">
        
      <img
        src={articles[currentIndex].image}
        alt={articles[currentIndex].headline}
        className="slideshow-image"
      />
      <div className="slideshow-overlay">
        <h2 className="slideshow-headline">{articles[currentIndex].headline}</h2>
        <div className="slideshow-subhead-box">
        <h3 className="slideshows-headline">{articles[currentIndex].ins}</h3>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ArticleSlideshow;
