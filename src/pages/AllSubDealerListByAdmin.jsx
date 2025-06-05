// src/components/SubDealerList.jsx
import React, { useEffect, useState } from 'react';
import { getAllSubDealers } from '../services/api';

const SubDealerList = () => {
  const [subDealers, setSubDealers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubDealers = async () => {
      try {
        const data = await getAllSubDealers();
        setSubDealers(data);
      } catch (error) {
        alert(error.message || "Failed to fetch sub-dealers");
      } finally {
        setLoading(false);
      }
    };

    fetchSubDealers();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-primary">All Sub-Dealers</h3>
      {loading ? (
        <p>Loading...</p>
      ) : subDealers.length === 0 ? (
        <p>No sub-dealers found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Dealer Name</th>
                <th>Email</th>
                <th>Referral 1</th>
                <th>Referral 2</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {subDealers.map((dealer, index) => (
                <tr key={dealer._id}>
                  <td>{index + 1}</td>
                  <td>{dealer.dealerName}</td>
                  <td>{dealer.email}</td>
                  <td>{dealer.referral1}</td>
                  <td>{dealer.referral2}</td>
                  <td>{dealer.city || '-'}</td>
                  <td>{dealer.state || '-'}</td>
                  <td>{dealer.country || '-'}</td>
                  <td>{dealer.bankAccountNumber || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubDealerList;
