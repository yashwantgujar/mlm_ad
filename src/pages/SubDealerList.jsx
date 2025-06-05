import React, { useState } from 'react';

const SubDealerList = () => {
  // Sample data (in real use case, you would fetch this from a database or API)
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', description: 'Description of product 1', color: 'Red' },
    { id: 2, name: 'Product 2', description: 'Description of product 2', color: 'Blue' },
    { id: 3, name: 'Product 3', description: 'Description of product 3', color: 'Green' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', email: 'user1@example.com', phone: '1234567890' },
    { id: 2, name: 'User 2', email: 'user2@example.com', phone: '2345678901' },
    { id: 3, name: 'User 3', email: 'user3@example.com', phone: '3456789012' },
  ]);

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleEditProduct = (productId) => {
    // Here, you would typically open an edit form or modal
    alert(`Editing product with ID: ${productId}`);
  };

  const handleEditUser = (userId) => {
    // Here, you would typically open an edit form or modal
    alert(`Editing user with ID: ${userId}`);
  };

  const handleViewProfile = (userId) => {
    // Here, you would typically open a profile page or modal
    const user = users.find((user) => user.id === userId);
    alert(`Viewing profile of: ${user.name}`);
  };

  return (
    <div className="container">
      <h2>Sub-Dealer Products and Users</h2>

      {/* Product List */}
      <div>
        <h3>Products</h3>
        <ul className="list-group">
          {products.map((product) => (
            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{product.name}</strong> <br />
                {product.description} <br />
                Color: {product.color}
              </div>
              <div>
                <button className="btn btn-primary btn-sm" onClick={() => handleEditProduct(product.id)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* User List */}
      <div className="mt-4">
        <h3>Users</h3>
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{user.name}</strong> <br />
                {user.email} <br />
                {user.phone}
              </div>
              <div>
                <button className="btn btn-primary btn-sm" onClick={() => handleEditUser(user.id)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
                <button className="btn btn-info btn-sm ml-2" onClick={() => handleViewProfile(user.id)}>
                  View Profile
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubDealerList;
