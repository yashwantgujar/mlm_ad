import React, { useEffect, useState } from 'react';
import { getAllBookedSlots } from '../services/api';

const TotalBookedSlots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const data = await getAllBookedSlots();
        setSlots(data.slots); // assuming response contains slots array
      } catch (error) {
        console.error('Failed to load booked slots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedSlots();
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Total Booked Slots</h4>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Slot Type</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{slot.fullName}</td>
                <td>{slot.email}</td>
                <td>{slot.role}</td>
                <td>{slot.status}</td>
                <td>{slot.slotType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TotalBookedSlots;
