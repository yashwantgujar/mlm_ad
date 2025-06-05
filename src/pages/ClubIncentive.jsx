import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Spinner,
  Alert,
  Toast,
  ToastContainer,
  Table,
} from "react-bootstrap";
import { getClubIncentivesbyDealer } from "../services/api";

const ClubIncentiveStatus = () => {
    const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [clubIncentives, setClubIncentives] = useState([]);
  const [position, setPosition] = useState("");
  const [prevPosition, setPrevPosition] = useState("");
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const [isManager, setIsManager] = useState(false);
  const [isStateHead, setIsStateHead] = useState(false);
  const [isCountryHead, setIsCountryHead] = useState(false);

  useEffect(() => {
    const fetchIncentives = async () => {
      try {
        const data = await getClubIncentivesbyDealer();
        const createdCount = data?.clubIncentives?.length || 0;

        setClubIncentives(data.clubIncentives);

        let newPosition = "Dealer";
        if (createdCount >= 10) newPosition = "Country Head";
        else if (createdCount >= 5) newPosition = "State Head";
        else if (createdCount >= 1) newPosition = "Manager";

        if (newPosition !== position) {
          setPrevPosition(position);
          setPosition(newPosition);
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 5000);
        }

        setIsManager(data.isManager);
        setIsStateHead(data.isStateHead);
        setIsCountryHead(data.isCountryHead);
      } catch (err) {
        setError(err.message || "Failed to fetch incentives.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncentives();
  }, [position]);

  const totalAmount = clubIncentives.reduce(
    (acc, entry) => acc + (entry.earnedAmount || 0),
    0
  );

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  // endisoin colure back gruond   background: "linear-gradient(45deg, #81c784,rgb(159, 222, 227), #2e7d32)"


  const roleCards = [
    { title: "Manager", show: isManager, emoji: "👨‍💼", color: "#81c784" },
    { title: "State Head", show: isStateHead, emoji: "🏙️", color: "#64b5f6" },
    { title: "Country Head", show: isCountryHead, emoji: "🌐", color: "#ba68c8" },
  ];

  return (
    <>
      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast
          show={showNotification}
          onClose={() => setShowNotification(false)}
          delay={5000}
          autohide
          bg="success"
          animation
        >
          <Toast.Header closeButton>
            <strong className="me-auto">🎉 Position Update</strong>
          </Toast.Header>
          <Toast.Body style={{ color: "white" }}>
            Your position has changed from <b>{prevPosition || "none"}</b> to{" "}
            <b>{position}</b>.
          </Toast.Body>
        </Toast>
      </ToastContainer>
      {/* 🔙 Back Button */}
      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => navigate(-1)}
      >
        🔙 Back
      </button>

      {/* Main Card */}
      <Card
        className="shadow"
        style={{
          maxWidth: 1100,
          margin: "40px auto",
          padding: "30px 40px",
          fontSize: "1.1rem",
          borderRadius: "15px",
          backgroundColor: "#f9faff",
        }}

      >
        <h2 className="mb-4 text-center" style={{ color: "#0d47a1", fontWeight: 700 }}>
          Your Club Incentive Status
        </h2>

        {/* Position Cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          {roleCards.map(
            (role, index) =>
              role.show && (
                <Card
                  key={index}
                  style={{
                    width: "240px",
                    background: role.color,
                    color: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    textAlign: "center",
                    boxShadow: "0 4px 17px rgba(18, 219, 142, 0.15)",
                  }}
                       onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 10px 24px rgba(48, 221, 137, 0.4)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
    }}
                >
                  <div style={{ fontSize: "2.2rem", marginBottom: "10px" }}>{role.emoji}</div>
                  <h5 style={{ fontWeight: "700" }}>{role.title}</h5>
                </Card>
              )
          )}
        </div>

        <p>
          <strong>Dealers/Subdealers Created:</strong> {clubIncentives.length}
        </p>
        <p>
          <strong>Your Current Position:</strong>{" "}
          <span style={{ color: "#0d47a1", fontWeight: "700", fontSize: "1.3rem" }}>
            {position}
          </span>
        </p>

        <hr />

        <h5 style={{ marginBottom: "20px", fontWeight: 600, color: "#0d47a1" }}>
          Created Members:
        </h5>

        {clubIncentives.length === 0 ? (
         <div className="alert alert-info text-center py-4 rounded-3 shadow-sm">
  <i className="bi bi-person-x fs-3 d-block mb-2"></i>
  <strong>No Dealers/Subdealers Found</strong>
  <p className="mb-0 text-muted">You haven’t added any dealers or subdealers yet.</p>
</div>
        ) : (
          <>
            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: '#0d47a1', color: "#ffffff" }}>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Incentive (₹)</th>
                </tr>
              </thead>
              <tbody>
                {clubIncentives.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.name}</td>
                    <td>{entry.email}</td>
                    <td>{entry.role}</td>
                    <td style={{ color: "#198754", fontWeight: "bold" }}>
                      ₹{entry.earnedAmount || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "25px",
                padding: "15px 20px",
                borderRadius: "10px",
                backgroundColor: "#e3f2fd",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "1px solid #90caf9",
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#0d47a1",
              }}
            >
              <span>Total Incentive Earned</span>
              <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2e7d32" }}>
                ₹{totalAmount}
              </span>
            </div>
          </>
        )}
      </Card>
    </>
  );
};

export default ClubIncentiveStatus;