import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiAlertCircle } from "react-icons/fi";

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [lowStockThreshold, setLowStockThreshold] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    sold: "",
    purchasePrice: "",
    sellingPrice: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        name: "E-Bike Model A",
        stock: 12,
        sold: 88,
        purchasePrice: 30000,
        sellingPrice: 40000,
        category: "Bike",
        description: "Powerful electric bike",
      },
      {
        id: 2,
        name: "E-Bike Battery",
        stock: 3,
        sold: 97,
        purchasePrice: 8000,
        sellingPrice: 12000,
        category: "Battery",
        description: "High capacity battery",
      },
      {
        id: 3,
        name: "Controller Kit",
        stock: 0,
        sold: 120,
        purchasePrice: 1500,
        sellingPrice: 2500,
        category: "Accessories",
        description: "Smart controller for bikes",
      },
    ];
    setProducts(dummyData);
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
      stock: Number(newProduct.stock),
      sold: Number(newProduct.sold),
      purchasePrice: Number(newProduct.purchasePrice),
      sellingPrice: Number(newProduct.sellingPrice),
    };
    setProducts([...products, productToAdd]);
    setNewProduct({
      name: "",
      stock: "",
      sold: "",
      purchasePrice: "",
      sellingPrice: "",
      category: "",
      description: "",
    });
    setShowForm(false);
  };

  const totalProducts = products.length;
  const totalUnitsSold = products.reduce((acc, item) => acc + item.sold, 0);
  const totalProfit = products.reduce(
    (acc, item) => acc + item.sold * (item.sellingPrice - item.purchasePrice),
    0
  );
  const lowStockCount = products.filter((item) => item.stock <= lowStockThreshold).length;

  return (
    <div className="container my-4">
      {/* Dashboard Summary */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <p className="card-text fs-4">{totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Units Sold</h5>
              <p className="card-text fs-4">{totalUnitsSold}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Profit</h5>
              <p className="card-text fs-4 text-success">₹ {totalProfit.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Low Stock Items</h5>
              <p className="card-text fs-4 text-danger">{lowStockCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Button */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add New Product"}
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <form onSubmit={handleAddProduct} className="card p-3 mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Sold"
                value={newProduct.sold}
                onChange={(e) => setNewProduct({ ...newProduct, sold: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Purchase Price"
                value={newProduct.purchasePrice}
                onChange={(e) => setNewProduct({ ...newProduct, purchasePrice: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Selling Price"
                value={newProduct.sellingPrice}
                onChange={(e) => setNewProduct({ ...newProduct, sellingPrice: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </div>
            <div className="col-12 text-end">
              <button type="submit" className="btn btn-success">
                Add Product
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Inventory Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr className="text-center">
              <th>Product Name</th>
              <th>Stock</th>
              <th>Sold</th>
              <th>Purchase Price</th>
              <th>Selling Price</th>
              <th>Profit/Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              const isLowStock = item.stock <= lowStockThreshold;
              return (
                <tr key={item.id} className="text-center align-middle">
                  <td className="d-flex justify-content-center align-items-center gap-2">
                    {item.name}
                    {isLowStock && <FiAlertCircle className="text-danger" title="Low Stock" />}
                  </td>
                  <td className={isLowStock ? "text-danger fw-bold" : ""}>
                    {item.stock}
                  </td>
                  <td>{item.sold}</td>
                  <td>₹ {item.purchasePrice}</td>
                  <td>₹ {item.sellingPrice}</td>
                  <td className="text-success">
                    ₹ {item.sellingPrice - item.purchasePrice}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-warning btn-sm">
                        <FiEdit />
                      </button>
                      <button className="btn btn-danger btn-sm">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;
