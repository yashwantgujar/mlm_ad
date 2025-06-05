// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
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
;

// const AddProductListBySubDealer = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await getAllProductsSubDealer();
//         if (response && response.bikes) {
//           setProducts(response.bikes);
//         } else {
//           setProducts([]);
//           console.warn("No 'bikes' array found in the response from getProductByDealer");
//         }
//       } catch (err) {
//         console.error("Failed to fetch dealer's products", err);
//         setError(err.message || "Failed to load products. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleViewDetails = (product) => {
//     navigate("/dealer-productdetails", { state: { product } });
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//         <CircularProgress />
//         <Typography sx={{ ml: 2 }}>Loading products...</Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ px: 4, py: 5, textAlign: 'center' }}>
//         <Typography variant="h5" color="error">
//           Error: {error}
//         </Typography>
//         <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
//           Retry
//         </Button>
//       </Box>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <Box sx={{ px: 4, py: 5, textAlign: 'center' }}>
//         <Typography variant="h5" color="text.secondary">
//           No products assigned to you yet.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 5 }}>
//       <Typography
//         variant="h4"
//         align="center"
//         color="green"
//         fontWeight="bold"
//         gutterBottom
//         sx={{ mb: 4 }}
//       >
//         🚲 Your Assigned Electric Bikes
//       </Typography>

//       <Grid container spacing={3}>
//         {products.map((product) => {
//           const priceExcludingGST = product.bikePrice;
//           const displayPrice = product.displayPrice || Math.round(priceExcludingGST * 1.10);
//           const mrp = product.mrp || Math.round(displayPrice * 1.15);
//           const discountPercentage = mrp && displayPrice ? Math.round(100 - (displayPrice / mrp) * 100) : 0;

//           const imageUrl = product.bikeImgs?.[0]
//             ? `${process.env.REACT_APP_API_BASE_URL || 'https://d277w8h3-9000.inc1.devtunnels.ms'}/${product.bikeImgs[0].replace(/\\/g, "/")}`
//             : "/placeholder-image.png";

//           return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                   borderRadius: "12px",
//                   transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//                   "&:hover": {
//                     transform: "translateY(-5px)",
//                     boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
//                   },
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="220"
//                   image={imageUrl}
//                   alt={product.bikeName}
//                   sx={{
//                     objectFit: "contain",
//                     p: 1,
//                   }}
//                 />

//                 <CardContent sx={{ flexGrow: 1, p: 2 }}>
//                   <Typography variant="h6" fontWeight="bold" noWrap gutterBottom title={product.bikeName}>
//                     {product.bikeName}
//                   </Typography>

//                   <Stack spacing={0.5} mb={2}>
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Battery:</strong>{" "}
//                       {product.batteryLithium || product.batteryLead || 'N/A'}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Range:</strong> {product.range || 'N/A'} km/charge
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Warranty:</strong> {product.warranty || 'N/A'}
//                     </Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'blue' }}>
//                       <strong>Stock:</strong> {product.quantity} units
//                     </Typography>
//                   </Stack>

//                   <Box display="flex" alignItems="baseline" mb={2}>
//                     <Typography
//                       variant="h5"
//                       color="primary.main"
//                       fontWeight="bold"
//                       mr={1}
//                     >
//                       ₹{displayPrice.toLocaleString()}
//                     </Typography>
//                     {mrp > displayPrice && (
//                       <Typography
//                         variant="body1"
//                         color="text.disabled"
//                         sx={{ textDecoration: "line-through" }}
//                       >
//                         ₹{mrp.toLocaleString()}
//                       </Typography>
//                     )}
//                   </Box>
//                   {discountPercentage > 0 && (
//                     <Chip
//                       label={`${discountPercentage}% OFF`}
//                       color="error"
//                       size="small"
//                       sx={{ mb: 2, fontWeight: 'bold' }}
//                     />
//                   )}

//                   <Button
//                     variant="contained"
//                     fullWidth
//                     sx={{
//                       fontWeight: "bold",
//                       py: 1.2,
//                       fontSize: '0.9rem'
//                     }}
//                     onClick={() => handleViewDetails(product)}
//                   >
//                     View Details
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// };

// export default AddProductListBySubDealer;





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
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
// import { getAllProductsSubDealer } from "../services/api";

