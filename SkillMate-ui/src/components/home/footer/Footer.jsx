import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemIcon } from '@mui/material';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CompanySignature from '../CompanySignature';

const FooterContainer = styled(Box)({
    backgroundColor: '#16404D',
    color: '#FDFFE2',
    padding: '0 40px',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    borderTop: '1px solid rgb(78, 78, 78)',
});

const FooterSection = styled(Box)({
    flex: 1,
    minWidth: '200px',
    margin: '10px',
});

const FooterHeading = styled(Typography)({
    fontSize: '20px',
    marginBottom: '15px',
    borderBottom: '1px solid #000000',
    paddingBottom: '5px',
});

const FooterList = styled(List)({
    padding: 0,
});

const FooterItem = styled(ListItem)({
    display: 'flex',
    alignItems: 'center',
    margin: '8px 0',
    cursor: 'pointer',
    paddingLeft: '10px',
    transition: 'background-color 0.2s, color 0.3s',
    '&:hover': {
        color: '#006381',
        backgroundColor: 'hsla(0, 0%, 11%, 0.426)',
        textDecoration: 'none',
    },
});

const FooterItemLink = styled(Link)({
    textDecoration: 'none',
    color: '#FDFFE2',
    '&:hover': {
        color: '#006381',
        textDecoration: 'none',
    },
});

function Footer() {
    return (
        <>
            <FooterContainer component="footer">
                <FooterSection>
                    <FooterHeading variant="h6">Get in touch</FooterHeading>
                    <FooterList>
                        <FooterItem component="a" href="https://www.instagram.com/_skillmate/" target="_blank" rel="noopener noreferrer">
                            <ListItemIcon><InstagramIcon sx={{ color: '#FDFFE2' }} /></ListItemIcon>
                            Instagram
                        </FooterItem>
                        <FooterItem component="a" href="https://www.facebook.com/profile.php?id=61563688179860" target="_blank" rel="noopener noreferrer">
                            <ListItemIcon><FacebookIcon sx={{ color: '#FDFFE2' }} /></ListItemIcon>
                            Facebook
                        </FooterItem>
                        <FooterItem component="a" href="https://www.linkedin.com/company/104900751/admin/dashboard/" target="_blank" rel="noopener noreferrer">
                            <ListItemIcon><LinkedInIcon sx={{ color: '#FDFFE2' }} /></ListItemIcon>
                            LinkedIn
                        </FooterItem>
                    </FooterList>
                </FooterSection>

                <FooterSection>
                    <FooterHeading variant="h6">Career Path</FooterHeading>
                    <FooterList>
                        <FooterItem>
                            <FooterItemLink to="/careers/software-engineer">Software Engineer</FooterItemLink>
                        </FooterItem>
                        <FooterItem>
                            <FooterItemLink to="/careers/frontend-developer">Frontend Developer</FooterItemLink>
                        </FooterItem>
                        <FooterItem>
                            <FooterItemLink to="/careers/backend-developer">Backend Developer</FooterItemLink>
                        </FooterItem>
                        <FooterItem>
                            <FooterItemLink to="/careers/fullstack-developer">Full Stack Developer</FooterItemLink>
                        </FooterItem>
                    </FooterList>
                </FooterSection>

                <FooterSection>
                    <FooterHeading variant="h6">Explore</FooterHeading>
                    <FooterList>
                        <FooterItem>
                            <FooterItemLink to="/explore/ui-ux-design">UI/UX Design</FooterItemLink>
                        </FooterItem>
                        <FooterItem>
                            <FooterItemLink to="/explore/web-development-tools">Web Development Tools</FooterItemLink>
                        </FooterItem>
                        <FooterItem>
                            <FooterItemLink to="/explore/design-systems">Design Systems</FooterItemLink>
                        </FooterItem>
                        <FooterItem>
                            <FooterItemLink to="/explore/prototyping-wireframing">Prototyping & Wireframing</FooterItemLink>
                        </FooterItem>
                        <FooterItem>
                            <FooterItemLink to="/explore/collaborative-design-tools">Collaborative Design Tools</FooterItemLink>
                        </FooterItem>
                    </FooterList>
                </FooterSection>

                <FooterSection>
                    <FooterHeading variant="h6">SkillMate</FooterHeading>
                    <FooterList>
                        <FooterItem>
                            <FooterItemLink to="/about">About</FooterItemLink>
                        </FooterItem>
                        <FooterItem>
                            <FooterItemLink to="/offerings">What We Offer</FooterItemLink>
                        </FooterItem>
                        <FooterItem>
                            <FooterItemLink to="/why-skillmate">Why SkillMate?</FooterItemLink>
                        </FooterItem>
                    </FooterList>
                </FooterSection>
            </FooterContainer>
            <CompanySignature />
        </>
    );
}

export default Footer;
