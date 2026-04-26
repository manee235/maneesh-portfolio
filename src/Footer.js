import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/maneeshamindu', icon: 'github' },
    { name: 'Instagram', url: 'https://instagram.com/only.maneesh', icon: 'instagram' },
    { name: 'WhatsApp', url: 'https://wa.me/94759051430', icon: 'whatsapp' },
    { name: 'Email', url: 'mailto:maneeshamindu2050@outlook.com', icon: 'email' },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2 className="footer-logo">only<span className="dot">.</span>Maneesh</h2>
          <p className="footer-tagline">Where clean code meets fearless design. Building digital excellence.</p>
        </div>
        
        <div className="footer-right">
          <div className="footer-nav">
            <h3>Navigation</h3>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          
          <div className="footer-social-section">
            <h3>Socials</h3>
            <div className="footer-socials">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="footer-social-link">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Maneesh Amindu. All rights reserved.</p>
        <div className="footer-bottom-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
