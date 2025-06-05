import React, { useState, useEffect } from 'react';

const ServicingHistory = () => {
  // State for storing servicing history
  const [servicingHistory, setServicingHistory] = useState([]);

  // Simulated data (this can be fetched from an API or backend)
  const mockData = [
    {
      userName: 'John Doe',
      serviceType: 'Battery',
      serviceDate: '2023-12-10',
      lastServiceDate: '2023-06-15',
    },
    {
      userName: 'Jane Smith',
      serviceType: 'Motor',
      serviceDate: '2024-01-05',
      lastServiceDate: '2023-08-12',
    },
    {
      userName: 'Sam Wilson',
      serviceType: 'Controller',
      serviceDate: '2024-02-20',
      lastServiceDate: '2023-10-30',
    },
  ];

  // Populate the servicing history with mock data (this can be replaced by an API call)
  useEffect(() => {
    setServicingHistory(mockData);
  }, []);

  // Function to check if the service is within the battery warranty period
  const isServiceWithinWarranty = (serviceDate, lastServiceDate) => {
    const warrantyPeriod = 18; // Battery warranty is 18 months
    const serviceDateObj = new Date(serviceDate);
    const lastServiceDateObj = new Date(lastServiceDate);
    
    // Calculate the difference between last service and the service date in months
    const diffTime = serviceDateObj - lastServiceDateObj;
    const diffMonths = diffTime / (1000 * 3600 * 24 * 30); // Convert time difference to months

    return diffMonths <= warrantyPeriod; // If service date is within 18 months of last service
  };

  return (
    <div className="container mt-4">
      <h2>Servicing History</h2>
      
      {/* Displaying servicing history in a table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Service Type</th>
            <th>Service Date</th>
            <th>Last Service Date</th>
            <th>Warranty Status</th>
          </tr>
        </thead>
        <tbody>
          {servicingHistory.map((record, index) => (
            <tr key={index}>
              <td>{record.userName}</td>
              <td>{record.serviceType}</td>
              <td>{record.serviceDate}</td>
              <td>{record.lastServiceDate}</td>
              <td>
                {isServiceWithinWarranty(record.serviceDate, record.lastServiceDate) ? (
                  <span className="badge bg-success">Within Warranty</span>
                ) : (
                  <span className="badge bg-danger">Out of Warranty</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicingHistory;
