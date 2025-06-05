import React, { useState } from 'react';

const DealershipList = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Dealer',
      addedBy: 'Admin',
      earningPerMonth: 30000,
      durationMonths: 60,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Sub Dealer',
      addedBy: 'Admin',
      earningPerMonth: 15000,
      durationMonths: 60,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Robert Brown',
      role: 'User',
      addedBy: 'Admin',
      earningPerMonth: 0,
      durationMonths: 0,
      status: 'Inactive',
    },
    {
      id: 4,
      name: 'Lucy Green',
      role: 'Dealer',
      addedBy: 'Admin',
      earningPerMonth: 30000,
      durationMonths: 60,
      status: 'Active',
    },
  ]);

  const getRoleCounts = () => {
    let users = 0, dealers = 0, subDealers = 0;
    entries.forEach(entry => {
      if (entry.role === 'User') users++;
      else if (entry.role === 'Dealer') dealers++;
      else if (entry.role === 'Sub Dealer') subDealers++;
    });
    return { users, dealers, subDealers };
  };

  const { users, dealers, subDealers } = getRoleCounts();

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold text-primary mb-4">Dealership List</h2>

      {/* Role Counts */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">Users</h5>
              <p className="card-text">{users} {users === 1 ? 'User' : 'Users'}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-success">Dealers</h5>
              <p className="card-text">{dealers} {dealers === 1 ? 'Dealer' : 'Dealers'}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-warning">Sub Dealers</h5>
              <p className="card-text">{subDealers} {subDealers === 1 ? 'Sub Dealer' : 'Sub Dealers'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dealership List Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover" style={{ borderColor: '#ddd' }}>
          <thead style={{ backgroundColor: '#001f3d', color: 'white' }}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Added By</th>
              <th>Earning/Month (₹)</th>
              <th>Duration (Months)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} style={{ backgroundColor: '#f8f9fa' }}>
                <td>{entry.id}</td>
                <td>{entry.name}</td>
                <td>{entry.role}</td>
                <td>{entry.addedBy}</td>
                <td>{entry.earningPerMonth}</td>
                <td>{entry.durationMonths}</td>
                <td>{entry.status}</td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">No records yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealershipList;
