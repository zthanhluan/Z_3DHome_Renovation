import React, { useState } from 'react';
import  './Faq.css';
function Faq() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const questions = [
    {
      id: 1,
      question: 'What is 3D room renovation?',
      answer: '3D room renovation is a service that allows you to create a virtual 3D model of your room and experiment with different designs and furniture layouts before making any changes to your actual room.'
    },
    {
      id: 2,
      question: 'How does it work?',
      answer: 'To use our 3D room renovation service, you simply take a few photos of your room and upload them to our website. Our software will then create a 3D model of your room, which you can then customize with different furniture, decor, and color options.'
    },
    {
      id: 3,
      question: 'How much does it cost?',
      answer: 'Our 3D room renovation service is completely free to use!'
    },
    {
      id: 4,
      question: 'What if I have trouble using the service?',
      answer: 'If you have any trouble using our 3D room renovation service, please contact our customer support team for assistance.'
    }
  ];

  const handleClick = (id) => {
    if (activeQuestion === id) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(id);
    }
  }

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      {questions.map((q) => (
        <div className="faq-item" key={q.id}>
          <div className="faq-question" onClick={() => handleClick(q.id)}>
            {q.question}
            {activeQuestion === q.id ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i>}
          </div>
          {activeQuestion === q.id && (
            <div className="faq-answer">{q.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Faq;
