import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; // Import your CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-item">
        <h3>Follow Us</h3>
        <div className="social-links">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">GitHub</span>
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">LinkedIn</span>
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 RetroRealm. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
