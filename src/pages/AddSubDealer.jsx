import React, { useState } from 'react';

const AddSubDealerForm = () => {
  // State for User Form
  const [userData, setUserData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
  });

  // Handle changes in User Form
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submit for User
  const handleUserSubmit = (e) => {
    e.preventDefault();
    // In real scenario, you would send this data to the server
    console.log('User Added:', userData);
    alert('User Added Successfully');
    setUserData({ userName: '', userEmail: '', userPhone: '' });
  };

  return (
    <div className="container">
      <h2>Add Sub-Dealer User</h2>

      {/* User Form */}
      <div className="my-4">
        <h3>Add User</h3>
        <form onSubmit={handleUserSubmit}>
          <div className="mb-3">
            <label>User Name</label>
            <input
              type="text"
              name="userName"
              value={userData.userName}
              onChange={handleUserChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>User Email</label>
            <input
              type="email"
              name="userEmail"
              value={userData.userEmail}
              onChange={handleUserChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>User Phone</label>
            <input
              type="tel"
              name="userPhone"
              value={userData.userPhone}
              onChange={handleUserChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubDealerForm;
