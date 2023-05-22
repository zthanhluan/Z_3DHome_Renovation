
import React, { useState } from 'react';
import './ForgotPassword.css';
import forgottenPassword from '../Images/forgottenPassword.png';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [resetMethod, setResetMethod] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your code for handling the form submission goes here
  }

  return (
    <div className="ForgottenPicbox">
    <img className="Forgetpic" src={forgottenPassword} alt="forgetPassword"  />
    <div className='container3'>
      <div className="forgot-password-container">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* <label htmlFor="username">Username</label> */}
            <input
              type="text"
              placeholder="User Name"
              id="username"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="phone">Phone Number</label> */}
            <input
              type="tel"
              placeholder="Phone Number"
              id="phone"
              name="phone"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reset-method">Reset via:</label>
            <select
              id="reset-method"
              name="reset-method"
              value={resetMethod}
              onChange={(event) => setResetMethod(event.target.value)}
              className="form-control"
              required
            >
              <option value="">Select a reset method</option>
              <option value="email">Email</option>
              {/* <option value="phone">Phone</option> */}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Reset Password</button>
        </form>
        <p><a href="/Register">Remember your password?</a></p>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;