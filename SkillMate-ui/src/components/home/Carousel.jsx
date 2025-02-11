import React from 'react';
import Slider from 'react-slick';
import './Carousel.css';
import logo from '../../assets/skillmate.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carouselImg1 from '../../assets/carausel.jpg';


const Carousel = () => {
  const spiritualImages = [
    {
      image: carouselImg1,
      caption: "Experience Peace"
    },
    {
      image: carouselImg1,
      caption: "Embrace Growth"
    },
    {
      image: carouselImg1,
      caption: "Find Balance"
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-heading">Our Spiritual Journey</h2>
      <Slider {...settings}>
        {spiritualImages.map((img, index) => (
          <div className="carousel-slide" key={index}>
            <div className="carousel-image-container">
              <img className="carousel-image" src={img.image} alt={`Slide ${index + 1}`} />
              <h3 className="carousel-caption">{img.caption}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
