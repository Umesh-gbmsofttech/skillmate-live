import React from 'react';
import logo from '../../assets/skillmate.jpg'
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import linkedid from '../../assets/linkedin.png'
import './Footer.css';
import CompanySignature from './CompanySignature';

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer-section get-in-touch" id="get-in-touch">
                    <h4 className="footer-heading">Get in touch</h4>
                    <ul className="footer-list">
                        <a href="https://www.instagram.com/_skillmate/" target='_blank'>
                            <li className="footer-item">
                                <img src={instagram} alt="Instagram Logo" />
                                Instagram
                            </li>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61563688179860" target='_blank'>
                            <li className="footer-item">
                                <img src={facebook} alt="Facebook Logo" />
                                Facebook
                            </li>
                        </a>
                        <a href="https://www.linkedin.com/company/104900751/admin/dashboard/" target='_blank'>
                            <li className="footer-item">
                                <img src={linkedid} alt="LinkedIn Logo" />
                                LinkedIn
                            </li>
                        </a>
                    </ul>

                </div>
                <div className="footer-section use-cases" id="use-cases">
                    <h4 className="footer-heading">Career</h4>
                    <ul className="footer-list">
                        <li className="footer-item">UI Design</li>
                        <li className="footer-item">Wireframing</li>
                        <li className="footer-item">Prototyping</li>
                        <li className="footer-item">Team Collaboration</li>
                    </ul>
                </div>
                <div className="footer-section explore" id="explore">
                    <h4 className="footer-heading">Explore</h4>
                    <ul className="footer-list">
                        <li className="footer-item">Design Systems</li>
                        <li className="footer-item">Collaboration Features</li>
                        <li className="footer-item">Figma</li>
                    </ul>
                </div>
                <div className="footer-section resources" id="resources">
                    <h4 className="footer-heading">Resources</h4>
                    <ul className="footer-list">
                        <li className="footer-item">Blog</li>
                        <li className="footer-item">Support</li>
                        <li className="footer-item">Developer Tools</li>
                    </ul>
                </div>
            </footer>
            <CompanySignature />
        </>
    );
}

export default Footer;