// const AddProductListBySubDealer = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await getAllProductsSubDealer();
//         if (response && response.bikes) {
//           setProducts(response.bikes);
//         } else {
//           setProducts([]);
//           console.warn("No 'bikes' array found in the response");
//         }
//       } catch (err) {
//         console.error("Failed to fetch dealer's products", err);
//         setError(err.message || "Failed to load products. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

// const handleViewDetails = (assignedBike) => {
//   navigate("/product-details", {
//     state: {
//       product: {
//         ...assignedBike.matchedBike,     
//         quantity: assignedBike.quantity, 
//       },
//     },
//   });
// };


//   if (loading) {
//     return (
//       <Box className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
//         <CircularProgress />
//         <Typography sx={{ ml: 2 }}>Loading products...</Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box className="text-center p-4">
//         <Typography variant="h5" color="error">Error: {error}</Typography>
//         <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
//           Retry
//         </Button>
//       </Box>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <Box className="text-center p-4">
//         <Typography variant="h5" color="text.secondary">
//           No products assigned to you yet.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box className="container py-5">
//       <Typography
//         variant="h4"
//         align="center"
//         color="green"
//         fontWeight="bold"
//         gutterBottom
//         sx={{ mb: 4 }}
//       >
//         🚲 Your Assigned Electric Bikes
//       </Typography>

//       <div className="row g-4">
//         {products.map((product, index) => {
//           const priceExcludingGST = product.bikePrice;
//           const displayPrice = product.displayPrice || Math.round(priceExcludingGST * 1.10);
//           const mrp = product.mrp || Math.round(displayPrice * 1.15);
//           const discountPercentage = mrp && displayPrice ? Math.round(100 - (displayPrice / mrp) * 100) : 0;

//           const imageUrl = product.bikeImgs?.[0]
//             ? `${process.env.REACT_APP_API_BASE_URL || 'https://d277w8h3-9000.inc1.devtunnels.ms'}/${product.bikeImgs[0].replace(/\\/g, "/")}`
//             : "/placeholder-image.png";

//           return (
//             <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
//               <Card
//                 sx={{
//                   borderRadius: '20px',
//                   overflow: 'hidden',
//                   height: '100%',
//                   boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
//                   transition: 'all 0.3s ease-in-out',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   '&:hover': {
//                     transform: 'scale(1.02)',
//                     boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
//                   },
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="220"
//                   image={imageUrl}
//                   alt={product.bikeName}
//                   sx={{ objectFit: "cover", borderRadius: "12px 12px 0 0" }}
//                 />

//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography variant="h6" fontWeight="bold" noWrap title={product.bikeName}>
//                     {product.bikeName}
//                   </Typography>

//                   <Stack spacing={0.5} mb={2}>
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Battery:</strong>{" "}
//                       {product.batteryLithium || product.batteryLead || 'N/A'}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Range:</strong> {product.range || 'N/A'} km/charge
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Warranty:</strong> {product.warranty || 'N/A'}
//                     </Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'blue' }}>
//                       <strong>Stock:</strong> {product.quantity} units
//                     </Typography>
//                   </Stack>

//                   <Box display="flex" alignItems="baseline" mb={2}>
//                     <Typography
//                       variant="h5"
//                       color="primary.main"
//                       fontWeight="bold"
//                       mr={1}
//                     >
//                       ₹{displayPrice.toLocaleString()}
//                     </Typography>
//                     {mrp > displayPrice && (
//                       <Typography
//                         variant="body1"
//                         color="text.disabled"
//                         sx={{ textDecoration: "line-through" }}
//                       >
//                         ₹{mrp.toLocaleString()}
//                       </Typography>
//                     )}
//                   </Box>
//                   {discountPercentage > 0 && (
//                     <Chip
//                       label={`${discountPercentage}% OFF`}
//                       color="error"
//                       size="small"
//                       sx={{ mb: 2, fontWeight: 'bold' }}
//                     />
//                   )}

//                   <Button
//                     variant="contained"
//                     fullWidth
//                     sx={{
//                       fontWeight: "bold",
//                       py: 1.2,
//                       fontSize: '0.95rem',
//                       backgroundColor: '#007b5e',
//                       '&:hover': {
//                         backgroundColor: '#005f46',
//                         transform: 'scale(1.03)',
//                         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
//                       },
//                       transition: 'all 0.3s ease-in-out',
//                     }}
//                     onClick={() => handleViewDetails(product)}
//                   >
//                     View Details
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           );
//         })}
//       </div>
//     </Box>
//   );
// };

