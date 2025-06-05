import React, { useEffect, useState } from 'react';

const IncomeList = () => {
  const [incomeData, setIncomeData] = useState([]);

  // Normally fetch from API here (currently using static example data)
  useEffect(() => {
    // Example static data (replace with your backend fetched data)
    const exampleData = [
      {
        id: 1,
        date: '2025-04-29',
        incomeType: 'Dealer Created',
        sourceName: 'Dealer ABC',
        amount: 30000,
        remark: 'Monthly Income - Month 1',
      },
      {
        id: 2,
        date: '2025-04-29',
        incomeType: 'Sub Dealer Created',
        sourceName: 'SubDealer XYZ',
        amount: 15000,
        remark: 'Monthly Income - Month 1',
      },
      {
        id: 3,
        date: '2025-04-29',
        incomeType: 'Direct Bike Sale',
        sourceName: 'User1',
        amount: 9500,
        remark: 'Direct Sale Commission',
      },
      {
        id: 4,
        date: '2025-04-29',
        incomeType: 'Referral Bike Sale',
        sourceName: 'User2',
        amount: 2000,
        remark: 'Referral Sale Commission',
      },
    ];

    setIncomeData(exampleData);
  }, []);

  const totalIncome = incomeData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold text-success mb-4">Total Income Summary</h2>

      <div className="text-center mb-4">
        <h4 className="text-primary">💰 Total Income: ₹{totalIncome}</h4>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Income Source</th>
              <th>Source Name</th>
              <th>Amount (₹)</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {incomeData.length > 0 ? (
              incomeData.map((income) => (
                <tr key={income.id}>
                  <td>{income.id}</td>
                  <td>{income.date}</td>
                  <td>{income.incomeType}</td>
                  <td>{income.sourceName}</td>
                  <td>₹{income.amount}</td>
                  <td>{income.remark}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No Income Records Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeList;
