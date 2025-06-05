import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';  // Import icons from react-icons

const UserList = () => {
  const navigate = useNavigate();

  // Helper functions for masking
  const maskAadhar = (aadhar) => {
    return `XXXX-XXXX-${aadhar.slice(-4)}`;
  };

  const maskPan = (pan) => {
    return `XXXXX${pan.slice(-5)}`;
  };

  const maskBank = (account) => {
    return `XXXXXX${account.slice(-4)}`;
  };

  // Static list of users
  const users = [
    {
      id: 1,
      userPic: 'https://via.placeholder.com/150',
      name: 'John Doe',
      address: '123 Main St, City, Country',
      aadharNo: '1234-5678-1234',
      panNo: 'ABCDE1234F',
      bankAccountNo: '1234567890',
      email: 'john@example.com',
    },
    {
      id: 2,
      userPic: 'https://via.placeholder.com/150',
      name: 'Jane Smith',
      address: '456 Elm St, City, Country',
      aadharNo: '2345-6789-2345',
      panNo: 'XYZAB2345G',
      bankAccountNo: '2345678901',
      email: 'jane@example.com',
    },
    {
      id: 3,
      userPic: 'https://via.placeholder.com/150',
      name: 'Robert Brown',
      address: '789 Oak St, City, Country',
      aadharNo: '3456-7890-3456',
      panNo: 'PQRST3456H',
      bankAccountNo: '3456789012',
      email: 'robert@example.com',
    },
    {
      id: 4,
      userPic: 'https://via.placeholder.com/150',
      name: 'Lucy Green',
      address: '101 Pine St, City, Country',
      aadharNo: '4567-8901-4567',
      panNo: 'LMNOP4567I',
      bankAccountNo: '4567890123',
      email: 'lucy@example.com',
    },
    {
      id: 5,
      userPic: 'https://via.placeholder.com/150',
      name: 'Michael Black',
      address: '202 Maple St, City, Country',
      aadharNo: '5678-9012-5678',
      panNo: 'ABCDE5678J',
      bankAccountNo: '5678901234',
      email: 'michael@example.com',
    },
    {
      id: 6,
      userPic: 'https://via.placeholder.com/150',
      name: 'Emily White',
      address: '303 Birch St, City, Country',
      aadharNo: '6789-0123-6789',
      panNo: 'XYZAB6789K',
      bankAccountNo: '6789012345',
      email: 'emily@example.com',
    },
    {
      id: 7,
      userPic: 'https://via.placeholder.com/150',
      name: 'Daniel Clark',
      address: '404 Cedar St, City, Country',
      aadharNo: '7890-1234-7890',
      panNo: 'PQRST7890L',
      bankAccountNo: '7890123456',
      email: 'daniel@example.com',
    },
  ];

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      alert(`User with ID: ${id} deleted!`);
      // You can integrate delete API here
    }
  };

  const handleProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold text-primary">User List</h2>

      <table className="table table-bordered shadow p-4 bg-white rounded">
        <thead>
          <tr>
            <th>User Pic</th>
            <th>Name</th>
            <th>Address</th>
            <th>Aadhar No.</th>
            <th>PAN No.</th>
            <th>Bank Account No.</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="table-row">
              <td>
                <img
                  src={user.userPic}
                  alt="user"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleProfile(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>{maskAadhar(user.aadharNo)}</td>
              <td>{maskPan(user.panNo)}</td>
              <td>{maskBank(user.bankAccountNo)}</td>
              <td>{user.email}</td>
              <td className="d-flex justify-content-around">
                <button
                  onClick={() => handleProfile(user.id)}
                  className="btn btn-info btn-sm me-2"
                  title="View Profile"
                  style={{ backgroundColor: '#17a2b8', borderColor: '#17a2b8' }}
                >
                  <FaEye color="white" />
                </button>
                <button
                  onClick={() => handleEdit(user.id)}
                  className="btn btn-warning btn-sm me-2"
                  title="Edit"
                  style={{ backgroundColor: '#ffc107', borderColor: '#ffc107' }}
                >
                  <FaEdit color="white" />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-danger btn-sm"
                  title="Delete"
                  style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                >
                  <FaTrashAlt color="white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
