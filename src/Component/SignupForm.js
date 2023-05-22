import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, db, signInWithGoogle } from "./firebase";
import "./SignupForm.css";
import showPasswordIcon from '../Images/show_password.png';
import hidePasswordIcon from '../Images/hide_password.png';
import { doc, setDoc } from "firebase/firestore"; 
import style from "./SignupForm.css";
import register from '../Images/register.png';


const SignupForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // const passwordValue = event.target.value;
    // setPassword(passwordValue);
    setPasswordStrength(checkPasswordStrength(event.target.value));
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Logic to submit sign-up information
    if ((!email) || (!password) || (!phoneNumber)) {
      setErrorMsg("Fill all fields");
      return;
    }
  
    setErrorMsg("");
    setSubmitButtonDisabled(true);
  
    // Check if password is at least 8 characters long
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      setSubmitButtonDisabled(false);
      return;
    }
  
    // Check if phone number is valid and has 11 characters
    const phoneRegex = /^\d{11,}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("Phone number must be a valid number with at least 11 digits");
      setSubmitButtonDisabled(false);
      return;
    }
  
    try {
      // Create user account in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Add user data to Firestore
      const userData = {
        email: user.email,
        password,
        phoneNumber,
      };
      alert("you have successfully registered. Please login")
      await setDoc(doc(db, "users", user.uid), userData);

  
      // Update user profile display name
      await updateProfile(user, {
        displayName: email,
      });
  
      setSubmitButtonDisabled(false);
      // navigate("/"); // Navigate to the home page
      
    } catch (err) {
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
    }
  };
  
  
  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      return;
    } else if (password.length < 8) {
      return "weak";
    } else if (
      password.match(/[A-Z]/) &&
      password.match(/[a-z]/) &&
      password.match(/[0-9]/) &&
      password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/)
    ) {
      return "strong";
    } else {
      return "medium";
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signupPicbox">
    <img className="signuppic" src={register} alt="register" />
    <div className="container0">
      <div className="sign-up-form">
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />

<div className="password-input-container" style={{ position: 'relative' }}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    name="password"
    value={password}
    onChange={handlePasswordChange}
    required
    style={{ width: '400px' }}
  />
  <button
    type="button"
    className="show-password-button"
    onClick={handleShowPassword}
    style={{
      position: 'absolute',
      right: '5px',
      top: '-17px',
      backgroundColor: 'transparent',
      border: 'none'
    }}
  >
    {showPassword ? (
      <img src={hidePasswordIcon} alt="Hide password" style={{ size: '15px', backgroundColor: 'white' }} />
    ) : (
      <img src={showPasswordIcon} alt="Show password" style={{ size: '15px', backgroundColor: 'white' }}/>
    )}
  </button>
</div>

            {passwordStrength === "weak" && (
              <div className="password-strength-message weak">
                This is a weak password.
              </div>
            )}
            {passwordStrength === "medium" && (
              <div className="password-strength-message medium">
                This is a medium password.
              </div>
            )}
            {passwordStrength === "strong" && (
              <div className="password-strength-message strong">
                This is a strong password.
              </div>
            )}

            <input
              type="tel"
              placeholder="Phone Number"
              name="phone-number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
          </div>
          <b className={style.error}>{errorMsg}</b>
          <button
            type="submit"
            onClick={handleSubmit}
            // disabled={submitButtonDisabled}
          >
            Sign Up
          </button>

          <div className="sign-up-options">
            {/* <p>Or sign up with:</p> */}
            <div className="option-buttons">
          {/* <button className="google-btn"> */}
          {/* <button onClick={signInWithGoogle}>
          <img src={google} alt="Google logo" />
            Sign in with Google
            </button> */}
          {/* </button> */}
          {/* <button className="facebook-btn"> */}
            {/* <img src={facebook} alt="Facebook logo" /> */}
          {/* </button> */}
          {/* <button className="email-btn"> */}
            {/* <img src={gmail} alt="Email logo" /> */}
          {/* </button> */}
        </div>
          </div>

          <p className="already-have-account">
            Already have an account?{" "}
            <NavLink to="/Register">Log in</NavLink>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SignupForm;
