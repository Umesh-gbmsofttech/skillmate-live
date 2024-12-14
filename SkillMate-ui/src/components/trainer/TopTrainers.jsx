import React, { useEffect, useState } from 'react';
import './TopTrainers.css';
import logo from '../../assets/skillmate.jpg';

function TopTrainers({ sectionHeading }) {
    const [isVisible, setIsVisible] = useState(false);

    const cards = Array(6).fill({
        logo: logo,
        alt: 'SkillMate logo',
        trainerName: 'John Doe',
        trainerDetails: 'Body text for whatever you d like to say.',
    });

    useEffect(() => {
        const handleScroll = () => {
            const section = document.querySelector('.ourTopTrainersContainer');
            if (section) {
                const rect = section.getBoundingClientRect();
                const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
                setIsVisible(isInViewport);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`ourTopTrainersContainer ${isVisible ? 'visible' : ''}`}>
            <h3 className='ourTopTrainersHeading'>{sectionHeading}</h3>
            <div className="ourTopTrainersCardSection">
                {cards.map((card, index) => (
                    <div key={index} className={`trainerCard ${isVisible ? 'visible' : ''}`}>
                        <img className='trainerCardImage' src={card.logo} alt={card.alt} />
                        <div className="trainerCardDetails">
                            <h4 className="trainerNameCard">{card.trainerName}</h4>
                            <p className="trainerCardBody">{card.trainerDetails}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopTrainers;
