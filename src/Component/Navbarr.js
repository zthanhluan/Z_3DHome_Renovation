import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../Images/3droomlogo.png';
import profile_icon from '../Images/profile_icon.png';
import user from '../Images/user.png';
import edit from '../Images/edit.png';
import help from '../Images/help.png';
import setting from '../Images/setting.png';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, signInWithGoogle } from "./firebase";
import logout from '../Images/logout.png';


import $ from 'jquery';
import './Listdesign.css';

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const handleLogoClick = () => {
    setClicked(true);
    window.location.reload();
  };

  const handleLogout = (event) => {
    event.preventDefault();

    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleDropdownToggle() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleSelectOption(option) {
    // Handle the selected option
    switch (option) {
      case 'user':
        // Handle selecting the "Profile" option
        break;
      case 'edit':
        // Handle selecting the "Edit Profile" option
        break;
      case 'help':
        // Handle selecting the "Help" option
        break;
      case 'settings':
        // Handle selecting the "Settings" option
        break;
      case 'logout':
        // Handle selecting the "Logout" option
        break;
      default:
        break;
    }
    setIsDropdownOpen(false); // Close the dropdown
  }

  function animation() {
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top": itemPosNewAnimTop.top + "px",
      "left": itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click", "li", function (e) {
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top": itemPosNewAnimTop.top + "px",
        "left": itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {
    animation();
    $(window).on('resize', function () {
      setTimeout(function () { animation(); }, 500);
    });
  }, []);


 

  return (
    <div className='main-section' style={{ position: 'sticky', top: 0 }}>
      <nav className="navbar navbar-expand-lg navbar-mainbg">

      <NavLink className="navbar-brand navbar-logo" to="/"  onClick={handleLogoClick}>
        <img className={`logo ${clicked ? 'clicked' : ''}`} src={logo} alt='logo' />
      </NavLink>
    
      <button 
        className="navbar-toggler"
        onClick={ function(){
          setTimeout(function(){ animation(); });
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>
 
      <div 
        className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" >
                <i 
                className="fas fa-tachometer-alt">
                </i>Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" >
                <i 
                className="far fa-address-book">
                </i>Contact
              </NavLink> 
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/pricing" >
                <i 
                className="far fa-clone">
                </i>Pricing
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink className="nav-link" to="/portfolio" >
                <i 
                className="far fa-chart-bar">
                </i> Portfolio
              </NavLink>
            </li>
          
            <li className="nav-item">
              <NavLink className="nav-link" to="/tutorial" >
                <i 
                className="far fa-copy">
                </i>Tutorial
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink className="nav-link" to="/register" >
                <i 
                className="far fa-copy">
                </i>Register
              </NavLink>
            </li>




     

        </ul>
        
      </div>

<div>
          <img className="icon" src={profile_icon} alt='profile icon' onClick={handleDropdownToggle}/>
      

        <div className={isDropdownOpen ? "dropdown-menu show" : "dropdown-menu"}>
          <button className="dropdown-item"  onClick={() => handleSelectOption('user')}>
          <img className="item-icon1" src={user} alt="profile icon" /> Profile
          </button>
          <button className="dropdown-item"   onClick={() => handleSelectOption('edit_profile')}>
          <img className="item-icon1" src={edit} alt="edit icon" /> Edit Profile
          </button>
          <button className="dropdown-item"  onClick={() => handleSelectOption('help')}>
          <img className="item-icon1" src={help} alt="help icon" /> Help
          </button>
          <button className="dropdown-item"  onClick={() => handleSelectOption('settings')}>
          <img className="item-icon1" src={setting} alt="settings icon" /> Settings
          </button>
          <NavLink to="/register">
  <button className="dropdown-item" onClick={handleLogout}>
    <img className="item-icon1" src={logout} alt="logout icon" />
    Logout
  </button>
</NavLink>
        </div>
        </div>
  </nav>
  <li className="nav-item1">
              <NavLink className="nav-link1" to="/footer" >
                
              </NavLink>
            </li>

  </div>



  )




}
export default Navbar;