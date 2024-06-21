import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => {
        const imageUrls = data.map((show) => show.image); // Extract image URLs
        setImages(imageUrls);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set autoplay speed (in milliseconds)
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      className="max-w-7xl mx-auto rounded-lg"
      style={{ backgroundColor: "#f7f7f2" }}
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            className="max-w-7xl mx-auto px-2 "
            style={{ backgroundColor: "#f7f7f2" }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto py-2"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
