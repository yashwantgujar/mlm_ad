// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   Box,
//   Chip,
//   Stack,
//   CircularProgress,
// } from "@mui/material";
// import { getAllProductsUser} from "../services/api";

// const DealerTableView = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const user = state?.user;
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch assigned bikes when component mounts
//   useEffect(() => {
//     const fetchAssignedBikes = async () => {
//       try {
//         if (user?._id) {
//           setLoading(true);
//           setError(null);
//           const response = await getAllProductsUser(user._id);
          
//           if (response && response.bikes) {
//             setProducts(response.bikes);
//           } else {
//             setProducts([]);
//             console.warn("No 'bikes' array found in the response from getProductByDealer");
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching bikes:", err);
//         setError("Failed to load bike data");
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignedBikes();
//   }, [user]);

//   const handleViewDetails = (product) => {
//     navigate("/dealer-productdetails", { state: { product } });
//   };

//   if (!user) {
//     return (
//       <div className="container py-5">
//         <h5 className="text-danger">No user data found.</h5>
//         <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-4" style={{ backgroundColor: "#f1f6ff", minHeight: "100vh" }}>
//       <div className="bg-white p-4 rounded shadow-sm">
//         <h2 className="text-center text-primary mb-4">Dealer Profile</h2>
//         <div className="row g-4">
//           {/* Bikes Section */}
//           <div className="col-md-12">
//             <div className="bg-light p-3 rounded">
//               <h5 className="border-bottom pb-2 text-primary">Assigned Bikes</h5>
              
//               {loading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//                   <CircularProgress />
//                   <Typography sx={{ ml: 2 }}>Loading products...</Typography>
//                 </Box>
//               ) : error ? (
//                 <Box sx={{ px: 4, py: 5, textAlign: 'center' }}>
//                   <Typography variant="h5" color="error">
//                     Error: {error}
//                   </Typography>
//                   <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
//                     Retry
//                   </Button>
//                 </Box>
//               ) : products.length === 0 ? (
//                 <Box sx={{ px: 4, py: 5, textAlign: 'center' }}>
//                   <Typography variant="h5" color="text.secondary">
//                     No products assigned to you yet.
//                   </Typography>
//                 </Box>
//               ) : (
//                 <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 5 }}>
//                   <Typography
//                     variant="h4"
//                     align="center"
//                     color="green"
//                     fontWeight="bold"
//                     gutterBottom
//                     sx={{ mb: 4 }}
//                   >
//                     🚲 Your Assigned Electric Bikes
//                   </Typography>

//                   <Grid container spacing={3} sx={{
//                     display: "flex",
//                     flexDirection: "row",
//                     flexWrap: "wrap",
//                     justifyContent: "center",
//                     gap: 3,
//                   }}>
//                     {products.map((product) => {
//                       const priceExcludingGST = product.bikePrice;
//                       const displayPrice = product.displayPrice || Math.round(priceExcludingGST * 1.10);
//                       const mrp = product.mrp || Math.round(displayPrice * 1.15);
//                       const discountPercentage = mrp && displayPrice ? Math.round(100 - (displayPrice / mrp) * 100) : 0;

//                       const imageUrl = product.bikeImgs?.[0]
//                         ? `${process.env.REACT_APP_API_BASE_URL || 'https://d277w8h3-9000.inc1.devtunnels.ms'}/${product.bikeImgs[0].replace(/\\/g, "/")}`
//                         : "/placeholder-image.png";

//                       return (
//                         <Grid item key={product._id}>
//                           <Card
//                             sx={{
//                               width: '500px',
//                               height: '100%',
//                               borderRadius: '20px',
//                               overflow: 'hidden',
//                               boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
//                               transition: 'all 0.3s ease-in-out',
//                               display: 'flex',
//                               flexDirection: 'column',
//                               backgroundColor: '#ffffff',
//                               '&:hover': {
//                                 transform: 'scale(1.02)',
//                                 boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
//                               },
//                             }}
//                           >
//                             <CardMedia
//                               component="img"
//                               height="260"
//                               image={imageUrl}
//                               alt={product.bikeName}
//                               sx={{
//                                 objectFit: "cover",
//                                 borderRadius: "12px 12px 0 0",
//                               }}
//                             />

