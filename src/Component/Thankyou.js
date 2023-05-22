import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import UseAuth from './UseAuth';

const ThankyouContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 95vh;
  width: 80vh;
  margin-left:430px;
  border-radius: 30px;
  background-color: #f2f2f2;
`;

const ThankyouText = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #333;
`;

function Thankyou() {
  const loggedIn = UseAuth();

  if (loggedIn === false) {
    
    
    return <div><h1 style={{fontSize: "3rem", color: "#333", textAlign: "center", margin: "2rem"}}><u>
    Please Login First
    </u></h1>
    <NavLink to="/Register">

    <button style={{fontSize: "2rem", color: "#fff", textAlign: "center", margin: "1.5rem", marginLeft:"37rem"}}>Click here </button>
  </NavLink></div>
  
  }

  return (
    <ThankyouContainer>
      <ThankyouText>Thank you for visiting our website!</ThankyouText>
      <p style={{fontSize: "1.2rem"}}><strong><i>We appreciate your time and hope you found what you were looking for.</i></strong></p>
      <p><strong><i>Feel free to contact us if you have any suggestions.</i></strong></p>
    </ThankyouContainer>
  );
}

export default Thankyou;
