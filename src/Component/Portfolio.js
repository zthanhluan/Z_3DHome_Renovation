import React, { useState } from "react";
import UseAuth from "./UseAuth";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { db } from "./firebase";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 40px;
    text-align: center;
  }
`;
const TemplateWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > * {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
const Template = styled.div`
  width: calc((100% / 3) - 15px);
  height: 450px;
  padding: 20px;
  border-radius: 30px;
  cursor: pointer;
  position: relative;
  margin-bottom: 20px;
  margin-right: 20px;

  &:nth-child(3n) {
    margin-right: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 10px white;

    .template-details {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  img {
    width: 18.5rem;
    height: 370px;
    border-radius: 10px;
    border: 3px solid #f0f0f0;
    box-shadow: 0px 6px 9px black;
    margin-bottom: 0rem;
    margin-left: -1rem;
  }

  .template-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: -70px;
    left: 0;
    right: 0;

    opacity: 0;
    transform: translateY(20px);
    transition: all 0.2s ease-in-out;

    button {
      background-color: #f0f0f0;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin-top: 10px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: #dcdcdc;
      }
    }
  }

  h2 {
    font-size: 1.8rem;
    text-align: center;
    margin-top: 20px;
  }
`;



const Project = ({ id, title, imageUrl, onClose }) => {
  const handleDownload = async () => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const extension = blob.type.split("/")[1];
    const filename = `${title}.${extension}`;

    const handle = await window.showSaveFilePicker({
      suggestedName: filename,
      types: [
        {
          description: "Image file",
          accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif"],
          },
        },
      ],
    });

    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();

    window.alert("Download successful");

    // Save download operation to Firestore
    const operation = {
      type: "download",
      project: { id, title, imageUrl },
      timestamp: new Date(),
    };
    await db.collection("operations").add(operation);
  };

  
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{ maxWidth: "100%", maxHeight: "calc(100vh - 100px)" }}
        />
        <h2>{title}</h2>
        <p>Project ID: {id}</p>
        <button onClick={handleDownload}>Download</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};



const Portfolio = () => {
  const templates = [
    {
      id: 1,
      title: "Project 1",
      imageUrl:
      "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      title: "Project 2",
      imageUrl:
        "https://images.pexels.com/photos/90319/pexels-photo-90319.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      title:"Project 3",
      imageUrl:
        "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      title:"Project 4",
      imageUrl:
        "https://images.pexels.com/photos/271695/pexels-photo-271695.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      title:"Project 5",
      imageUrl:
        "https://images.pexels.com/photos/2416932/pexels-photo-2416932.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 6,
      title: "Project 6",
      imageUrl:
        "https://images.pexels.com/photos/1543439/pexels-photo-1543439.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 7,
      title: "Project 7",
      imageUrl:
        "https://images.pexels.com/photos/2030119/pexels-photo-2030119.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 8,
      title: "Project 8",
      imageUrl:
        "https://images.pexels.com/photos/2416931/pexels-photo-2416931.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 9,
      title: "Project 9",
      imageUrl:
        "https://images.pexels.com/photos/3209036/pexels-photo-3209036.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 10,
      title: "Project 10",
      imageUrl:
        "https://images.pexels.com/photos/3753435/pexels-photo-3753435.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 11,
      title: "Project 11",
      imageUrl:
      "https://images.pexels.com/photos/2416931/pexels-photo-2416931.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 12,
      title: "Project 12",
      imageUrl:
        "https://images.pexels.com/photos/3753435/pexels-photo-3753435.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 13,
      title: "Project 13",
      imageUrl:
        "https://images.pexels.com/photos/3753435/pexels-photo-3753435.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 14,
      title: "Project 14",
      imageUrl:
      "https://images.pexels.com/photos/90319/pexels-photo-90319.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 15,
      title: "Project 15",
      imageUrl:
      "https://images.pexels.com/photos/2030119/pexels-photo-2030119.jpeg?auto=compress&cs=tinysrgb&w=600",
    }
  ];
  
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleCloseProject = () => {
    setSelectedTemplate(null);
  };

  // Save template open operation to Firestore
  const handleOpenTemplate = async (template) => {
    const operation = {
      type: "open",
      project: { id: template.id, title: template.title, imageUrl: template.imageUrl },
      timestamp: new Date(),
    };
    await db.collection("operations").add(operation);
    setSelectedTemplate(template);
  };


  return (
    <Container>
      <h1>Templates</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {templates.map((template) => (
          <Template
            key={template.id}
            onClick={() => handleTemplateClick(template)}
          >
            <img src={template.imageUrl} alt={template.title} />
            <button style={{width: "8rem", marginLeft:"3rem"}}>Open</button>
          </Template>
        ))}
      </div>
      {selectedTemplate && (
        <Project
          id={selectedTemplate.id}
          title={selectedTemplate.title}
          imageUrl={selectedTemplate.imageUrl}
          onClose={handleCloseProject}
        />
      )}
    </Container>
  );
};

export default Portfolio;