// export default AddProductListBySubDealer;



// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Grid,
// //   Card,
// //   CardMedia,
// //   CardContent,
// //   Typography,
// //   Button,
// //   Box,
// //   Chip,
// //   Stack,
// //   CircularProgress, // For loading state
// // } from "@mui/material";
// // import {
// //   getProductById,
// //   getProductByDealer, // This will fetch the dealer's specific bikes
// //   // profile, // No longer needed here if getProductByDealer is sufficient
// // } from "../services/api";
// // import { Details } from "@mui/icons-material";
// // import DealerProductDetails from "../pages/DealerProductDetails"

// // const AddProductListByDealer = () => {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true); // Add loading state
// //   const [error, setError] = useState(null); // Add error state
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       setError(null);
// //       try {
// //         // The getProductByDealer service now calls the /owned-bikes endpoint
// //         // which returns the bikes specifically assigned to this dealer, including their quantity.
// //         const response = await getProductByDealer(); // response will be { message: "...", bikes: [...] }
        
// //         if (response && response.bikes) {
// //           setProducts(response.bikes);
// //         } else {
// //           setProducts([]); // Set to empty array if bikes property is missing
// //           console.warn("No 'bikes' array found in the response from getProductByDealer");
// //         }

// //       } catch (err) {
// //         console.error("Failed to fetch dealer's products", err);
// //         setError(err.message || "Failed to load products. Please try again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   // const handleBuyNow = async (id) => {
// //   //   try {
// //   //     // getProductById likely returns the full product details from the main products collection
// //   //     const productDetails = await getProductById(id);
// //   //     // You might want to merge the quantity from the 'products' state if needed on the details page
// //   //     // For now, just navigating with general product details
// //   //     navigate("/dealer-productdetails", { state: { product: DealerProductDetails.product } }); // Assuming productDetails is { message: "...", product: {...} }
// //   //   } catch (err) {
// //   //     console.error("Failed to fetch product by ID", err);
// //   //     // Handle error (e.g., show a notification)
// //   //   }
// //   // };

// //    const handleBuyNow = async (id) => {
// //           try {
// //             const productData = await getProductById(id);
// //             navigate("/dealer-productdetails", { state: { product: DealerProductDetails } });
// //           } catch (err) {
// //             console.error("Failed to fetch product by ID", err);
// //           }
// //         };

// //   if (loading) {
// //     return (
// //       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
// //         <CircularProgress />
// //         <Typography sx={{ ml: 2 }}>Loading products...</Typography>
// //       </Box>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Box sx={{ px: 4, py: 5, textAlign: 'center' }}>
// //         <Typography variant="h5" color="error">
// //           Error: {error}
// //         </Typography>
// //         <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
// //           Retry
// //         </Button>
// //       </Box>
// //     );
// //   }

// //   if (products.length === 0) {
// //     return (
// //       <Box sx={{ px: 4, py: 5, textAlign: 'center' }}>
// //         <Typography variant="h5" color="text.secondary">
// //           No products assigned to you yet.
// //         </Typography>
// //       </Box>
// //     );
// //   }


// //   return (
// //     <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 5 }}>
// //       <Typography
// //         variant="h4"
// //         align="center"
// //         color="green"
// //         fontWeight="bold"
// //         gutterBottom
// //         sx={{ mb: 4 }}
// //       >
// //         🚲 Your Assigned Electric Bikes
// //       </Typography>

// //       <Grid container spacing={3}> {/* Adjusted spacing */}
// //         {products.map((product) => { // product here includes quantity
// //           // Assuming bikePrice is the dealer's cost or a base price
// //           // Your original calculation seemed to imply bikePrice was ex-GST
// //           // If bikePrice is already inclusive of GST, adjust this.
// //           const priceExcludingGST = product.bikePrice; // This should be the price before dealer margin or display price adjustments
// //           const displayPrice = product.displayPrice || Math.round(priceExcludingGST * 1.10); // Example: 10% markup, or use a dedicated displayPrice field
// //           const mrp = product.mrp || Math.round(displayPrice * 1.15); // Example: 15% higher MRP for discount illusion

