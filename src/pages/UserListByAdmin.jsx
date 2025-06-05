import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const dummyUsers = [
  {
    id: 1,
    name: 'Ravi Kumar',
    email: 'ravi@example.com',
    referral1: 'REF123',
    type: 'user',
    addedUsers: [
      { id: 101, name: 'Subhash', type: 'dealer' },
      { id: 102, name: 'Amit', type: 'subdealer' },
      { id: 103, name: 'Rahul', type: 'user' },
    ],
  },
  {
    id: 2,
    name: 'Meena Sharma',
    email: 'meena@example.com',
    referral1: 'REF456',
    type: 'dealer',
    addedUsers: [],
  },
];

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const openProfile = (user) => {
    setSelectedUser(user);
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
    setSelectedUser(null);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary">👥 User List</h2>
      <table className="table table-bordered shadow-sm bg-white">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Referral Code</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.referral1}</td>
              <td>{user.type}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => openProfile(user)}
                >
                  View Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Profile Modal */}
      {selectedUser && (
        <Modal show={showProfile} onHide={closeProfile} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>👤 {selectedUser.name}'s Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Referral Code:</strong> {selectedUser.referral1}</p>
            <p><strong>Type:</strong> {selectedUser.type}</p>
            <hr />
            <h5>📋 Added Users: {selectedUser.addedUsers.length}</h5>
            <ul>
              <li>Dealers: {selectedUser.addedUsers.filter(u => u.type === 'dealer').length}</li>
              <li>Subdealers: {selectedUser.addedUsers.filter(u => u.type === 'subdealer').length}</li>
              <li>Other Users: {selectedUser.addedUsers.filter(u => u.type === 'user').length}</li>
            </ul>
            <hr />
            <h6>👥 List of Added Users:</h6>
            <ul>
              {selectedUser.addedUsers.map((u) => (
                <li key={u.id}>{u.name} ({u.type})</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeProfile}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UserList;
