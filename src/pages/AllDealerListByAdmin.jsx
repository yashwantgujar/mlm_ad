import React, { useEffect, useState } from "react";
import { getAllDealers } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const GetAllDealers = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const data = await getAllDealers();
        if (data && data.dealers) {
          setDealers(data.dealers);
        } else {
          setError("No dealers found.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching the dealers.");
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <span className="text-danger fw-bold">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="bg-gradient p-4 rounded shadow-sm mb-4" style={{ background: "linear-gradient(to right, #00c6ff, #0072ff)", color: "white" }}>
        <h3 className="text-center mb-0">All Registered Dealers</h3>
      </div>

      {dealers.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle shadow-sm">
            <thead className="table-primary text-center">
              <tr>
                <th>Dealer Name</th>
                <th>Email</th>
                <th>Referral 1</th>
                <th>Referral 2</th>
                <th>Location</th>
                <th>Deposit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {dealers.map((dealer) => (
                <tr key={dealer._id}>
                  <td>{dealer.dealerName}</td>
                  <td>{dealer.email}</td>
                  <td>{dealer.referral1}</td>
                  <td>{dealer.referral2}</td>
                  <td>{dealer.city}, {dealer.state}</td>
                  <td>₹{dealer.deposit}</td>
                  <td>
                    <button className="btn btn-outline-primary btn-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info text-center">No dealers available.</div>
      )}
    </div>
  );
};

export default GetAllDealers;