// //           const discountPercentage = mrp && displayPrice ? Math.round(100 - (displayPrice / mrp) * 100) : 0;


// //           const imageUrl = product.bikeImgs?.[0]
// //             ? `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'}/${product.bikeImgs[0].replace(/\\/g, "/")}`
// //             : "/placeholder-image.png"; // Use a placeholder

// //           return (
// //             <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}> {/* Use product._id as key */}
// //               <Card
// //                 sx={{
// //                   height: "100%",
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// //                   borderRadius: "12px",
// //                   transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
// //                   "&:hover": {
// //                     transform: "translateY(-5px)",
// //                     boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
// //                   },
// //                 }}
// //               >
// //                 <CardMedia
// //                   component="img"
// //                   height="220" // Slightly increased height
// //                   image={imageUrl}
// //                   alt={product.bikeName}
// //                   sx={{
// //                     objectFit: "contain", // 'cover' might be better if images are well-cropped
// //                     p: 1, // Reduced padding
// //                   }}
// //                 />

// //                 <CardContent sx={{ flexGrow: 1, p: 2 }}> {/* Consistent padding */}
// //                   <Typography variant="h6" fontWeight="bold" noWrap gutterBottom title={product.bikeName}>
// //                     {product.bikeName}
// //                   </Typography>

// //                   <Stack spacing={0.5} mb={2}> {/* Reduced spacing */}
// //                     <Typography variant="body2" color="text.secondary">
// //                       <strong>Battery:</strong>{" "}
// //                       {product.batteryLithium || product.batteryLead || 'N/A'}
// //                     </Typography>
// //                     <Typography variant="body2" color="text.secondary">
// //                       <strong>Range:</strong> {product.range || 'N/A'} km/charge
// //                     </Typography>
// //                     <Typography variant="body2" color="text.secondary">
// //                       <strong>Warranty:</strong> {product.warranty || 'N/A'}
// //                     </Typography>
// //                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', color: 'blue' }}>
// //                       <strong>Stock:</strong> {product.quantity} units {/* Display dealer's stock quantity */}
// //                     </Typography>
// //                   </Stack>

// //                   <Box display="flex" alignItems="baseline" mb={2}> {/* Use baseline for better price alignment */}
// //                     <Typography
// //                       variant="h5" // Slightly larger
// //                       color="primary.main" // Use theme color
// //                       fontWeight="bold"
// //                       mr={1}
// //                     >
// //                       ₹{displayPrice.toLocaleString()}
// //                     </Typography>
// //                     {mrp > displayPrice && (
// //                       <Typography
// //                         variant="body1" // Slightly larger
// //                         color="text.disabled" // More subtle
// //                         sx={{ textDecoration: "line-through" }}
// //                       >
// //                         ₹{mrp.toLocaleString()}
// //                       </Typography>
// //                     )}
// //                   </Box>
// //                   {discountPercentage > 0 && (
// //                      <Chip
// //                         label={`${discountPercentage}% OFF`}
// //                         color="error"
// //                         size="small"
// //                         sx={{ mb: 2, fontWeight: 'bold' }} // Added margin bottom
// //                       />
// //                   )}

// //                   <Button
// //                     variant="contained"
// //                     fullWidth
// //                     // color="secondary" // Example: Use theme secondary color
// //                     sx={{
// //                       // backgroundColor: "#ff9800", // Can be kept or use theme color
// //                       // color: "#fff",
// //                       fontWeight: "bold",
// //                       // "&:hover": {
// //                       //   backgroundColor: "#e68900",
// //                       // },
// //                       py: 1.2, // Padding
// //                       fontSize: '0.9rem'
// //                     }}
// //                     onClick={() => handleBuyNow(product._id)}
// //                   >
// //                     View Details
// //                   </Button>
// //                 </CardContent>
// //               </Card>
// //             </Grid>
// //           );
// //         })}
// //       </Grid>
// //     </Box>
// //   );
// // };

// // export default AddProductListByDealer;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
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
// import { getProductByDealer } from "../services/api";

