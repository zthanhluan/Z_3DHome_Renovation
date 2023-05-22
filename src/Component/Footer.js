import React, { useState, useEffect } from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';

import { FaQuestionCircle, FaEnvelope, FaStar, FaInfoCircle, FaComment, FaShareAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

function Footer() {

  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted) {
      setCookiesAccepted(true);
    }
  }, []);

  const handleCookiesAccept = () => {
    localStorage.setItem('cookiesAccepted', true);
    setCookiesAccepted(true);
    setShowPopup(false);
  };


  return (
    <footer>
      <div className="container7">
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
            <div className="footer-box-help">
              <h3><FaQuestionCircle /> Help/Contact</h3>
              <ul className="footer-links">
                {/* <li><a href="#"><FaEnvelope /> Contact Us</a></li> */}
                <li><NavLink to="/Contact" ><FaEnvelope />
                
                Contact Us</NavLink></li>
                <li><a href="#"><FaStar /> Support</a></li>
                <li><a href="#"><FaInfoCircle /> FAQ</a></li>
                <li><NavLink to="/Feedback" ><FaComment />
                
                Feedback</NavLink></li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
            <div className="footer-box-about" >
              <h3><FaInfoCircle /> About Us</h3>
              <p style={{marginLeft: '-15.5rem'}}>We are a company that specializes in <br/> creating  modern and responsive web <br/>applications. Our team  of experienced <br/>  developers is dedicated to delivering <br/> high-quality products that exceed our <br/>clients' expectations.</p>
            </div>
          </div>
          <div className="col-md-12 col-lg-4">
            <div className="footer-box-follow">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#"><FaFacebookF className="icon-color-facebook" /></a>
                <a href="#"><FaTwitter className="icon-color-twitter" /></a>
                <a href="#"><FaInstagram className="icon-color-instagram" /></a>
                <a href="#"><FaLinkedinIn className="icon-color-linkedin" /></a>
                <a href="#"><FaYoutube className="icon-color-youtube" /></a>
              </div>
              <div className="feedback-icons">
             <NavLink to ="/Feedback" ><FaComment /> Leave Feedback </NavLink> 
              </div>

              
            </div>
            
          </div>

        </div>
        <div className='footerCookies'>
     
      <div className="col-md-6" style={{ alignItems: 'center', color: '#555', marginLeft: '-3.5rem' }}>
        {cookiesAccepted ? (
          <p>We use cookies to ensure you get the best experience on our website.</p>
        ) : (
          <p>
            This website uses cookies to improve your experience.{' '}
            <button className="footer-cookies" onClick={handleCookiesAccept}>
              Accept
            </button>
          </p>
        )}
      </div>
      <div className="col-md-6 text-right" style={{marginTop: '-1rem'}}>
        <p> Copyright &copy; 2023 My Company. All rights reserved.
          <a href="/terms-of-use" target="_blank">Terms of Use</a> | 
          <a href="/privacy-policy" target="_blank">Privacy Policy</a>.
        </p>
      </div>
    </div>
      </div>
      
    </footer>
  );
}

export default Footer;
