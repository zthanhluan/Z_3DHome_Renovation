import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './contactpage.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import profile1 from '../Images/profile1.jpeg';
import profile2 from '../Images/profile2.jpeg';
import profile3 from '../Images/profile3.jpg';

import { getFirestore, collection, addDoc } from "firebase/firestore";
import './contactpage.css';

function HireDesigner() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const db = getFirestore();
    try {
      await addDoc(collection(db, "contact-form-submissions"), {
        name: name,
        email: email,
        phone: phone,
        message: message
      });
      alert('Form submitted successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  return (
    <div>
      <div className="contact-us-container">
      <div className="hire-designer">
  <div className="contact-form-container" style={{width: "24rem", height: "35rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <h2 style={{marginBottom: "32rem", alignItems: "center", marginRight:"1rem", marginTop: "48px"}} >Contact</h2>
    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
      <div className="input-container" style={{marginBottom: "-10px", marginLeft: "-100px"}}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" required value={name} onChange={(e) => setName(e.target.value)} style={{width: "300px", height: "30px"}} />
      </div>
      <div className="input-container" style={{marginBottom: "-10px", marginLeft: "-100px"}}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{width: "300px", height: "30px"}} />
      </div>
      <div className="input-container" style={{marginBottom: "-10px", marginLeft: "-100px"}}>
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{width: "300px", height: "30px"}} />
      </div>
      <div className="input-container" style={{marginBottom: "-10px", marginLeft: "-100px"}}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Enter your message" required value={message} onChange={(e) => setMessage(e.target.value)} style={{width: "300px", height: "100px"}}></textarea>
      </div>
      <button type="submit" style={{width: "200px", height: "40px", marginLeft: "-100px"}} >Send </button>
    </form>
  </div>


  <div className="contact-details-container" style={{marginBottom: "-100px", marginLeft: "200px", width:"400px"}}>
  <h2>Contact Details</h2>
  <div className="contact-details"  style={{marginBottom: "-10px", marginTop:"-10px"}}>
    <h5><i><strong>Z-3D Room Renovation</strong></i></h5>
    <div className="contact-detail"  style={{marginBottom: "-10px", marginTop:"-10px"}}>
    
      <FaPhone className="contact-icon"  />
      <p>+92 3038292098</p>
    </div>
    <div className="contact-detail"  style={{marginBottom: "-10px", marginTop:"-10px"}}>
      <FaEnvelope className="contact-icon"  />
      <p>RoomDesigner@example.com</p>
    </div>
    <div className="contact-detail"  >
      <FaMapMarkerAlt className="contact-icon" />
      <p>266 Doi Can, Ha Noi, Viet Nam</p>
      
    </div>
  </div>
</div>


        </div>

      </div>


      <Carousel activeIndex={index} onSelect={handleSelect} style={{marginTop :"-300px"}}>
      <Carousel.Item>
        <div className="carousel-item-container">
          <img
            className="d-block w-100 carousel-image"
            src={profile1}
            alt="First slide"
            
          />
          <div className="carousel-item-details">
            <h3>John Doe</h3>
            <p>Web Designer</p>
            <p>Experience: 5 years</p>
            <p>Email: john.doe@example.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-item-container">
          <img
            className="d-block w-100 carousel-image"
            src={profile3}
            alt="Second slide"
          />
          <div className="carousel-item-details">
            <h3>Muskan</h3>
            <p>UI UX Designer</p>
            <p>Experience: 9 years</p>
            <p>Email: doe@example.com</p>
            <p>Phone: +1 (123) 234-4567</p>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-item-container">
          <img
            className="d-block w-100 carousel-image"
            src={profile2}
            alt="Third slide"
          />
          <div className="carousel-item-details">
            <h3>John Doe</h3>
            <p>Web Designer</p>
            <p>Experience: 4 years</p>
            <p>Email: muskan@example.com</p>
            <p>Phone: +1 (123) 234-4567</p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>


</div>
    
  );
}

export default HireDesigner;