// const AddProductListByDealer = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await getProductByDealer();
//         if (response && response.bikes) {
//           setProducts(response.bikes);
//         } else {
//           setProducts([]);
//           console.warn("No 'bikes' array found in the response from getProductByDealer");
//         }
//       } catch (err) {
//         console.error("Failed to fetch dealer's products", err);
//         setError(err.message || "Failed to load products. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleViewDetails = (product) => {
//     navigate("/dealer-productdetails", { state: { product } });
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//         <CircularProgress />
//         <Typography sx={{ ml: 2 }}>Loading products...</Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ px: 4, py: 5, textAlign: 'center' }}>
//         <Typography variant="h5" color="error">
//           Error: {error}
//         </Typography>
//         <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
//           Retry
//         </Button>
//       </Box>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <Box sx={{ px: 4, py: 5, textAlign: 'center' }}>
//         <Typography variant="h5" color="text.secondary">
//           No products assigned to you yet.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 5 }}>
//       <Typography
//         variant="h4"
//         align="center"
//         color="green"
//         fontWeight="bold"
//         gutterBottom
//         sx={{ mb: 4 }}
//       >
//         🚲 Your Assigned Electric Bikes
//       </Typography>

//       <Grid container spacing={3}>
//         {products.map((product) => {
//           const priceExcludingGST = product.bikePrice;
//           const displayPrice = product.displayPrice || Math.round(priceExcludingGST * 1.10);
//           const mrp = product.mrp || Math.round(displayPrice * 1.15);
//           const discountPercentage = mrp && displayPrice ? Math.round(100 - (displayPrice / mrp) * 100) : 0;

//           const imageUrl = product.bikeImgs?.[0]
//             ? `${process.env.REACT_APP_API_BASE_URL || 'https://d277w8h3-9000.inc1.devtunnels.ms'}/${product.bikeImgs[0].replace(/\\/g, "/")}`
//             : "/placeholder-image.png";

//           return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                   borderRadius: "12px",
//                   transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//                   "&:hover": {
//                     transform: "translateY(-5px)",
//                     boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
//                   },
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="220"
//                   image={imageUrl}
//                   alt={product.bikeName}
//                   sx={{
//                     objectFit: "contain",
//                     p: 1,
//                   }}
//                 />

//                 <CardContent sx={{ flexGrow: 1, p: 2 }}>
//                   <Typography variant="h6" fontWeight="bold" noWrap gutterBottom title={product.bikeName}>
//                     {product.bikeName}
//                   </Typography>

//                   <Stack spacing={0.5} mb={2}>
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Battery:</strong>{" "}
//                       {product.batteryLithium || product.batteryLead || 'N/A'}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Range:</strong> {product.range || 'N/A'} km/charge
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Warranty:</strong> {product.warranty || 'N/A'}
//                     </Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'blue' }}>
//                       <strong>Stock:</strong> {product.quantity} units
//                     </Typography>
//                   </Stack>

//                   <Box display="flex" alignItems="baseline" mb={2}>
//                     <Typography
//                       variant="h5"
//                       color="primary.main"
//                       fontWeight="bold"
//                       mr={1}
//                     >
//                       ₹{displayPrice.toLocaleString()}
//                     </Typography>
//                     {mrp > displayPrice && (
//                       <Typography
//                         variant="body1"
//                         color="text.disabled"
//                         sx={{ textDecoration: "line-through" }}
//                       >
//                         ₹{mrp.toLocaleString()}
//                       </Typography>
//                     )}
//                   </Box>
//                   {discountPercentage > 0 && (
//                     <Chip
//                       label={`${discountPercentage}% OFF`}
//                       color="error"
//                       size="small"
//                       sx={{ mb: 2, fontWeight: 'bold' }}
//                     />
//                   )}

//                   <Button
//                     variant="contained"
//                     fullWidth
//                     sx={{
//                       fontWeight: "bold",
//                       py: 1.2,
//                       fontSize: '0.9rem'
//                     }}
//                     onClick={() => handleViewDetails(product)}
//                   >
//                     View Details
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// };

// export default AddProductListByDealer;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import {   getAllProductsSubDealer, getAllProductSubDealer} from "../services/api";

const  AddProductListByDealer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await  getAllProductsSubDealer();
        if (response && response.bikes) {
          setProducts(response.bikes);
          console.log(products);
        } else {
          setProducts([]);
          console.warn("No 'bikes' array found in the response from getProductByDealer");
        }
      } catch (err) {
        console.error("Failed to fetch dealer's products", err);
        setError(err.message || "Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const handleViewDetails = (product) => {
  //   navigate("/dealer-productdetails", { state: { product } });
  // };


  const handleViewDetails = (bikeId) => {
  navigate("/subdealer-productdetails", { state: { bikeId } });
};

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading products...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ px: 4, py: 5, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Error: {error}
        </Typography>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeff3',
        px: 2,
      }}
    >
      {/* Back Button */}
      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
        <Button
          startIcon='<'
          onClick={() => navigate(-1)}
          variant="outlined"
        >
          Back
        </Button>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          px: 4,
          py: 6,
          textAlign: 'center',
          backgroundColor: '#f0f4f8',
          borderRadius: 4,
          boxShadow: 1,
          maxWidth: 800,
          width: '100%',
        }}
      >
        <Typography variant="h3" sx={{ mb: 1 }}>
          🛒❌
        </Typography>
        <Typography variant="h6" color="text.secondary">
          No products assigned to you yet.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Please check back later.
        </Typography>
      </Box>
    </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py:1}}>
      <div className="text-center mt-2">
        <button onClick={() => navigate(-1)} className="btn btn-outline-primary px-4 py-2 mb-4">
          ⬅️Back
        </button>
      </div>
     
      <Typography
        variant="h4"
        align="center"
        color="green"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 2 }}
      >
        🚲 Your Assigned Electric Bikes
      </Typography>
       

      <Grid item xs={12} sm={12} md={6} lg={6}  container
  spacing={3}
  sx={{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // center align horizontally
    gap: 3, // space between cards
  }} >
    
        
        
        {products.map((product) => {
          const priceExcludingGST = product.bikePrice;
          const displayPrice = product.displayPrice || Math.round(priceExcludingGST * 1.10);
          const mrp = product.mrp || Math.round(displayPrice * 1.15);
          const discountPercentage = mrp && displayPrice ? Math.round(100 - (displayPrice / mrp) * 100) : 0;

          const imageUrl = product.bikeImgs?.[0]
            ? `${process.env.REACT_APP_API_BASE_URL || 'https://d277w8h3-9000.inc1.devtunnels.ms'}/${product.bikeImgs[0].replace(/\\/g, "/")} `
            : "/placeholder-image.png";

          return (
            <Grid  >
              <Card
              
                sx={{
    width: '500px',
    height: '100%',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
    },
  }}
              >
                <CardMedia
                  // component="img"
                  // height="220"
                  // image={imageUrl}
                  // alt={product.bikeName}
                  // sx={{
                  //   objectFit: "contain",
                  //   p: 1,
                  // }}

                            component="img"
            height="260"
            image={imageUrl}
            alt={product.bikeName}
            sx={{
              objectFit: "cover",
              borderRadius: "12px 12px 0 0",
  }}
                 
                />

                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography variant="h6" fontWeight="bold" noWrap gutterBottom title={product.bikeName}>
                    {product.bikeName}
                  </Typography>

                  <Stack spacing={0.5} mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Battery:</strong>{" "}
                      {product.batteryLithium || product.batteryLead || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Range:</strong> {product.range || 'N/A'} km/charge
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Warranty:</strong> {product.warranty || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'blue' }}>
                      <strong>Stock:</strong> {product.quantity} units
                    </Typography>
                  </Stack>

                  <Box display="flex" alignItems="baseline" mb={2}>
                    <Typography
                      variant="h5"
                      color="primary.main"
                      fontWeight="bold"
                      mr={1}
                    >
                      ₹{displayPrice.toLocaleString()}
                    </Typography>
                    {mrp > displayPrice && (
                      <Typography
                        variant="body1"
                        color="text.disabled"
                        sx={{ textDecoration: "line-through" }}
                      >
                        ₹{mrp.toLocaleString()}
                      </Typography>
                    )}
                  </Box>
                  {discountPercentage > 0 && (
                    <Chip
                      label={`${discountPercentage}% OFF`}
                      color="error"
                      size="small"
                      sx={{ mb: 2, fontWeight: 'bold' }}
                    />
                  )}

                <Button variant="contained" fullWidth onClick={() => handleViewDetails(product._id)}>
                  View Details
                </Button>

                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default  AddProductListByDealer;