import React from 'react';
import './Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="social-media-icons">
                    <Link to="https://www.instagram.com/_ashish.tomar_/" target="_blank" rel="noopener noreferrer"><InstagramIcon /></Link>
                    <Link to="https://www.linkedin.com/in/atomar300" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></Link>
                    <Link to="https://github.com/atomar300" target="_blank" rel="noopener noreferrer"><GitHubIcon /></Link>
                </div>
            </div>
            <div className="footer-text">
                <p>Copyrights &copy; 2024 Ashish Tomar</p>
            </div>
        </footer>
    );
};

export default Footer;
