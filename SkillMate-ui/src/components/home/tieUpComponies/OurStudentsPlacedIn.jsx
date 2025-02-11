import React from 'react';
import companyLogo from '../../../assets/google.png'; // Sample logo, replace with actual logo paths.
import styled, { keyframes } from 'styled-components';

// Define the scroll animation
const scrollAnimation = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
`;

const Container = styled.div`
    text-align: center;
    margin-top: 50px;
`;

const Heading = styled.h1`
    margin-bottom: 30px;
    font-size: 2rem;
    font-weight: bold;
    color: #ffffff;
`;

const Carousel = styled.div`
    pointer-events: none; /* Disable all interaction with carousel */
`;

const CarouselInner = styled.div`
    display: flex;
    overflow: hidden;
`;

const CarouselItem = styled.div`
    flex: 0 0 auto; /* Ensure all items stay in a single row */
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${scrollAnimation} 10s linear infinite; /* Animation for auto scroll */
`;

const CompanyLogo = styled.div`
    width: 150px; /* Equal width */
    height: 150px; /* Equal height */
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
`;

const CompanyLogoImage = styled.img`
   width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
`;

const OurStudentsPlacedIn = () => {
    const companyLogos = [
        companyLogo,
        companyLogo,
        companyLogo,
        companyLogo,
        companyLogo,
        companyLogo,
        companyLogo,
        companyLogo,
        companyLogo,
        companyLogo,
        companyLogo,
        companyLogo,
    ];

    return (
        <Container>
            <Heading>Our Students Placed In</Heading>

            {/* Carousel */}
            <Carousel>
                <CarouselInner>
                    {companyLogos.map((logo, index) => (
                        <CarouselItem key={index}>
                            <CompanyLogo>
                                <CompanyLogoImage src={logo} alt={`Company ${index + 1}`} />
                            </CompanyLogo>
                        </CarouselItem>
                    ))}
                </CarouselInner>
            </Carousel>
        </Container>
    );
};

export default OurStudentsPlacedIn;
