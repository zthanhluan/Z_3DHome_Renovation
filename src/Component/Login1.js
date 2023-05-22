import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, signInWithGoogle } from "./firebase";
import style from "./Login1.css";
import google from '../Images/google.png';
import { NavLink, useNavigate } from "react-router-dom";
import login from '../Images/login.png';
import showPasswordIcon from '../Images/show_password.png';
import hidePasswordIcon from '../Images/hide_password.png';

const Login1 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const handleLogout = (event) => {
  //   event.preventDefault();

  //   signOut(auth)
  //     .then(() => {
  //       setIsLoggedIn(false);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    // logic to submit login information
    if (!email || !password) {
      setErrorMsg("Please fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);

     // Check if the email and password match the condition
  if (email === "Muskan1234@gmail.com" && password === "muskan1234") {
    setIsLoggedIn(true);
    navigate("/Admin"); // Redirect to "/page" route
    setSubmitButtonDisabled(false);
    return;
  }
  else{
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await signInWithGoogle();
  //     // alert("Sign in with Google successful! 11");
  //     setIsLoggedIn(true);
  //     // alert("Sign in with Google successful! 22");
  //     navigate("/");
  //     // alert("Sign in with Google successful! 33");
  //   } catch (error) {
  //     setErrorMsg(error.message);
  //   }
  // };

  const handleGoogleSignIn = () => {
    return signInWithGoogle()
      .then(() => {
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };
  
  

  return (
    <div className="loginPicbox">
      <img className="loginpic" src={login} alt="login" />
      <div className="containerr">
        <div className="login-form">
          {isLoggedIn ? (
            <div>
              <h1>Welcome!</h1>
              {/* <button onClick={handleLogout}>Logout</button> */}
            </div>
          ) : (
            <div>
              <h1>Login</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email"
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
                    style={{ width: '350px' }}
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
                   
                   {showPassword ? (<img src={hidePasswordIcon} alt="Hide password" style={{ size: '15px', backgroundColor: 'white' }} />
) : (
<img src={showPasswordIcon} alt="Show password" style={{ size: '15px', backgroundColor: 'white' }}/>
)}
</button>
</div>
<b className={style.error}>{errorMsg}</b>
<NavLink to="/Home">
<button
                 type="submit"
                 onClick={handleSubmit}
                 disabled={submitButtonDisabled}
               >
Login
</button>
</NavLink>
<div className="form-links1">
              <a href="/ForgotPassword">Forgot password? <br /></a>
            </div>

            <div className="sign-up-options">
              <p>Or sign up with:</p>
              <div className="option-buttons">
                <button onClick={handleGoogleSignIn}>
                  <img src={google} alt="Google logo" />
                  Sign in with Google
                </button>
              </div>
            </div>

            <div className="form-links">
              <p>
                Don't have an account?{" "}
                <a href="/SignupForm">
                  <u>Create new account</u>
                </a>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  </div>
</div>
);
};

export default Login1;