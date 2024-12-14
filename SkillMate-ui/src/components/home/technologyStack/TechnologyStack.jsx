import React from 'react';
import './TechnologyStack.css';
import logo from '../../../assets/skillmate.jpg'; // Replace with actual logo paths if available
import locationIcon from '../../../assets/locationIcon.png'; // Import locationIcon.png

function TechnologyStack() {
    const technologies = [
        {
            number: 1,
            technologyName: "OS",
            imageUrl: logo,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            number: 2,
            technologyName: "SERVER",
            imageUrl: logo,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            number: 3,
            technologyName: "DATABASE",
            imageUrl: logo,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            number: 4,
            technologyName: "BACKEND PROGRAMMING/LANGUAGE",
            imageUrl: logo,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            number: 5,
            technologyName: "FRONTEND FRAMEWORK/LIBRARY",
            imageUrl: logo,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
    ];

    return (
        <div className="technology__stack-container">
            <p className="technology__stack-container-heading">
                Common Technology Stack Layers
            </p>

            <div className="technology__container-technology">
                {technologies.map((technology, index) => (
                    <div key={index} className="technology__container-technology-card">
                        {/* Replacing the community container with locationIcon */}
                        <div className="location-icon-wrapper">
                            {/* Display technology number in the center of location icon */}
                            <div className="number-container">
                                {technology.number}
                            </div>
                        </div>

                        <div className="technology__container-technology-info">
                            {/* Image and technology name */}
                            <h3>{technology.technologyName}</h3>

                            <img
                                src={technology.imageUrl}
                                alt={technology.technologyName}
                                className="technology__container-technology-image"
                            />

                            {/* Hoverable description */}
                            <div className="technology__description">
                                <p>{technology.description.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TechnologyStack;
