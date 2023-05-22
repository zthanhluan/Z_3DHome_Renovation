import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import './Admin.css';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FaTrashAlt, FaEdit, FaSave, FaBan } from 'react-icons/fa';

const AdminPage = () => {
  const [userData, setUserData] = useState([]);
  const [editData, setEditData] = useState(null);

  // Fetch user data from Firestore
  const fetchUserData = async () => {
    const userCollection = collection(db, 'users');
    const userSnapshot = await getDocs(userCollection);
    const userList = userSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setUserData(userList);
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  // Delete user data from Firestore
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUserData();
  }

  // Update user data in Firestore
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { id, email, password, phoneNumber } = editData;
    await updateDoc(doc(db, "users", id), { email, password, phoneNumber });
    setEditData(null);
    fetchUserData();
  }

  // Set edit data state variable
  const handleEdit = (user) => {
    setEditData(user);
  }

  return (
    <div className="adminportal">
      <h1 className="adminpage">Admin Page</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <button className="adminbutton1 adminbutton1-delete" onClick={() => handleDelete(user.id)}><FaTrashAlt /></button>
                <button className="adminbutton1 adminbutton1-edit" onClick={() => handleEdit(user)}><FaEdit /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editData && (
        <form className="adminform" onSubmit={handleUpdate}>
          <label className='formlabel'>Email:</label>
          <input className='forminput' type="email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })}  style={{width:"30rem"}} />

          <label className='formlabel'>Password:</label>
          <input className='forminput' type="password" value={editData.password} onChange={(e) => setEditData({ ...editData, password: e.target.value })}  style={{width:"30rem"}} />

          <label className='formlabel'>Phone Number:</label>
          <input className='forminput' type="tel" value={editData.phoneNumber} onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}  style={{width:"30rem"}} />

          <div className="button-container">
            <button className="adminbutton1 adminbutton1-save"><FaSave /> Save Changes</button>
            <button className="adminbutton1 adminbutton1-cancel" onClick={() => setEditData(null)}><FaBan /> Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}



export default AdminPage;