//                             <CardContent sx={{ flexGrow: 1, p: 2 }}>
//                               <Typography variant="h6" fontWeight="bold" noWrap gutterBottom title={product.bikeName}>
//                                 {product.bikeName}
//                               </Typography>

//                               <Stack spacing={0.5} mb={2}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   <strong>Battery:</strong>{" "}
//                                   {product.batteryLithium || product.batteryLead || 'N/A'}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                   <strong>Range:</strong> {product.range || 'N/A'} km/charge
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                   <strong>Warranty:</strong> {product.warranty || 'N/A'}
//                                 </Typography>
//                                 <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'blue' }}>
//                                   <strong>Stock:</strong> {product.quantity} units
//                                 </Typography>
//                               </Stack>

//                               <Box display="flex" alignItems="baseline" mb={2}>
//                                 <Typography
//                                   variant="h5"
//                                   color="primary.main"
//                                   fontWeight="bold"
//                                   mr={1}
//                                 >
//                                   ₹{displayPrice.toLocaleString()}
//                                 </Typography>
//                                 {mrp > displayPrice && (
//                                   <Typography
//                                     variant="body1"
//                                     color="text.disabled"
//                                     sx={{ textDecoration: "line-through" }}
//                                   >
//                                     ₹{mrp.toLocaleString()}
//                                   </Typography>
//                                 )}
//                               </Box>
//                               {discountPercentage > 0 && (
//                                 <Chip
//                                   label={`${discountPercentage}% OFF`}
//                                   color="error"
//                                   size="small"
//                                   sx={{ mb: 2, fontWeight: 'bold' }}
//                                 />
//                               )}

//                               <Button
//                                 variant="contained"
//                                 fullWidth
//                                 sx={{
//                                   fontWeight: "bold",
//                                   py: 1.2,
//                                   fontSize: '0.95rem',
//                                   backgroundColor: '#007b5e',
//                                   '&:hover': {
//                                     backgroundColor: '#005f46',
//                                     transform: 'scale(1.03)',
//                                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
//                                   },
//                                   transition: 'all 0.3s ease-in-out',
//                                 }}
//                                 onClick={() => handleViewDetails(product)}
//                               >
//                                 View Details
//                               </Button>
//                             </CardContent>
//                           </Card>
//                         </Grid>
//                       );
//                     })}
//                   </Grid>
//                 </Box>
//               )}
//             </div>
//           </div>

//           {/* User Info Section */}
//           <div className="col-md-12">
//             <div className="bg-light p-3 rounded">
//               {/* Personal Info */}
//               <Section title="Personal Information">
//                 <div className="row">
//                   <Field label="Name" value={user.name} />
//                   <Field label="Role" value={user.role} />
//                   <Field label="Email" value={user.email} />
//                   <Field label="Mobile" value={user.mobile} />
//                 </div>
//               </Section>

//               {/* Address Info */}
//               <Section title="Address Information">
//                 <div className="row">
//                   <Field label="Address" value={user.address} col="12" />
//                   <Field label="City" value={user.city} />
//                   <Field label="State" value={user.state} />
//                   <Field label="Pincode" value={user.pincode} />
//                 </div>
//               </Section>

//               {/* Banking Info */}
//               <Section title="Banking Details">
//                 <div className="row">
//                   <Field label="Bank Name" value={user.bankName} />
//                   <Field label="Account Number" value={user.accountNumber} />
//                 </div>
//               </Section>

//               {/* Referral Info */}
//               <Section title="Referral Details">
//                 <div className="row">
//                   <Field label="Own Referral Code" value={user.ownReferralCode} />
//                   <Field label="Referred By" value={user.referredBy} />
//                 </div>
//               </Section>

//               <div className="text-center mt-4">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="btn btn-outline-primary px-4 py-2"
//                 >
//                   Back to Dashboard
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Section Wrapper
// const Section = ({ title, children }) => (
//   <div className="mb-4">
//     <h6 className="text-primary border-bottom pb-2 mb-3">{title}</h6>
//     {children}
//   </div>
// );

// // Info Field
// const Field = ({ label, value, col = "6" }) => (
//   <div className={`col-md-${col} mb-3`}>
//     <small className="fw-bold text-secondary">{label}</small>
//     <div className="p-2 bg-white rounded border shadow-sm">{value || "-"}</div>
//   </div>
// );

// export default DealerTableView;






