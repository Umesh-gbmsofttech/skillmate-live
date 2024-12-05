
import React from 'react';
import Slider from 'react-slick';
// import './Carausal.css';
import logo from '../../assets/skillmate.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SubCarausal = () => {
    const spiritualImages = [
        {
            image: logo,
            caption: "Experience Peace"
        },
        {
            image: logo,
            caption: "Embrace Growth"
        },
        {
            image: logo,
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
        <div className="hero-section">
            <h2>Our Spiritual Journey</h2>
            <Slider {...settings}>
                {spiritualImages.map((img, index) => (
                    <div className="carousel-item" key={index}>
                        <img className="d-block" src={img.image} alt={`Slide ${index + 1}`} />
                        <h3>{img.caption}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SubCarausal;
