import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemIcon } from '@mui/material';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CompanySignature from '../CompanySignature';

const FooterContainer = styled(Box)({
    backgroundColor: 'var(--color-p3)',
    color: 'var(--color-p1)',
    padding: '0 40px',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    borderTop: '1px solid rgb(78, 78, 78)',
    // marginTop: '20px',
});

const FooterSection = styled(Box)({
    flex: 1,
    minWidth: '200px',
    margin: '10px',
});

const FooterHeading = styled(Typography)({
    fontFamily: 'var(--font-p1)',
    fontWeight: 'bold',
    fontSize: '20px',
    marginBottom: '15px',
    borderBottom: 'var(--color-p1) 1px solid',
    paddingBottom: '5px',
});

const FooterList = styled(List)({
    padding: 0,
});

const FooterItem = styled(ListItem)({
    fontFamily: 'var(--font-p1)',
    display: 'flex',
    alignItems: 'center',
    margin: '8px 0',
    cursor: 'pointer',
    padding: '5px 10px',
    transition: 'background-color 0.2s, color 0.3s',
    color: 'var(--color-p1)',
    width: 'fit-content',
    borderRadius: '25px',
    '&:hover': {
        color: 'var(--color-p4)',
        backgroundColor: 'hsla(0, 0%, 11%, 0.426)',
        textDecoration: 'none',
    },
});

const AddressItem = ({ address, href }) => {
    return (
        <ListItem
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                fontFamily: 'var(--font-p1)',
                display: 'flex',
                alignItems: 'center',
                margin: '8px 0',
                padding: '5px 10px',
                cursor: 'pointer',
                width: 'fit-content',
                borderRadius: '25px',
                textDecoration: 'none',
                color: 'var(--color-p1)',
                '&:hover': {
                    color: 'var(--color-p4)',
                    backgroundColor: 'transparent',
                    textDecoration: 'none',
                },
            }}
        >
            <Typography variant="body2" fontFamily={'var(--font-p1)'}>{address}</Typography>
        </ListItem>
    );
};

const FooterItemLink = styled(Link)({
    textDecoration: 'none',
    color: 'var(--color-p1)',
    '&:hover': {
        color: 'var(--color-p4)',
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
                            <FooterItemLink to="/skillmate/about">About</FooterItemLink>
                        </FooterItem>
                        <FooterItem>
                            <FooterItemLink to="/skillmate/what-we-offer">What We Offer</FooterItemLink>
                        </FooterItem>
                        <FooterItem>
                            {/* <FooterItemLink to="/why-skillmate">Why SkillMate?</FooterItemLink> */}
                        </FooterItem>
                    </FooterList>
                    <FooterList>
                        <AddressItem
                            address="JQ4F+GM3, Pawar Nagar-3, Opposite of Sonai Mangal Karyalay, Thergaon, Wakad, Pimpri-Chinchwad, Maharashtra 411033"
                            href="https://www.google.com/maps/place/GBM+SoftTech/@18.6062625,73.771597,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2b9002bcfefd9:0x50c3f8246b26d5bf!8m2!3d18.6062625!4d73.7741719!16s%2Fg%2F11vr73l09p?entry=ttu&g_ep=EgoyMDI1MDIyNS4wIKXMDSoASAFQAw%3D%3D"
                        />
                    </FooterList>
                </FooterSection>
            </FooterContainer>
            <CompanySignature />
        </>
    );
}

export default Footer;
