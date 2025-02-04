import React, { useState } from 'react';
import './TechnologyStack.css';
import logo from '../../../assets/skillmate.jpg';
import backendImg from '../../../assets/technology_stack/backend.png';
import databaseImg from '../../../assets/technology_stack/database.png';
import frontendImg from '../../../assets/technology_stack/frontend.png';
import osImg from '../../../assets/technology_stack/os.jpeg';
import serverImg from '../../../assets/technology_stack/server.jpg';

function TechnologyStack() {
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered card

    const technologies = [
        {
            number: 1,
            technologyName: "OS",
            imageUrl: osImg,
            description: "Operating system used for server deployment.",
        },
        {
            number: 2,
            technologyName: "SERVER",
            imageUrl: serverImg,
            description: "Manages client requests and backend logic.",
        },
        {
            number: 3,
            technologyName: "DATABASE",
            imageUrl: databaseImg,
            description: "Stores and retrieves application data efficiently.",
        },
        {
            number: 4,
            technologyName: "BACKEND PROGRAMMING/LANGUAGE",
            imageUrl: frontendImg,
            description: "Languages used to build business logic and APIs.",
        },
        {
            number: 5,
            technologyName: "FRONTEND FRAMEWORK/LIBRARY",
            imageUrl: backendImg,
            description: "Tools for creating interactive user interfaces.",
        },
    ];

    return (
        <div className="technology__stack-container">
            <p className="technology__stack-container-heading">
                Common Technology Stack Layers
            </p>

            <div className="technology__container-technology">
                {technologies.map((technology, index) => (
                    <div className="technology__container-technology-card"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}>
                        <div className="technology__container-technology-info">
                            <h3>{technology.technologyName}</h3>
                            <img
                                src={technology.imageUrl}
                                alt={technology.technologyName}
                                className="technology__container-technology-image"
                            />
                            {/* Hoverable description with a speech bubble */}
                            <div className={`technology__description ${hoveredIndex === index ? 'visible' : ''}`}>
                                <p>{technology.description}</p>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default TechnologyStack;
