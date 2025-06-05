

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getAllProductsDealer } from "../services/api";

// const DealerProductDetails = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const bikeId = state?.bikeId;

//   const [bike, setBike] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const BASE_URL = "https://d277w8h3-9000.inc1.devtunnels.ms/";

//   useEffect(() => {
//     if (!bikeId) {
//       navigate(-1);
//       return;
//     }

//     const fetchBike = async () => {
//       try {
//         const allBikes = await getAllProductsDealer();
//         const matched = allBikes.find((b) => b._id === bikeId);
//         setBike(matched);
//       } catch (err) {
//         console.error("Error fetching bike:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBike();
//   }, [bikeId, navigate]);

//   if (loading) return <div className="p-4">Loading...</div>;
//   if (!bike) return <div className="p-4 text-danger">Bike not found.</div>;

//   const image = bike.bikeImgs?.[0]?.replace(/\\/g, "/");
//   const imageUrl = image ? `${BASE_URL}${image}` : null;

//   return (
//     <div className="container my-5">
//       <div className="row shadow rounded bg-light p-4">
//         {/* Left - Image */}
//         <div className="col-md-5 d-flex align-items-center justify-content-center mb-3 mb-md-0">
//           {imageUrl ? (
//             <img
//               src={imageUrl}
//               alt={bike.bikeName}
//               className="img-fluid rounded border shadow-sm"
//               style={{ maxHeight: "350px", objectFit: "contain" }}
//             />
//           ) : (
//             <div className="text-muted">No Image</div>
//           )}
//         </div>

//         {/* Right - Details */}
//         <div className="col-md-7">
//           <h3 className="fw-bold mb-3 text-primary">{bike.bikeName}</h3>
//           <div className="row">
//             {[
//               ["Range", bike.range],
//               ["Motor", bike.motor],
//               ["Price", `₹${bike.bikePrice}`],
//               ["Warranty", `${bike.warranty}${isNaN(bike.warranty) ? '' : ' years'}`],
//               ["Colors", bike.colors],
//               ["Transmission", bike.transmission],
//               ["Dimensions", bike.dimensions],
//               ["Wheelbase", bike.wheelbase],
//               ["Ground Clearance", bike.groundClearance],
//               ["Kerb Weight", bike.kerbWeight],
//               ["Loading Capacity", bike.loadingCapacity],
//               ["Tyre (FR)", bike.tyreFR],
//               ["Brake (FR)", bike.brakeFR],
//               ["Battery Type", bike.batteryType],
//               ["Battery Lead", bike.batteryLead],
//               ["Charging Time Lead", bike.chargingTimeLead],
//               ["Range Lead", bike.rangeLead],
//               ["Battery Lithium", bike.batteryLithium],
//               ["Charging Time Lithium", bike.chargingTimeLithium],
//               ["Range Lithium", bike.rangeLithium]
//             ].map(([label, value]) => (
//               <div key={label} className="col-sm-6 mb-2">
//                 <strong>{label}:</strong> {value || "N/A"}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DealerProductDetails;




import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllProductsDealer } from "../services/api";

const DealerProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bikeId = state?.bikeId;

  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://d277w8h3-9000.inc1.devtunnels.ms/";

  useEffect(() => {
    if (!bikeId) {
      navigate(-1);
      return;
    }

    const fetchBike = async () => {
      try {
        const allBikes = await getAllProductsDealer();
        const matched = allBikes.find((b) => b._id === bikeId);
        setBike(matched);
      } catch (err) {
        console.error("Error fetching bike:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [bikeId, navigate]);

  if (loading) return <div className="p-5 text-center">Loading...</div>;
  if (!bike) return <div className="p-5 text-danger">Bike not found.</div>;

  const image = bike.bikeImgs?.[0]?.replace(/\\/g, "/");
  const imageUrl = image ? `${BASE_URL}${image}` : null;

  return (
    <div className="container py-5">
   
      {/* 🔙 Back Button */}
      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => navigate(-1)}
      >
        🔙 Back
      </button>
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div className="row g-0 flex-column flex-md-row">
          {/* Left Image Section */}
          <div className="col-md-5 d-flex align-items-center justify-content-center p-3">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={bike.bikeName}
                className="img-fluid "
                style={{ maxHeight: "350px", objectFit: "contain" }}
              />
            ) : (
              <div className="text-muted">No Image</div>
            )}
          </div>

          {/* Right Info Section */}
          <div className="col-md-7 p-4">
            <h2 className="fw-bold text-primary">{bike.bikeName}</h2>
            <h5 className="text-success mb-3">₹ {bike.bikePrice.toLocaleString()}</h5>

            <div className="mb-3">
              <span className="badge bg-secondary me-2">Range: {bike.range}</span>
              <span className="badge bg-info text-dark me-2">Motor: {bike.motor}</span>
              <span className="badge bg-warning text-dark">
                Warranty: {bike.warranty}{isNaN(bike.warranty) ? '' : ' yrs'}
              </span>
            </div>

            <hr />

            <h5 className="mb-3">Specifications</h5>
            <div className="row">
              {[
                ["Colors", bike.colors],
                  ["Quantity", bike.quantity],
                ["Transmission", bike.transmission],
                ["Dimensions", bike.dimensions],
                ["Wheelbase", bike.wheelbase],
                ["Ground Clearance", bike.groundClearance],
                ["Kerb Weight", bike.kerbWeight],
                ["Loading Capacity", bike.loadingCapacity],
                ["Tyre (FR)", bike.tyreFR],
                ["Brake (FR)", bike.brakeFR],
                ["Battery Type", bike.batteryType],
                ["Battery Lead", bike.batteryLead],
                ["Charging Time Lead", bike.chargingTimeLead],
                ["Range Lead", bike.rangeLead],
                ["Battery Lithium", bike.batteryLithium],
                ["Charging Time Lithium", bike.chargingTimeLithium],
                ["Range Lithium", bike.rangeLithium],
                
             
              ].map(([label, value]) => (
                <div key={label} className="col-12 col-sm-6 mb-2">
                  <strong>{label}:</strong> {value || "N/A"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerProductDetails;


