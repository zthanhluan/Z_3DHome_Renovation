import React, { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { FaEnvelope, FaTrash } from 'react-icons/fa';
import './Designerpage.css'
import { NavLink } from 'react-router-dom';
import UseAuth from './UseAuth';
function Designer() {
  
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, "contact-form-submissions"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSubmissions(data);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const db = getFirestore();
    await deleteDoc(doc(db, "contact-form-submissions", id));
  }

  const handleReply = (email, message) => {
    const subject = encodeURIComponent("RE: Contact Form Submission");
    const body = encodeURIComponent(`Hi,\n\n${message}\n\nBest regards,\nDesigner`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

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
    <div className="admin-container">
      <h2>Contact Form For Admin</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead >
        <tbody >
          {submissions.map((submission) => (
            <tr key={submission.id} >
              <td>{submission.name}</td>
              <td>{submission.email}</td>
              <td>{submission.phone}</td>
              <td>{submission.message}</td>
              <td>
                <button className="adminbutton" onClick={() => handleReply(submission.email, submission.message)}>
                  <FaEnvelope />
                  <span style={{marginLeft:"7px"}}>Reply</span>
                </button>
                <button className="adminbutton adminbutton-cancel" onClick={() => handleDelete(submission.id)}>
                  <FaTrash />
                  <span style={{marginLeft:"px"}}>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Designer;