import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClassicPro from "../assets/Images/ClassicPro.png";
import ClassicSuper from "../assets/Images/ClassicSuper.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllProductsDealer, getAllProductUser } from "../services/api";
import { productsData } from "@/utils/fackData/productsData";

const UserInformationView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;
  const [bike,setbike]=useState([])
    const [products, setProducts] = useState([]);




 useEffect(() => {
    const fetchIncentives = async () => {
      

      try {
        const data = await  getAllProductUser();
       setbike(data);
       console.log(data);
          setProducts(data);
         
      } catch (err) {
        setError(err.message || "Failed to fetch incentives.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncentives();
  }, []);

const BASE_URL = "https://d277w8h3-9000.inc1.devtunnels.ms/"; 

const assignedBikes = (user.evBikes).map((assigned) => {
  const matchedBike = bike.find((b) => b._id === assigned.bikeId); 

  const imgPath = matchedBike?.bikeImgs?.[0]?.replace(/\\/g, "/");
  return {
    matchedBike,
    name: matchedBike?.bikeName || "Unknown Bike",
    quantity: assigned.quantity,
    image: imgPath ? `${BASE_URL}${imgPath}` : null,
  };
});




  if (!user) {
    return (
      <div className="container py-5">
        <h5 className="text-danger">No user data found.</h5>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }
  

  
   
const handleViewDetails = (bikeId) => {
  navigate("/user-productdetails", { state: { bikeId } });
};


  

  return (
     <div className="container py-4" style={{ backgroundColor: "#f1f6ff", minHeight: "100vh" }}>

         {/* Go Back Button */}
      <div className="text-center mt-4">
        <button onClick={() => navigate(-1)} className="btn btn-outline-primary px-4 py-2 mb-4">
          ⬅️Back
        </button>
      </div>
      {/* Dealer Info Top Box */}
      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h5 className="fw-bold mb-3">Dealer Information</h5>
        <div className="row">
          <div className="col-md-6">
            <p><strong>Name :</strong> {user.name}</p>
            <p><strong>Email :</strong> {user.email}</p>
            <p><strong>Role :</strong> {user.role}</p>
            <p><strong>BankAccountNumber :</strong> {user.bankAccountNumber}</p>
              <p><strong>Deposit :</strong> {user.deposit}</p>
              <p><strong> IFCE  :</strong> {user.ifsc }</p>
                 <p><strong>LandRequired :</strong> {user.landRequired}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Aadhar :</strong> {user.aadhar}</p>
            <p><strong>PAN :</strong> {user.pan}</p>
            <p><strong>Address :</strong> {user.address}</p>
             <p><strong>Country:</strong> {user.country}</p>
              <p><strong> State:</strong> {user.state}</p>
                <p><strong>City :</strong> {user.city}</p>
                   <p><strong>RequiredStaff :</strong> {user.requiredStaff}</p>

          </div>
        </div>
      </div>

      {/* EV Bike Cards */}
       {/* EV Bike Cards */}
      <div className="row">
        {assignedBikes.length > 0 ? (
          assignedBikes.map((bike, index) => (
            <div className="col-lg-3 col-md-6 col-12 mb-3 rounded-3  " key={bike.id}>
              <div className="card shadow-sm h-100 ">
                {bike.image ? (
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-secondary text-white"
                    style={{ height: "180px" }}
                  >
                    No Image
                  </div>
                )}
                <div className="card-body">
                  <h6 className="card-title text-primary">{bike.name}</h6>
                  <p className="card-text text-secondary">Quantity: {bike.quantity}</p>
                </div>
                


          
        <button onClick={() => handleViewDetails(bike.matchedBike._id)}>
  View Details
</button>

      
                                    
              </div>

                                     
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No bikes assigned.</div>
        )}
      </div>

   
    </div>
  );
};

// Section Wrapper
const Section = ({ title, children }) => (
  <div className="mb-4">
    <h6 className="text-primary border-bottom pb-2 mb-3">{title}</h6>
    {children}
  </div>
);

// Info Field
const Field = ({ label, value, col = "6" }) => (
  <div className={`col-md-${col} mb-3`}>
    <small className="fw-bold text-secondary">{label}</small>
    <div className="p-2 bg-white rounded border shadow-sm">{value || "-"}</div>
  </div>
);

export default UserInformationView;