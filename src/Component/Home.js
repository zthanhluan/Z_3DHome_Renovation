import React from 'react';
import './HomePage.css';
import { NavLink, useNavigate } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import UseAuth from './UseAuth';
import Room1 from '../Images/Room1.jpg';
import Room2 from '../Images/Room2.jpg';
import Room3 from '../Images/Room3.jpg';
import droom_home from '../Images/droom_home.png';
import backgroundVideo from '../video/backgrounvideo.mp4';
import roomslider1 from '../Images/room-slider1.png';
import roomslider2 from '../Images/room-slider2.png';
import roomslider3 from '../Images/room-slider3.png';
import roomslider4 from '../Images/room-slider4.png';
import roomslider5 from '../Images/room-slider5.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';



const Home = () => {
  const navigate = useNavigate();
  let loggedIn = UseAuth();

  const handleGetStarted = () => {
    if (!loggedIn) {
      alert(loggedIn);
      navigate('/register'); // Navigate to the register page if the user is not logged in
    } 
    else {
      alert(loggedIn)
      navigate('/options_design'); // Navigate to the options_design page if the user is logged in
    }
  };

  return (
    <div className="home-page">
    <video id="video-background" autoPlay loop muted playsInline>
    <source src={backgroundVideo} type="video/mp4" />
  </video>
  <div className="left-side">
  <h2 className="title"  >We are Creative</h2>
  <p className="paragraph">Transform your room with our 3D room design services.</p>
   <button className="get-started-btn" onClick={handleGetStarted}>
        Get Started
      </button>
</div>
<div className="sliderportion">
  <div className="slider-header">
    <h2>Discover Your Perfect Room</h2>
    <p>Design your dream room with us</p>
  </div>
  <Carousel className="room-carousel">
    <Carousel.Item>
      <img
        className="d-block w-100 "
        src={roomslider1}
        alt="Room 1"
      />
      <Carousel.Caption>
        <h3>Room Components</h3>
        <p>Design your room with the best components.</p>
        <ul>
          <li>High-quality furniture</li>
          <li>Luxury bedding and linens</li>
          <li>State-of-the-art technology</li>
        </ul>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
  <img
    className="d-block w-100 "
    src={roomslider2}
    alt="Room 2"
  />
  <Carousel.Caption>
    <h3>Room Shape</h3>
    <p>Find the perfect shape for your room.</p>
    <ul>
      <li>Spacious and open design</li>
      <li>Flexible layout options</li>
      <li>Customizable to your needs</li>
    </ul>
  </Carousel.Caption>
</Carousel.Item>



<Carousel.Item>
  <img
    className="d-block w-100 "
    src={roomslider3}
    alt="Room 3"
  />
  <Carousel.Caption>
    <h3>Room View</h3>
    <p>See your room from every angle.</p>
    <ul>
      <li>Spectacular ocean or city views</li>
      <li>Large windows for natural light</li>
      <li>Balcony or terrace options</li>
    </ul>
  </Carousel.Caption>
</Carousel.Item>



<Carousel.Item>
  <img
    className="d-block w-100"
    src={roomslider4}
    alt="Room 4"
  />
  <Carousel.Caption>
    <h3>Room Layout</h3>
    <p>Find the perfect layout for your room.</p>
    <ul>
      <li>Maximize space with smart design</li>
      <li>Personalized to your taste and needs</li>
      <li>Stylish and functional furniture options</li>
    </ul>
  </Carousel.Caption>
</Carousel.Item>




<Carousel.Item>
  <img
    className="d-block w-100"
    src={roomslider5}
    alt="Room 5"
  />
  <Carousel.Caption>
    <h3>Room Decor</h3>
    <p>Make your room a reflection of your personality.</p>
    <ul>
      <li>Choose from a wide variety of decor options</li>
      <li>Create a cozy and welcoming atmosphere</li>
      <li>Add unique touches to make it truly yours</li>
    </ul>
  </Carousel.Caption>
</Carousel.Item>
{/* Add more slides here */}
</Carousel>
</div>

      <div className="below-side">
        <div className="room-container"  >

          <img
            src={Room1}
            alt="Room 1"
            className="room-image"
          />
          <div className="room-overlay">
            <h3 className="room-name"> Room Components</h3>
            <button className="room-button">View Details</button>
          </div>
        </div>  <div className="room-container">
          <img
            src={Room2}
            alt="Room 2"
            className="room-image"
          />
          <div className="room-overlay">
            <h3 className="room-name">Room shape</h3>
            <button className="room-button">View Details</button>
          </div>
        </div>  <div className="room-container">
          <img
            src={Room3}
            alt="Room 3"
            className="room-image"
          />
          <div className="room-overlay">
            <h3 className="room-name">Room View</h3>
            <button className="room-button">View Details</button>
          </div>
        </div>
      


          
 </div>



    </div>
  );
};

export default Home;