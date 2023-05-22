import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 40px;
    text-align: center;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const VideoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const VideoContainer = styled.div`
  flex-basis: calc(33.33% - 20px);
  margin-bottom: 20px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0px 9px 10px black;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const VideoTitle = styled.h2`
  padding: 10px;
  background-color: #fff;
  text-align: center;
  height:100px;
`;

const VideoPlayer = styled.video`
  display: block;
  width: 100%;
`;

const Tutorial = () => {
  const tutorials = [    {      id: 1,      title: 'How to Register in website',  
      url: 'https://www.example.com/videos/how-to-use-react.mp4',    },  
        {      id: 2,      title: 'How to Design Room',      url: 'https://www.example.com/videos/react-hooks-tutorial.mp4',    }, 
         {      id: 3,      title: 'How to Download Model',      url: 'https://www.example.com/videos/intro-to-css.mp4',    },  
         //  {      id: 4,      title: 'Responsive design',      url: 'https://www.example.com/videos/responsive-design.mp4',    }, 
           ];

  return (
    <Container>
      <h1>Tutorials</h1>
      <VideoList>
        {tutorials.map((tutorial) => (
          <VideoContainer key={tutorial.id}>
            <VideoPlayer src={tutorial.url} type="video/mp4" controls />
            <VideoTitle>{tutorial.title}</VideoTitle>
          </VideoContainer>
        ))}
      </VideoList>
    </Container>
  );
};

export default Tutorial;
