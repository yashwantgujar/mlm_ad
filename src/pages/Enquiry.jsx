import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const enquiryToken = localStorage.getItem("enquiry");

const EnquiryTable = () => {
  const [enquiries, setEnquiries] = useState([]);
   const navigate = useNavigate();


  useEffect(() => {
    fetchEnquiryData();
  }, []);

  const fetchEnquiryData = async () => {
    try {
      const res = await axios.get(
        "https://d277w8h3-9000.inc1.devtunnels.ms/api/website-registration", // Adjust the API URL if needed
        {
          headers: {
            enquiry: enquiryToken,
          },
        }
      );
      setEnquiries(res.data);
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    }
  };

  // Toggle the status of an enquiry (active/inactive)
  const toggleStatus = async (enquiryId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Toggle the current status
      await axios.put(
        `https://d277w8h3-8000.inc1.devtunnels.ms/api/website-registration/${enquiryId}`, // Adjust the API URL
        { contacted: updatedStatus },
        {
          headers: {
            enquiry: enquiryToken,
          },
        }
      );

      // Update local state after toggling the status
      setEnquiries((prevEnquiries) =>
        prevEnquiries.map((enquiry) =>
          enquiry._id === enquiryId
            ? { ...enquiry, contacted: updatedStatus }
            : enquiry
        )
      );
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  return (
    <div className="container mt-6">
      

      <div className="text-center mt-4">
        <button onClick={() => navigate(-1)} className="btn btn-outline-primary px-4 py-2 mb-4">
          ⬅️Back
        </button>
        </div>
      <h3>Enquiries Received</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped mt-3">
          <thead className="sticky-top bg- text-white">
            <tr>
              <th>Name</th>
              <th>Business</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Address</th>
              <th>Region</th>
              <th>Referral</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length > 0 ? (
              enquiries.map((e) => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td>{e.businessName}</td>
                  <td>{e.phone}</td>
                  <td>{e.email}</td>
                  <td>{e.role}</td>
                  <td>{e.address}</td>
                  <td>{e.preferredRegion}</td>
                  <td>{e.referralCode}</td>
                  <td>
                    <button
                      className={`btn btn-${e.contacted ? "success" : "warning"} text-dark`}
                      onClick={() => toggleStatus(e._id, e.contacted)}
                    >
                      {e.contacted ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiryTable;
