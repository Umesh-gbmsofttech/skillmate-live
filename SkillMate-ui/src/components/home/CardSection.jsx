import React from 'react';
import './CardSection.css';
import logo from '../../assets/skillmate.jpg';

function CardSection() {
  const cards = Array(6).fill({
    logo: logo,
    alt: 'SkillMate logo',
    title: 'SkillMate Title',
    body: 'Body text for whatever you\'d like to say.',
  });

  // card section for the top community and top courses etc.
  return (
    <>
      <h2 className='card-section-heading'>card section for the top community and top courses etc.</h2>
      <div className="card-section">
        {cards.map((card, index) => (
          <div key={index} className="card" id={`card-${index}`}>
            <img className='card-image' src={card.logo} alt={card.alt} />
            <h4 className="card-title">{card.title}</h4>
            <p className="card-body">{card.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardSection;
