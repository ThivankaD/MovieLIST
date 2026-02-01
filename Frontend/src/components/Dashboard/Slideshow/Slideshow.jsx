import React, { useState, useEffect } from "react";
import "../Slideshow/Slideshow.css";

const slides = [
  {
    image: "https://i.pinimg.com/1200x/fe/3c/95/fe3c959819ad935653faf5fa81b0161b.jpg",
    category: "#4 UpComing",
    title: "Stranger Things - Season 5",
    info: [
      { icon: "tv", text: "TV" },
      { icon: "clock", text: "24m" },
      { icon: "calendar", text: "Apr 10, 2025" },
      { icon: "hd", text: "HD" },
      { icon: "cc", text: "10" },
      { icon: "12", text: "12" }
    ],
    description:
      "Philia hails from a family renowned for producing generations of saints, and she is no exception. In fact, she is known as the most powerful saint of all time, so extraordinarily gifted that many people find her insufferable. When even her fiancé decides he can't stand her, he suddenly calls off their..."
  },{
  image: "https://i.pinimg.com/1200x/8d/09/89/8d09896173553f44deda14ee15bc104c.jpg",
  category: "#1 Trending",
  title: "Squid Game - Season 3",
  info: [
    { icon: "tv", text: "TV" },
    { icon: "clock", text: "30m" },
    { icon: "calendar", text: "Jul 4, 2025" },
    { icon: "hd", text: "HD" },
    { icon: "cc", text: "13" },
    { icon: "pg", text: "PG" }
  ],
  description:
    "A rising idol tries to balance her stardom and her hidden past, but fate takes a surprising turn when a dedicated doctor becomes entangled in her world."
},
{
  image: "https://i.pinimg.com/1200x/0a/db/43/0adb4315d6893c70d35181ef1ee386f5.jpg",
  category: "#2 Great of all time",
  title: "Game of Thrones",
  info: [
    { icon: "tv", text: "TV" },
    { icon: "clock", text: "50m" },
    { icon: "calendar", text: "Apr 5, 2009" },
    { icon: "hd", text: "HD" },
    { icon: "cc", text: "64" },
    { icon: "pg-13", text: "PG-13" }
  ],
  description:
    "Brothers Edward and Alphonse Elric use alchemy to search for the Philosopher’s Stone, hoping to restore their bodies after a disastrous failed ritual."
},
{
  image: "https://i.pinimg.com/1200x/90/59/dd/9059ddf100f700354715af20a514528e.jpg",
  category: "#3 New Arrival",
  title: "Thunderbolts - New AVENGERS",
  info: [
    { icon: "tv", text: "movie" },
    { icon: "clock", text: "1h45m" },
    { icon: "calendar", text: "jun 7, 2025" },
    { icon: "hd", text: "HD" },
    { icon: "cc", text: "16" },
    { icon: "r", text: "pg" }
  ],
  description:
    "Eren Yeager and his friends fight for freedom and survival as they uncover the secrets behind the Titans and the true history of their walled world."
}
  // ... add more slides
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="slideshow">
      <img src={slide.image} alt={slide.title} className="slideshow-bg" />
      <div className="slideshow-overlay" />
      <div className="slideshow-content">
        <div className="slideshow-category">{slide.category}</div>
        <h1 className="slideshow-title">{slide.title}</h1>
        <div className="slideshow-info">
          {slide.info.map((item, i) => (
            <span key={i} className={`slideshow-info-item ${item.icon}`}>{item.text}</span>
          ))}
        </div>
        <p className="slideshow-desc">{slide.description}</p>
      </div>
      <button className="slideshow-nav prev" onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}>&lt;</button>
      <button className="slideshow-nav next" onClick={() => setCurrent((current + 1) % slides.length)}>&gt;</button>
    </div>
  );
}