// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   Spinner,
//   Alert,
//   Toast,
//   ToastContainer,
//   Table,
// } from "react-bootstrap";
// import {  getClubIncentivesbySubDealerr } from "../services/api";

// const ClubIncentiveStatus = () => {
//   const [loading, setLoading] = useState(true);
//   const [clubIncentives, setClubIncentives] = useState([]);
//   const [position, setPosition] = useState("");
//   const [prevPosition, setPrevPosition] = useState("");
//   const [error, setError] = useState("");
//   const [showNotification, setShowNotification] = useState(false);

//   const [isManager, setIsManager] = useState(false);
//   const [isStateHead, setIsStateHead] = useState(false);
//   const [isCountryHead, setIsCountryHead] = useState(false);

//   useEffect(() => {
//     const fetchIncentives = async () => {
//       try {
//         const data = await  getClubIncentivesbySubDealerr();
//         const createdCount = data?.clubIncentives?.length || 0;

//         setClubIncentives(data.clubIncentives);

//         let newPosition = "Dealer";
//         if (createdCount >= 10) newPosition = "Country Head";
//         else if (createdCount >= 5) newPosition = "State Head";
//         else if (createdCount >= 1) newPosition = "Manager";

//         if (newPosition !== position) {
//           setPrevPosition(position);
//           setPosition(newPosition);
//           setShowNotification(true);
//           setTimeout(() => setShowNotification(false), 5000);
//         }

//         setIsManager(data.isManager);
//         setIsStateHead(data.isStateHead);
//         setIsCountryHead(data.isCountryHead);
//       } catch (err) {
//         setError(err.message || "Failed to fetch incentives.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIncentives();
//   }, [position]);

//   const totalAmount = clubIncentives.reduce(
//     (acc, entry) => acc + (entry.earnedAmount || 0),
//     0
//   );

//   if (loading) return <Spinner animation="border" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;

//   const roleCards = [
//     { title: "Manager", show: isManager, emoji: "👨‍💼", color: "#81c784" },
//     { title: "State Head", show: isStateHead, emoji: "🏙️", color: "#64b5f6" },
//     { title: "Country Head", show: isCountryHead, emoji: "🌐", color: "#ba68c8" },
//   ];

//   return (
//     <>
//       {/* Toast Notification */}
//       <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
//         <Toast
//           show={showNotification}
//           onClose={() => setShowNotification(false)}
//           delay={5000}
//           autohide
//           bg="success"
//           animation
//         >
//           <Toast.Header closeButton>
//             <strong className="me-auto">🎉 Position Update</strong>
//           </Toast.Header>
//           <Toast.Body style={{ color: "white" }}>
//             Your position has changed from <b>{prevPosition || "none"}</b> to{" "}
//             <b>{position}</b>.
//           </Toast.Body>
//         </Toast>
//       </ToastContainer>

//       {/* Main Card */}
//       <Card
//         className="shadow"
//         style={{
//           maxWidth: 1100,
//           margin: "40px auto",
//           padding: "30px 40px",
//           fontSize: "1.1rem",
//           borderRadius: "15px",
//           backgroundColor: "#f9faff",
//         }}

//       >
//         <h2 className="mb-4 text-center" style={{ color: "#0d47a1", fontWeight: 700 }}>
//           Your Club Incentive Status
//         </h2>

//         {/* Position Cards */}
//         <div
//           style={{
//             display: "flex",
//             gap: "20px",
//             justifyContent: "center",
//             flexWrap: "wrap",
//             marginBottom: "30px",
//           }}
//         >
//           {roleCards.map(
//             (role, index) =>
//               role.show && (
//                 <Card
//                   key={index}
//                   style={{
//                     width: "240px",
//                     background: role.color,
//                     color: "white",
//                     borderRadius: "12px",
//                     padding: "20px",
//                     textAlign: "center",
//                     boxShadow: "0 4px 17px rgba(18, 219, 142, 0.15)",
//                   }}
//                        onMouseEnter={(e) => {
//       e.currentTarget.style.transform = "scale(1.05)";
//       e.currentTarget.style.boxShadow = "0 10px 24px rgba(48, 221, 137, 0.4)";
//     }}
//     onMouseLeave={(e) => {
//       e.currentTarget.style.transform = "scale(1)";
//       e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
//     }}
//                 >
//                   <div style={{ fontSize: "2.2rem", marginBottom: "10px" }}>{role.emoji}</div>
//                   <h5 style={{ fontWeight: "700" }}>{role.title}</h5>
//                 </Card>
//               )
//           )}
//         </div>

//         <p>
//           <strong>Dealers/Subdealers Created:</strong> {clubIncentives.length}
//         </p>
//         <p>
//           <strong>Your Current Position:</strong>{" "}
//           <span style={{ color: "#0d47a1", fontWeight: "700", fontSize: "1.3rem" }}>
//             {position}
//           </span>
//         </p>

//         <hr />

//         <h5 style={{ marginBottom: "20px", fontWeight: 600, color: "#0d47a1" }}>
//           Created Members:
//         </h5>

//         {clubIncentives.length === 0 ? (
//           <div className="alert alert-info text-center py-4 rounded-3 shadow-sm">
//   <i className="bi bi-person-x fs-3 d-block mb-2"></i>
//   <strong>No Dealers/Subdealers Found</strong>
//   <p className="mb-0 text-muted">You haven’t added any dealers or subdealers yet.</p>
// </div>

//         ) : (
//           <>
//             <Table striped bordered hover responsive>
//               <thead style={{ backgroundColor: '#0d47a1', color: "#ffffff" }}>
//                 <tr>
//                   <th>#</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Role</th>
//                   <th>Incentive (₹)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {clubIncentives.map((entry, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{entry.name}</td>
//                     <td>{entry.email}</td>
//                     <td>{entry.role}</td>
//                     <td style={{ color: "#198754", fontWeight: "bold" }}>
//                       ₹{entry.earnedAmount || 0}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginTop: "25px",
//                 padding: "15px 20px",
//                 borderRadius: "10px",
//                 backgroundColor: "#e3f2fd",
//                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                 border: "1px solid #90caf9",
//                 fontSize: "1.2rem",
//                 fontWeight: 600,
//                 color: "#0d47a1",
//               }}
//             >
//               <span>Total Incentive Earned</span>
//               <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2e7d32" }}>
//                 ₹{totalAmount}
//               </span>
//             </div>
//           </>
//         )}
//       </Card>
//     </>
//   );
// };

// export default ClubIncentiveStatus;


import React, { useState, useEffect } from 'react';
import { getIncentivesbySUbdealer, getIncentivesDealer } from '../services/api';
import { useNavigate } from 'react-router-dom';

function GetIncentives() {
  const id = localStorage.getItem("id");
  const [incentives, setIncentives] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [showReferral, setShowReferral] = useState("both");
  const [open, setOpen] = useState(false);
   const navigate = useNavigate();
 


const hasReferral1 = !!incentives?.referral1Used;
const hasReferral2 = !!incentives?.referral2Used;
const showReferralSection = hasReferral1 || hasReferral2;



  useEffect(() => {
    const fetchIncentives = async () => {
      

      try {
        const data = await getIncentivesbySUbdealer();
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
         {/* Go Back Button */}
      <div className="text-center mt-4">
        <button onClick={() => navigate(-1)} className="btn btn-outline-primary px-4 py-2 mb-4">
          ⬅️Back
        </button>
      </div>
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

    

<div className="card shadow-sm" style={{ maxWidth: '1250px', margin: 'auto', marginBottom: '2rem', borderRadius: '1rem' }}>
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