import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./Carousel.css";

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [slides, setSlides] = useState([
    {
      image: "/images/1.jpg",
      title: "Digital Innovation",
      subtitle: "Explore Now"
    },
    {
      image: "/images/1.jpg",
      title: "Cutting-Edge Courses",
      subtitle: "SEE ALL"
    },
    {
      image: "/images/1.jpg",
      title: "Advanced Design",
      subtitle: "Learn More"
    },
    {
      image: "/images/1.jpg",
      title: "Market Analytics",
      subtitle: "ANALYTICS"
    },
 
  ]);

  useEffect(() => {
    // This would be replaced with a fetch call to your backend
    console.log("Using temporary data for the carousel");
  }, []);

  // Scroll to next slide
  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  // Scroll to previous slide
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  return (
    <div className="carousel-container">
      <button className="embla__prev" onClick={scrollPrev}>&lt;</button>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div key={index} className="embla__slide">
              <div
                className="embla__slide__inner"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="embla__slide__overlay">
                  <h3 className="slide-title">{slide.title}</h3>
                  {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="embla__next" onClick={scrollNext}>&gt;</button>
    </div>
  );
};

export default Carousel;
