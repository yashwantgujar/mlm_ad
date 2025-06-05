import React, { useState, useEffect } from 'react';
import { getIncentivesDealer } from '../services/api';

import { useNavigate } from "react-router-dom";

function GetIncentives() {
    const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [incentives, setIncentives] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [showReferral, setShowReferral] = useState("both");
  const [open, setOpen] = useState(false);

 


const hasReferral1 = !!incentives?.referral1Used;
const hasReferral2 = !!incentives?.referral2Used;
const showReferralSection = hasReferral1 || hasReferral2;




  useEffect(() => {
    const fetchIncentives = async () => {
      
      

      try {
        const data = await getIncentivesDealer();
        setIncentives(data);
      } catch (err) {
        setError(err.message || "Failed to fetch incentives.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncentives();
  }, []);
   

  if (loading) return <p className="p-4">Loading incentives...</p>;
  if (error) return <p className="p-4 text-danger">Error: {error}</p>;
  if (!incentives) return <p className="p-4">No incentives found.</p>;

  return (
    <div className="container ">

       {/* 🔙 Back Button */}
      <button
        className="btn btn-outline-primary mb-3 "
        onClick={() => navigate(-1)}
      >
        🔙 Back
      </button>

      
      <h3 className="text-2xl fw-bold mb-4">Dealer Info</h3>
      
 
  {/* Total Incentive Amount */}
  <div className="row">
  {/* Total Incentive Amount */}
  <div className="col-12 col-md-4 mb-3">
    <div
      className="card h-100 d-flex flex-row align-items-center p-3"
      style={{
        borderLeft: '6px solid #007bff',
        borderRadius: '1rem',
        background: 'linear-gradient(135deg, #f0faff, #e6f0ff)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(0,0,0,0.15)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 123, 255, 0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.15)';
      }}
    >
      <div className="flex-grow-1">
        <div className="h3 text-primary mb-1">₹{(incentives.totalIncentives || 0).toLocaleString()}</div>
        <h5 className="card-title mb-0">Total Incentive Amount</h5>
      </div>
      <div
        className="d-flex justify-content-center align-items-center ms-3"
        style={{
          width: '70px',
          height: '70px',
          background: 'linear-gradient(135deg, #007bff, #00d4ff)',
          borderRadius: '50%',
          fontSize: '2rem',
          boxShadow: '0 0 10px rgba(0,0,0,0.15)',
        }}
      >
        💰
      </div>
    </div>
  </div>

  {/* Selling Commission */}
  <div className="col-12 col-md-4 mb-3">
    <div
      className="card h-100 d-flex flex-row align-items-center p-3"
      style={{
        borderLeft: '6px solid #28a745',
        borderRadius: '1rem',
        background: 'linear-gradient(135deg, #f0fff5, #e6ffee)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(0,0,0,0.15)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(40, 167, 69, 0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.15)';
      }}
    >
      <div className="flex-grow-1">
        <div className="h3 text-success mb-1">₹{(incentives.sellingCommission || 0).toLocaleString()}</div>
        <h5 className="card-title mb-0">Selling Commission</h5>
      </div>
      <div
        className="d-flex justify-content-center align-items-center ms-3"
        style={{
          width: '70px',
          height: '70px',
          background: 'linear-gradient(135deg, #28a745, #7fffd4)',
          borderRadius: '50%',
          fontSize: '2rem',
          boxShadow: '0 0 10px rgba(0,0,0,0.15)',
        }}
      >
        💵
      </div>
    </div>
  </div>

  {/* Self-Sell Incentive */}
  <div className="col-12 col-md-4 mb-3">
    <div
      className="card h-100 d-flex flex-row align-items-center p-3"
      style={{
        borderLeft: '6px solid #ffc107',
        borderRadius: '1rem',
        background: 'linear-gradient(135deg, #fff9e6, #fff3cd)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(0,0,0,0.15)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 193, 7, 0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.15)';
      }}
    >
      <div className="flex-grow-1">
        <div className="h3 text-warning mb-1">₹{(incentives.selfSellIncentive || 0).toLocaleString()}</div>
        <h5 className="card-title mb-0">Self-Sell Incentive</h5>
      </div>
      <div
        className="d-flex justify-content-center align-items-center ms-3"
        style={{
          width: '70px',
          height: '70px',
          background: 'linear-gradient(135deg, #ffc107, #ffecb3)',
          borderRadius: '50%',
          fontSize: '2rem',
          boxShadow: '0 0 10px rgba(0,0,0,0.15)',
        }}
      >
        🛵
      </div>
    </div>
  </div>
</div>

    

<div className="card shadow-sm" style={{ maxWidth: '1200px', margin: 'auto', marginBottom: '2rem', borderRadius: '1rem' }}>
  <div className="card-body" style={{
    padding: '1.25rem', // Consistent padding
    // Font family similar to the general style of the example image
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, Noto Sans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
  }}>
    <h5 className="card-title mb-3" style={{
      fontWeight: 'bold',
      fontSize: '1.15rem', // Style similar to "Payment method" heading in image
      color: '#212529',     // Dark text color
      marginBottom: '1.5rem' // More space below title
    }}>Dealer Information</h5>
    <div className="row gx-3 gy-2">
      {[
        [
          { label: 'Name', value: incentives.name },
          { label: 'Email', value: incentives.email },
          { label: 'Role', value: incentives.role }
        ],
        [
          { label: 'Aadhar', value: incentives.aadhar || 'N/A' },
          { label: 'PAN', value: incentives.pan || 'N/A' },
          { label: 'Address', value: incentives.address || 'N/A' }
        ]
      ].map((columnItems, colIdx) => (
        <div key={colIdx} className="col-6">
          {columnItems.map(({ label, value }) => (
            // Each item is now a simple paragraph, styled like the image's text lines
            <p
              key={label}
              style={{
                fontSize: '0.95rem',      // Font size like "Transaction ID" line
                color: '#495057',        // Text color for the value part
                marginBottom: '0.75rem', // Space between items
                lineHeight: '1.4',       // For better readability
                marginBlockStart: '0',   // Reset default p margin
                marginBlockEnd: '0.75rem'// Ensure consistent bottom margin
              }}
            >
              <span style={{
                fontWeight: 'bold',
                color: '#212529'      // Darker, bold color for the label
              }}>{label} : </span>
              {value}
            </p>
          ))}
        </div>
      ))}
    </div>
    {/* Optional: Add a horizontal line below the content if you want to match the image even more closely */}
    {/* <hr style={{ marginTop: '1.5rem', borderColor: '#dee2e6' }} /> */}
  </div>
</div>





      {/* Referral Usage Section */}
   {/* Referral Usage Section */}

{/* Referral Usage Section */}
<div className="card shadow-sm mb-5" style={{ position: "relative", minHeight: "150px" }}>
  <div className="card-header bg-info text-white d-flex justify-content-between align-items-center py-3 px-4">
    <h5 className="mb-0 fw-bold">Referral Usage</h5>
    
    {/* Toggle Panel Button */}
    <div className="position-relative">
      <button
        type="button"
        className="btn btn-light btn-sm fw-semibold"
        onClick={() => setOpen(!open)}
      >
        {open ? "Hide Options" : "Filter Referrals"}
      </button>

      {/* Slider Panel */}
      <div
        className="slider-panel"
        style={{
          position: "absolute",
          top: "110%", // below the button
          right: 0,
          width: "220px",
          maxHeight: open ? "200px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
          border: open ? "1px solid #ccc" : "none",
          borderRadius: "5px",
          padding: open ? "10px" : "0 10px",
          backgroundColor: "#f8f9fa",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 1000,
        }}
      >
        {["both", "ref1", "ref2"].map((ref) => (
          <button
            key={ref}
            type="button"
            className={`btn btn-sm me-2 mb-2 ${
              showReferral === ref
                ? "btn-light text-dark fw-bold"
                : "btn-outline-secondary"
            }`}
            onClick={() => {
              setShowReferral(ref);
              setOpen(false); // close slider on selection
            }}
          >
            {ref === "both" ? "Show Both" : ref === "ref1" ? "Referral 1" : "Referral 2"}
          </button>
        ))}
      </div>
    </div>
  </div>

  {/* Card Body Slide-In */}
  <div className="card-body referral-slide">
    {/* Referral 1 Table */}
    {(showReferral === "both" || showReferral === "ref1") && (
      <>
        <h6 className="fw-bold mt-3 mb-2">Referral 1 Used</h6>
        <div className="table-responsive mb-4">
          <table className="table table-bordered table-hover"
             >
            <thead style={{ backgroundColor: "#b9f6ca", color: "white" }}>
              <tr>
                <th>Used Referral Code</th>
                <th>Referred By</th>
                <th>Email</th>
                <th>Role</th>
                <th>Address</th>
                <th>Aadhar</th>
                <th>PAN</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{incentives?.referral1Used?.usedReferralCode || "N/A"}</td>
                <td>{incentives?.referral1Used?.referredBy || "N/A"}</td>
                <td>{incentives?.referral1Used?.referredByEmail || "N/A"}</td>
                <td>{incentives?.referral1Used?.referredByRole || "N/A"}</td>
                <td>{incentives?.referral1Used?.fullDetails?.address || "N/A"}</td>
                <td>{incentives?.referral1Used?.fullDetails?.aadhar || "N/A"}</td>
                <td>{incentives?.referral1Used?.fullDetails?.pan || "N/A"}</td>
                <td>
                  {[
                    incentives?.referral1Used?.fullDetails?.city,
                    incentives?.referral1Used?.fullDetails?.state,
                    incentives?.referral1Used?.fullDetails?.country,
                  ]
                    .filter(Boolean)
                    .join(", ") || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )}

    {/* Referral 2 Table */}
    {(showReferral === "both" || showReferral === "ref2") && (
      <>
        <h6 className="fw-bold mt-3 mb-2">Referral 2 Used</h6>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead style={{ backgroundColor: "#b9f6ca", color: "white" }}>
              <tr>
                <th>Used Referral Code</th>
                <th>Referred By</th>
                <th>Email</th>
                <th>Role</th>
                <th>Address</th>
                <th>Aadhar</th>
                <th>PAN</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{incentives?.referral2Used?.usedReferralCode || "N/A"}</td>
                <td>{incentives?.referral2Used?.referredBy || "N/A"}</td>
                <td>{incentives?.referral2Used?.referredByEmail || "N/A"}</td>
                <td>{incentives?.referral2Used?.referredByRole || "N/A"}</td>
                <td>{incentives?.referral2Used?.fullDetails?.address || "N/A"}</td>
                <td>{incentives?.referral2Used?.fullDetails?.aadhar || "N/A"}</td>
                <td>{incentives?.referral2Used?.fullDetails?.pan || "N/A"}</td>
                <td>
                  {[
                    incentives?.referral2Used?.fullDetails?.city,
                    incentives?.referral2Used?.fullDetails?.state,
                    incentives?.referral2Used?.fullDetails?.country,
                  ]
                    .filter(Boolean)
                    .join(", ") || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )}
  </div>
</div>


    </div>
  );
}

export default GetIncentives;