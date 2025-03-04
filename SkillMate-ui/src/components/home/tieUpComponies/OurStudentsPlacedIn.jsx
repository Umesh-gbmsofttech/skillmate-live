import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Box, Typography } from '@mui/material';
import l1 from '../../../assets/tieUpCompanies/1.png';
import l2 from '../../../assets/tieUpCompanies/2.png';
import l3 from '../../../assets/tieUpCompanies/3.png';
import l4 from '../../../assets/tieUpCompanies/4.png';
import l5 from '../../../assets/tieUpCompanies/5.png';
import l6 from '../../../assets/tieUpCompanies/6.png';
import l7 from '../../../assets/tieUpCompanies/7.png';
import l8 from '../../../assets/tieUpCompanies/8.png';
import l9 from '../../../assets/tieUpCompanies/9.png';
import l10 from '../../../assets/tieUpCompanies/10.png';
import l11 from '../../../assets/tieUpCompanies/11.png';
import l12 from '../../../assets/tieUpCompanies/12.png';
import l13 from '../../../assets/tieUpCompanies/13.png';
import l14 from '../../../assets/tieUpCompanies/14.png';
import l15 from '../../../assets/tieUpCompanies/15.png';
import l16 from '../../../assets/tieUpCompanies/16.png';
import l17 from '../../../assets/tieUpCompanies/17.png';
import l18 from '../../../assets/tieUpCompanies/18.png';
import l19 from '../../../assets/tieUpCompanies/19.png';

const logos = [ l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19 ];
const duplicatedLogos = [ ...logos, ...logos ];
const scrollDuration = logos.length * 2;

const scrollAnimation = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
`;

const Container = styled.div`
    text-align: center;
    margin-top: 50px;
    margin-bottom: 30px;
    overflow: hidden;
    white-space: nowrap;
`;

const CarouselWrapper = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    position: relative;
`;

const CarouselTrack = styled.div`
    display: flex;
    animation: ${scrollAnimation} ${scrollDuration}s linear infinite;
`;

const CompanyLogo = styled.div`
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
`;

const CompanyLogoImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
`;

const OurStudentsPlacedIn = () => {

    return (
        <Container>
            <Box sx={ { padding: 2, textAlign: 'center', } }>
                <Typography sx={ {
                    textAlign: 'center',
                    marginTop: 3,
                    fontWeight: 'bold',
                    fontSize: { xs: 'var(--font-size-p2)', md: 'var(--font-size-p1)' },
                    fontFamily: 'var(--font-p1)',
                    backgroundImage: 'linear-gradient(to right, var(--color-p1), rgba(0, 128, 128, 0.6), var(--color-p1))',
                    display: { xs: 'block', md: 'inline-block' },
                    padding: { xs: '0 20px', md: '0px' }
                } }>
                    Our Students Placed In
                </Typography>
            </Box>
            <CarouselWrapper>
                <CarouselTrack>
                    { duplicatedLogos.map((logo, index) => (
                        <CompanyLogo key={ index }>
                            <CompanyLogoImage src={ logo } alt={ `Company ${index + 1}` } />
                        </CompanyLogo>
                    )) }
                </CarouselTrack>
            </CarouselWrapper>
        </Container>
    );
};

export default OurStudentsPlacedIn;