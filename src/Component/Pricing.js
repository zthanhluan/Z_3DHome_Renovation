import React from 'react';
import { FaCheck, FaCreditCard } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import './pricing.css'; // import the CSS file

function PricingPage() {
  const freeFeatures = [
    'Basic 3D modeling',
    'Limited texture library',
    'No advanced rendering',
    'Community support',
  ];

  const paidFeatures = [
    'Advanced 3D modeling',
    'Full texture library',
    'Advanced rendering',
    'Dedicated support',
    'Payment via credit card',
    'Monthly billing',
  ];

  const handlePayment = (plan) => {
    // handle payment logic here
  };

  return (
    <div>
      <h1>Pricing</h1>
      <div className="pricing-cards">
        <div className="pricing-card free">
          <h2>Free</h2>
          <ul>
            {freeFeatures.map((feature) => (
              <li key={feature}>
                <FaCheck /> {feature}
              </li>
            ))}
          </ul>
          <button onClick={() => handlePayment('free')}>Subscribe</button>
        </div>
        <div className="pricing-card paid">
          <h2>Paid</h2>
          <p className="price">$9.99/month</p>
          <ul>
            {paidFeatures.map((feature) => (
              <li key={feature}>
                {feature === 'Payment via credit card' ? (
                  <FaCreditCard />
                ) : (
                  <FaCheck />
                )}{' '}
                {feature}
              </li>
            ))}
          </ul>
          <NavLink to="/Paymnet"> <button onClick={() => handlePayment('paid')}>Subscribe</button></NavLink>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
