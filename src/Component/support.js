import React from 'react';
import './support.css';
import { NavLink }  from  'react-router-dom';

const SupportPage = () => {
  return (
    <div className="support-page">
      <h1 className="support-title">Support</h1>
      <div className="support-content">
        <h2>Contact Us</h2>
        <p>
          If you need any assistance or have any questions, please don't hesitate to reach out to our support team. We're here to help!
        </p>

        <h2>Support Hours</h2>
        <p>
          Our support team is available 24/7 in your service. We strive to respond to all inquiries within 24 hours.
        </p>

        <h2>Contact Information</h2>
        <p>
          Phone: <span className="contact-info">123-456-7890</span><br />
          Email: <span className="contact-info">3DroomRenovationsupport@yourwebsite.com</span><br />
        <i> Or you can <NavLink to="/contactpage">Contact us</NavLink> for any help!</i>
        </p>

        <h2>Frequently Asked Questions</h2>
        <p>
          Before contacting support, you may find the answer to your question in our <a href="/faq" className="faq-link">FAQ</a> section.
        </p>
      </div>
    </div>
  );
};

export default SupportPage;
