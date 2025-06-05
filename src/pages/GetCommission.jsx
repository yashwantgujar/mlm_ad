import React, { useState, useEffect } from "react";
import {  getAllCommissionData } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const CommissionPage = () => {
  const [commissionData, setCommissionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCommissionData = async () => {
      try {
        const data = await  getAllCommissionData();
        console.log("data----------------",data);
        
        setCommissionData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch commission data");
      } finally {
        setLoading(false);
      }
    };
    fetchCommissionData();
  }, []);

  const filteredData = commissionData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.refferalCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container  mb-5">
      <h2 className="mb-4">Commission Details</h2>
      
      {/* Search Filter */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email or referral code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="btn btn-secondary" 
              type="button"
              onClick={() => setSearchTerm("")}
              disabled={!searchTerm}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          Error: {error}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Referral Code</th>
              <th>Selling Commission (₹)</th>
              <th>Self Sell Incentive (₹)</th>
              <th>Total Incentive (₹)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td className="text-capitalize">{item.role}</td>
                  <td>{item.refferalCode}</td>
                  <td className="text-success fw-bold">
                    ₹{item.sellingCommission?.toFixed(2) || "0.00"}
                  </td>
                  <td className="text-success fw-bold">
                    ₹{item.selfSellIncentives?.toFixed(2) || "0.00"}
                  </td>
                  <td className="text-success fw-bold">
                    ₹{item.totalIncentive?.toFixed(2) || "0.00"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  {searchTerm ? "No matching records found" : "No commission data available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommissionPage;