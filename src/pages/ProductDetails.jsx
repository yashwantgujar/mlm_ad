// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   TextField,
//   Snackbar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   TableContainer,
//   Paper,
//   Alert,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { deleteProduct, editProductById } from "../services/api";

// const ProductDetails = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state || !state.product) {
//     return (
//       <Typography mt={5} textAlign="center">
//         No product details found.
//       </Typography>
//     );
//   }

//   const originalProduct = state.product;
//   const [product, setProduct] = useState({ ...originalProduct });
//   const [editMode, setEditMode] = useState(false);
//   const [selectedImageIndex] = useState(0);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [confirmOpen, setConfirmOpen] = useState(false);

//   const getImageSrc = () => {
//     const img = product.bikeImgs?.[selectedImageIndex] || product.bikeImgs?.[0];
//     return img ? `https://d277w8h3-9000.inc1.devtunnels.ms/${img.replace(/\\/g, "/")}` : "";
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteProduct(product._id);
//       setSnackbarMsg("Product deleted successfully.");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//       navigate("/all-product-list-by-admin");
//     } catch (error) {
//       setSnackbarMsg("Delete failed!");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await editProductById(product._id, product);
//       setSnackbarMsg("Product updated successfully.");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//       setEditMode(false);
//     } catch (error) {
//       setSnackbarMsg("Update failed!");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;
//     setProduct((prev) => ({
//       ...prev,
//       [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
//     }));
//   };

//   const productFields = [
//     ["Bike Name", "bikeName"],
//     ["Price", "bikePrice"],
//     ["TRANSMISSION", "transmission"],
//     ["MOTOR", "motor"],
//     ["DIMENSIONS", "dimensions"],
//     ["WHEELBASE", "wheelbase"],
//     ["GROUND CLEARANCE", "groundClearance"],
//     ["KERB WEIGHT", "kerbWeight"],
//     ["LOADING CAPACITY", "loadingCapacity"],
//     ["TYRE (F & R)", "tyreFR"],
//     ["BRAKE (F & R)", "brakeFR"],
//     ["BATTERY TYPE", "batteryType"],
//     ["BATTERY LEAD", "batteryLead"],
//     ["CHARGING TIME LEAD", "chargingTimeLead"],
//     ["RANGE LEAD", "rangeLead"],
//     ["BATTERY LITHIUM", "batteryLithium"],
//     ["CHARGING TIME LITHIUM", "chargingTimeLithium"],
//     ["RANGE LITHIUM", "rangeLithium"],
//     ["COLOR", "colors"],
//     ["Quantity", "quantity"],
//   ];

//   return (
//     <Box p={3}>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity={snackbarSeverity} variant="filled">
//           {snackbarMsg}
//         </Alert>
//       </Snackbar>

//       <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this product?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmOpen(false)}>No</Button>
//           <Button onClick={handleDelete} color="error">
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Card sx={{ display: "flex", mb: 4, boxShadow: 3, flexDirection: "column" }}>
//         {/* Quantity at the top */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             p: 2,
//             backgroundColor: "#f5f5f5",
//           }}
//         >
//           <Typography variant="h6">Quantity:</Typography>
//           {editMode ? (
//             <TextField
//               name="quantity"
//               type="number"
//               size="small"
//               value={product.quantity ?? ""}
//               onChange={handleInputChange}
//               sx={{ width: 100 }}
//             />
//           ) : (
//             <Typography variant="body1">{product.quantity ?? "N/A"}</Typography>
//           )}
//         </Box>

//         <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
//           <CardMedia
//             component="img"
//             image={getImageSrc()}
//             alt="Bike"
//             sx={{
//               width: { xs: "100%", md: 400 },
//               objectFit: "contain",
//               backgroundColor: "#eee",
//             }}
//           />
//           <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
//             <CardContent>
//               <Typography variant="h5" gutterBottom>
//                 {product.bikeName} - ₹{product.bikePrice}
//               </Typography>

//               {editMode ? (
//                 <Grid container spacing={2}>
//                   {productFields.map(([label, key]) => (
//                     <Grid item xs={12} sm={6} key={key}>
//                       <TextField
//                         label={label}
//                         fullWidth
//                         name={key}
//                         value={product[key] ?? ""}
//                         onChange={handleInputChange}
//                         type={key === "quantity" || key === "bikePrice" ? "number" : "text"}
//                       />
//                     </Grid>
//                   ))}
//                 </Grid>
//               ) : (
//                 <TableContainer component={Paper} sx={{ mt: 2 }}>
//                   <Table>
//                     <TableBody>
//                       {productFields.map(([label, key]) => (
//                         <TableRow key={key}>
//                           <TableCell sx={{ fontWeight: 600 }}>{label}</TableCell>
//                           <TableCell>{product[key]}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}
//             </CardContent>

//             <Box p={2} display="flex" gap={2} justifyContent="flex-end">
//               {editMode ? (
//                 <>
//                   <Button variant="contained" color="success" onClick={handleSaveEdit}>
//                     Save
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     onClick={() => {
//                       setEditMode(false);
//                       setProduct({ ...originalProduct });
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button variant="contained" color="warning" onClick={() => setEditMode(true)}>
//                     Edit
//                   </Button>
//                   <Button variant="contained" color="error" onClick={() => setConfirmOpen(true)}>
//                     Delete
//                   </Button>
//                 </>
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Card>
//     </Box>
//   );
// };

// export default ProductDetails;





// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardMedia,
//   Typography,
//   Button,
//   Grid,
//   TextField,
//   Snackbar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { deleteProduct, editProductById } from "../services/api";

// const ProductDetails = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state || !state.product) {
//     return (
//       <Typography mt={5} textAlign="center">
//         No product details found.
//       </Typography>
//     );
//   }

//   const originalProduct = state.product;
//   const [product, setProduct] = useState({ ...originalProduct });
//   const [editMode, setEditMode] = useState(false);
//   const [selectedImageIndex] = useState(0);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [confirmOpen, setConfirmOpen] = useState(false);

//   const getImageSrc = () => {
//     const img = product.bikeImgs?.[selectedImageIndex] || product.bikeImgs?.[0];
//     return img ? `https://d277w8h3-9000.inc1.devtunnels.ms/${img.replace(/\\/g, "/")}` : "";
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteProduct(product._id);
//       setSnackbarMsg("Product deleted successfully.");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//       navigate("/all-product-list-by-admin");
//     } catch (error) {
//       setSnackbarMsg("Delete failed!");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await editProductById(product._id, product);
//       setSnackbarMsg("Product updated successfully.");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//       setEditMode(false);
//     } catch (error) {
//       setSnackbarMsg("Update failed!");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;
//     setProduct((prev) => ({
//       ...prev,
//       [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
//     }));
//   };

//   const productFields = [
//     ["Price", "bikePrice"],
//     ["TRANSMISSION", "transmission"],
//     ["MOTOR", "motor"],
//     ["DIMENSIONS", "dimensions"],
//     ["WHEELBASE", "wheelbase"],
//     ["GROUND CLEARANCE", "groundClearance"],
//     ["KERB WEIGHT", "kerbWeight"],
//     ["LOADING CAPACITY", "loadingCapacity"],
//     ["TYRE (F & R)", "tyreFR"],
//     ["BRAKE (F & R)", "brakeFR"],
//     ["BATTERY TYPE", "batteryType"],
//     ["BATTERY LEAD", "batteryLead"],
//     ["CHARGING TIME LEAD", "chargingTimeLead"],
//     ["RANGE LEAD", "rangeLead"],
//     ["BATTERY LITHIUM", "batteryLithium"],
//     ["CHARGING TIME LITHIUM", "chargingTimeLithium"],
//     ["RANGE LITHIUM", "rangeLithium"],
//     ["COLOR", "colors"],
//     ["Quantity", "quantity"],
//   ];

//   return (
//     <Box p={3}>
//       {/* Snackbar and Confirm Dialog */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity={snackbarSeverity} variant="filled">
//           {snackbarMsg}
//         </Alert>
//       </Snackbar>

//       <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this product?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmOpen(false)}>No</Button>
//           <Button onClick={handleDelete} color="error">
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Single Card Layout */}
//       <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
//         <Grid container spacing={4}>
//           {/* Left: Image */}
//           <Grid item xs={12} md={4}>
//             <CardMedia
//               component="img"
//               image={getImageSrc()}
//               alt={product.bikeName}
//               sx={{
//                 width: "100%",
//                 height: 300,
//                 objectFit: "contain",
//                 borderRadius: 3,
//                 backgroundColor: "#f5f5f5",
//               }}
//             />
//           </Grid>

//           {/* Right: Full Details */}
//           <Grid item xs={12} md={8}>
//             <Typography variant="h5" fontWeight="bold" gutterBottom>
//               {product.bikeName}
//             </Typography>

//             <Grid container spacing={2}>
//               {productFields.map(([label, key]) => (
//                 <Grid item xs={12} sm={6} key={key}>
//                   {editMode ? (
//                     <TextField
//                       label={label}
//                       fullWidth
//                       name={key}
//                       value={product[key] ?? ""}
//                       onChange={handleInputChange}
//                       type={["quantity", "bikePrice"].includes(key) ? "number" : "text"}
//                     />
//                   ) : (
//                     <Box
//                       p={1.2}
//                       border={1}
//                       borderRadius={2}
//                       borderColor="#ddd"
//                       display="flex"
//                       justifyContent="space-between"
                      
//                     >
//                       <Typography fontWeight={500} color="text.secondary col-12 col-sm-6 mb-2">
//                         {label}
//                       </Typography>
//                       <Typography >{product[key] || "N/A"}</Typography>
//                     </Box>
//                   )}
//                 </Grid>
//               ))}
//             </Grid>

//             <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
//               {editMode ? (
//                 <>
//                   <Button variant="contained" color="success" onClick={handleSaveEdit}>
//                     Save
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     onClick={() => {
//                       setEditMode(false);
//                       setProduct({ ...originalProduct });
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button variant="contained" color="warning" onClick={() => setEditMode(true)}>
//                     Edit
//                   </Button>
//                   <Button variant="contained" color="error" onClick={() => setConfirmOpen(true)}>
//                     Delete
//                   </Button>
//                 </>
//               )}
//             </Box>
//           </Grid>
//         </Grid>
//       </Card>
//     </Box>
//   );
// };

// export default ProductDetails;


// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardMedia,
//   Typography,
//   Button,
//   Grid,
//   TextField,
//   Snackbar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { deleteProduct, editProductById } from "../services/api";

// const ProductDetails = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state || !state.product) {
//     return (
//       <Typography mt={5} textAlign="center">
//         No product details found.
//       </Typography>
//     );
//   }

//   const originalProduct = state.product;
//   const [product, setProduct] = useState({ ...originalProduct });
//   const [editMode, setEditMode] = useState(false);
//   const [selectedImageIndex] = useState(0);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [confirmOpen, setConfirmOpen] = useState(false);

//   const getImageSrc = () => {
//     const img = product.bikeImgs?.[selectedImageIndex] || product.bikeImgs?.[0];
//     return img ? `https://d277w8h3-9000.inc1.devtunnels.ms/${img.replace(/\\/g, "/")}` : "";
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteProduct(product._id);
//       setSnackbarMsg("Product deleted successfully.");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//       navigate("/all-product-list-by-admin");
//     } catch (error) {
//       setSnackbarMsg("Delete failed!");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await editProductById(product._id, product);
//       setSnackbarMsg("Product updated successfully.");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//       setEditMode(false);
//     } catch (error) {
//       setSnackbarMsg("Update failed!");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;
//     setProduct((prev) => ({
//       ...prev,
//       [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
//     }));
//   };

//   const productFields = [
//     ["Price", "bikePrice"],
//     ["TRANSMISSION", "transmission"],
//     ["MOTOR", "motor"],
//     ["DIMENSIONS", "dimensions"],
//     ["WHEELBASE", "wheelbase"],
//     ["GROUND CLEARANCE", "groundClearance"],
//     ["KERB WEIGHT", "kerbWeight"],
//     ["LOADING CAPACITY", "loadingCapacity"],
//     ["TYRE (F & R)", "tyreFR"],
//     ["BRAKE (F & R)", "brakeFR"],
//     ["BATTERY TYPE", "batteryType"],
//     ["BATTERY LEAD", "batteryLead"],
//     ["CHARGING TIME LEAD", "chargingTimeLead"],
//     ["RANGE LEAD", "rangeLead"],
//     ["BATTERY LITHIUM", "batteryLithium"],
//     ["CHARGING TIME LITHIUM", "chargingTimeLithium"],
//     ["RANGE LITHIUM", "rangeLithium"],
//     ["COLOR", "colors"],
//     ["Quantity", "quantity"],
//   ];

//   return (
//     <Box className="container py-4">
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity={snackbarSeverity} variant="filled">
//           {snackbarMsg}
//         </Alert>
//       </Snackbar>

//       <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this product?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmOpen(false)}>No</Button>
//           <Button onClick={handleDelete} color="error">
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <button className="btn btn-outline-primary mb-3" onClick={() => navigate(-1)}>
//         🔙 Back
//       </button>

//       <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
//         <Grid container className="g-0 flex-column flex-md-row">
//           {/* Left Image */}
//           <Grid item md={5} className="d-flex align-items-center justify-content-center p-3">
//             <CardMedia
//               component="img"
//               image={getImageSrc()}
//               alt={product.bikeName}
//               style={{ maxHeight: 350, objectFit: "contain" }}
//               className="img-fluid flax"
//             />
//           </Grid>

//           {/* Right Details */}
//           <Grid item md={7} className="p-4">
//             <Typography variant="h4" fontWeight="bold" color="primary">
//               {product.bikeName}
//             </Typography>
//             <Typography variant="h6" color="green" gutterBottom>
//               ₹ {product.bikePrice?.toLocaleString() || "N/A"}
//             </Typography>

//             <div className="mb-3">
//               <span className="badge bg-secondary me-2">Motor: {product.motor}</span>
//               <span className="badge bg-info text-dark me-2">
//                 Transmission: {product.transmission}
//               </span>
//               <span className="badge bg-warning text-dark">
//                 Quantity: {product.quantity || 0}
//               </span>
//             </div>

//             <hr />
//             <Typography variant="h6" gutterBottom>
//               Specifications
//             </Typography>
//             <Grid container spacing={2}>
//               {productFields.map(([label, key]) => (
//                 <Grid item xs={12} sm={6} key={key}>
//                   {editMode ? (
//                     <TextField
//                       label={label}
//                       fullWidth
//                       name={key}
//                       value={product[key] ?? ""}
//                       onChange={handleInputChange}
//                       type={["quantity", "bikePrice"].includes(key) ? "number" : "text"}
//                     />
//                   ) : (
//                     <Typography>
//                       <strong>{label}:</strong> {product[key] || "N/A"}
//                     </Typography>
//                   )}
//                 </Grid>
//               ))}
//             </Grid>

//             <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
//               {editMode ? (
//                 <>
//                   <Button variant="contained" color="success" onClick={handleSaveEdit}>
//                     Save
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     onClick={() => {
//                       setEditMode(false);
//                       setProduct({ ...originalProduct });
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button variant="contained" color="warning" onClick={() => setEditMode(true)}>
//                     Edit
//                   </Button>
//                   <Button variant="contained" color="error" onClick={() => setConfirmOpen(true)}>
//                     Delete
//                   </Button>
//                 </>
//               )}
//             </Box>
//           </Grid>
//         </Grid>
//       </Card>
//     </Box>
//   );
// };

// export default ProductDetails;


// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardMedia,
//   Typography,
//   Button,
//   TextField,
//   Snackbar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Divider,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { deleteProduct, editProductById } from "../services/api";

// const ProductDetails = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state || !state.product) {
//     return (
//       <Typography mt={5} textAlign="center">
//         No product details found.
//       </Typography>
//     );
//   }

//   const originalProduct = state.product;
//   const [product, setProduct] = useState({ ...originalProduct });
//   const [editMode, setEditMode] = useState(false);
//   const [selectedImageIndex] = useState(0);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [confirmOpen, setConfirmOpen] = useState(false);

//   const getImageSrc = () => {
//     const img = product.bikeImgs?.[selectedImageIndex] || product.bikeImgs?.[0];
//     return img
//       ? `https://d277w8h3-9000.inc1.devtunnels.ms/${img.replace(/\\/g, "/")}`
//       : "";
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteProduct(product._id);
//       setSnackbarMsg("Product deleted successfully.");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//       navigate("/all-product-list-by-admin");
//     } catch (error) {
//       setSnackbarMsg("Delete failed!");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await editProductById(product._id, product);
//       setSnackbarMsg("Product updated successfully.");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//       setEditMode(false);
//     } catch (error) {
//       setSnackbarMsg("Update failed!");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;
//     setProduct((prev) => ({
//       ...prev,
//       [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
//     }));
//   };

//   const productFields = [
//     ["Price", "bikePrice"],
//     ["TRANSMISSION", "transmission"],
//     ["MOTOR", "motor"],
//     ["DIMENSIONS", "dimensions"],
//     ["WHEELBASE", "wheelbase"],
//     ["GROUND CLEARANCE", "groundClearance"],
//     ["KERB WEIGHT", "kerbWeight"],
//     ["LOADING CAPACITY", "loadingCapacity"],
//     ["TYRE (F & R)", "tyreFR"],
//     ["BRAKE (F & R)", "brakeFR"],
//     ["BATTERY TYPE", "batteryType"],
//     ["BATTERY LEAD", "batteryLead"],
//     ["CHARGING TIME LEAD", "chargingTimeLead"],
//     ["RANGE LEAD", "rangeLead"],
//     ["BATTERY LITHIUM", "batteryLithium"],
//     ["CHARGING TIME LITHIUM", "chargingTimeLithium"],
//     ["RANGE LITHIUM", "rangeLithium"],
//     ["COLOR", "colors"],
//     ["Quantity", "quantity"],
//   ];

//   return (
//     <Box className="container py-4" >
//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity={snackbarSeverity} variant="filled">
//           {snackbarMsg}
//         </Alert>
//       </Snackbar>

//       {/* Confirm Delete Dialog */}
//       <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this product?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmOpen(false)}>No</Button>
//           <Button onClick={handleDelete} color="error">
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <button className="btn btn-outline-primary mb-3" onClick={() => navigate(-1)}>
//         🔙 Back
//       </button>

//       <Card className="shadow-lg border-0 rounded-4 p-4   maxHeight: 300," 
 
//   >

//     {/* // sx={{
//     maxHeight: "600px",          // ✅ Set max height for the full card
//     overflowY: "auto",           // ✅ Scrollable if content exceeds height
//   }} */}


//         <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}  >
//           {/* Image - left side */}
//           <Box flex="1" display="flex" alignItems="center" justifyContent="center" >
//             <CardMedia
//               component="img" sx={{
//       maxHeight: 220,
//       p: 2,
//     }}
//               image={getImageSrc()}
//               alt={product.bikeName}
              
//             />
//           </Box>

//           {/* Details - right side */}
//           <Box flex="2"  sx={{
//       p: 2,
//       overflowY: "auto", // ✅ Scroll if details overflow
//     }}>
//             <Typography variant="h4" fontWeight="bold" gutterBottom>
//               {product.bikeName}
//             </Typography>

//             <Typography variant="h5" color="green" gutterBottom>
//               ₹ {product.bikePrice?.toLocaleString() || "N/A"}
//             </Typography>

//             <Box mb={2}>
//               <Button variant="outlined" size="small" sx={{ mr: 1 }}>
//                 Motor: {product.motor}
//               </Button>
//               <Button variant="outlined" size="small" sx={{ mr: 1 }}>
//                 Transmission: {product.transmission}
//               </Button>
//               <Button variant="outlined" size="small">
//                 Quantity: {product.quantity || 0}
//               </Button>
//             </Box>

//             <Divider sx={{ my: 2 }} />

//             <Typography variant="h6" gutterBottom>
//               Specifications
//             </Typography>

//             <Box display="flex" flexWrap="wrap" gap={2}>
//               {productFields.map(([label, key]) => (
//                 <Box key={key} flexBasis={{ xs: "100%", sm: "45%" }}>
//                   {editMode ? (
//                     <TextField
//                       label={label}
//                       fullWidth
//                       name={key}
//                       value={product[key] ?? ""}
//                       onChange={handleInputChange}
//                       type={["quantity", "bikePrice"].includes(key) ? "number" : "text"}
//                       variant="outlined"
//                       size="small"
//                     />
//                   ) : (
//                     <Typography>
//                       <strong>{label}:</strong> {product[key] || "N/A"}
//                     </Typography>
//                   )}
//                 </Box>
//               ))}
//             </Box>

//             <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
//               {editMode ? (
//                 <>
//                   <Button variant="contained" color="success" onClick={handleSaveEdit}>
//                     Save
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     onClick={() => {
//                       setEditMode(false);
//                       setProduct({ ...originalProduct });
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button variant="contained" color="warning" onClick={() => setEditMode(true)}>
//                     Edit
//                   </Button>
//                   <Button variant="contained" color="error" onClick={() => setConfirmOpen(true)}>
//                     Delete
//                   </Button>
//                 </>
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Card>
//     </Box>
//   );
// };

// export default ProductDetails;





















// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardMedia,
//   Typography,
//   Button,
//   TextField,
//   Snackbar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Divider,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { deleteProduct, editProductById } from "../services/api";

// const ProductDetails = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state || !state.product) {
//     return (
//       <Typography mt={5} textAlign="center">
//         No product details found.
//       </Typography>
//     );
//   }

//   const originalProduct = state.product;
//   const [product, setProduct] = useState({ ...originalProduct });
//   const [editMode, setEditMode] = useState(false);
//   const [selectedImageIndex] = useState(0);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [confirmOpen, setConfirmOpen] = useState(false);

//   const getImageSrc = () => {
//     const img = product.bikeImgs?.[selectedImageIndex] || product.bikeImgs?.[0];
//     return img
//       ? `https://d277w8h3-9000.inc1.devtunnels.ms/${img.replace(/\\/g, "/")}`
//       : "";
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteProduct(product._id);
//       setSnackbarMsg("Product deleted successfully.");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//       navigate("/all-product-list-by-admin");
//     } catch (error) {
//       setSnackbarMsg("Delete failed!");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await editProductById(product._id, product);
//       setSnackbarMsg("Product updated successfully.");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//       setEditMode(false);
//     } catch (error) {
//       setSnackbarMsg("Update failed!");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;
//     setProduct((prev) => ({
//       ...prev,
//       [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
//     }));
//   };

//   const productFields = [
//     ["Price", "bikePrice"],
//     ["TRANSMISSION", "transmission"],
//     ["MOTOR", "motor"],
//     ["DIMENSIONS", "dimensions"],
//     ["WHEELBASE", "wheelbase"],
//     ["GROUND CLEARANCE", "groundClearance"],
//     ["KERB WEIGHT", "kerbWeight"],
//     ["LOADING CAPACITY", "loadingCapacity"],
//     ["TYRE (F & R)", "tyreFR"],
//     ["BRAKE (F & R)", "brakeFR"],
//     ["BATTERY TYPE", "batteryType"],
//     ["BATTERY LEAD", "batteryLead"],
//     ["CHARGING TIME LEAD", "chargingTimeLead"],
//     ["RANGE LEAD", "rangeLead"],
//     ["BATTERY LITHIUM", "batteryLithium"],
//     ["CHARGING TIME LITHIUM", "chargingTimeLithium"],
//     ["RANGE LITHIUM", "rangeLithium"],
//     ["COLOR", "colors"],
//     ["Quantity", "quantity"],
//   ];

//   return (
//     <Box maxWidth="1000px" mx="auto" py={3} px={2}>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity={snackbarSeverity} variant="filled">
//           {snackbarMsg}
//         </Alert>
//       </Snackbar>

//       <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this product?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmOpen(false)}>No</Button>
//           <Button onClick={handleDelete} color="error">
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
//         🔙 Back
//       </Button>

//       <Card className="shadow-sm border-0 rounded-4 p-3">
//         <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
//           {/* Image */}
//           <Box flex="1" display="flex" alignItems="center" justifyContent="center">
//             <CardMedia
//               component="img"
//               image={getImageSrc()}
//               alt={product.bikeName}
//               sx={{ maxHeight: 180, width: "100%", objectFit: "contain" }}
//             />
//           </Box>

//           {/* Details */}
//           <Box flex="2">
//             <Typography variant="h5" fontWeight="bold" gutterBottom>
//               {product.bikeName}
//             </Typography>
//             <Typography variant="subtitle1" color="green" gutterBottom>
//               ₹ {product.bikePrice?.toLocaleString() || "N/A"}
//             </Typography>

//             <Box mb={1}>
//               <Button variant="outlined" size="small" sx={{ mr: 1 }}>
//                 Motor: {product.motor}
//               </Button>
//               <Button variant="outlined" size="small" sx={{ mr: 1 }}>
//                 Transmission: {product.transmission}
//               </Button>
//               <Button variant="outlined" size="small">
//                 Quantity: {product.quantity || 0}
//               </Button>
//             </Box>

//             <Divider sx={{ my: 2 }} />

//             <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//               Specifications
//             </Typography>

//             <Box display="flex" flexWrap="wrap" gap={1}>
//               {productFields.map(([label, key]) => (
//                 <Box key={key} flexBasis={{ xs: "100%", sm: "48%" }}>
//                   {editMode ? (
//                     <TextField
//                       label={label}
//                       fullWidth
//                       name={key}
//                       value={product[key] ?? ""}
//                       onChange={handleInputChange}
//                       type={["quantity", "bikePrice"].includes(key) ? "number" : "text"}
//                       variant="outlined"
//                       size="small"
//                       InputProps={{ style: { fontSize: 13 } }}
//                       InputLabelProps={{ style: { fontSize: 13 } }}
//                     />
//                   ) : (
//                     <Typography fontSize={13}>
//                       <strong>{label}:</strong> {product[key] || "N/A"}
//                     </Typography>
//                   )}
//                 </Box>
//               ))}
//             </Box>

//             <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
//               {editMode ? (
//                 <>
//                   <Button variant="contained" color="success" onClick={handleSaveEdit}>
//                     Save
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     onClick={() => {
//                       setEditMode(false);
//                       setProduct({ ...originalProduct });
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button variant="contained" color="warning" onClick={() => setEditMode(true)}>
//                     Edit
//                   </Button>
//                   <Button variant="contained" color="error" onClick={() => setConfirmOpen(true)}>
//                     Delete
//                   </Button>
//                 </>
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Card>
//     </Box>
//   );
// };

// export default ProductDetails;









import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  TextField,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteProduct, editProductById } from "../services/api";

const ProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.product) {
    return (
      <Typography mt={5} textAlign="center">
        No product details found.
      </Typography>
    );
  }

  const originalProduct = state.product;
  const [product, setProduct] = useState({ ...originalProduct });
  const [editMode, setEditMode] = useState(false);
  const [selectedImageIndex] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const getImageSrc = () => {
    const img = product.bikeImgs?.[selectedImageIndex] || product.bikeImgs?.[0];
    return img
      ? `https://d277w8h3-9000.inc1.devtunnels.ms/${img.replace(/\\/g, "/")}`
      : "";
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id);
      setSnackbarMsg("Product deleted successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/all-product-list-by-admin");
    } catch (error) {
      setSnackbarMsg("Delete failed!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await editProductById(product._id, product);
      setSnackbarMsg("Product updated successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setEditMode(false);
    } catch (error) {
      setSnackbarMsg("Update failed!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const productFields = [
    ["Price", "bikePrice"],
    ["TRANSMISSION", "transmission"],
    ["MOTOR", "motor"],
    ["DIMENSIONS", "dimensions"],
    ["WHEELBASE", "wheelbase"],
    ["GROUND CLEARANCE", "groundClearance"],
    ["KERB WEIGHT", "kerbWeight"],
    ["LOADING CAPACITY", "loadingCapacity"],
    ["TYRE (F & R)", "tyreFR"],
    ["BRAKE (F & R)", "brakeFR"],
    ["BATTERY TYPE", "batteryType"],
    ["BATTERY LEAD", "batteryLead"],
    ["CHARGING TIME LEAD", "chargingTimeLead"],
    ["RANGE LEAD", "rangeLead"],
    ["BATTERY LITHIUM", "batteryLithium"],
    ["CHARGING TIME LITHIUM", "chargingTimeLithium"],
    ["RANGE LITHIUM", "rangeLithium"],
    ["COLOR", "colors"],
    ["Quantity", "quantity"],
  ];

  return (
    <Box className="container py-4">
      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbarSeverity} variant="filled">
          {snackbarMsg}
        </Alert>
      </Snackbar>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>No</Button>
          <Button onClick={handleDelete} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <button className="btn btn-outline-primary mb-3" onClick={() => navigate(-1)}>
        🔙 Back
      </button>

      <Card className="shadow-sm border-0 rounded-4 p-3">
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
          {/* Image - left */}
          <Box flex="1" display="flex" alignItems="center" justifyContent="center">
            <CardMedia
              component="img"
              image={getImageSrc()}
              alt={product.bikeName}
              sx={{ maxHeight: 300, width: "100%", objectFit: "contain" }}
            />
          </Box>

          {/* Details - right */}
          <Box flex="2">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {product.bikeName}
            </Typography>

            <Typography variant="subtitle1" color="green" gutterBottom>
              ₹ {product.bikePrice?.toLocaleString() || "N/A"}
            </Typography>

            {/* <Box mb={1}>
              <Button variant="outlined" size="small" sx={{ mr: 1 }} className="bg-secondary ,badge">
                Motor: {product.motor}
              </Button>
              <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                Transmission: {product.transmission}
              </Button>
              <Button variant="outlined" size="small">
                Quantity: {product.quantity || 0}
              </Button>
            </Box> */}

            <Box
  display="flex"
  flexWrap="wrap"
  gap={1}
  mb={2}
>
  <Box
    sx={{
      backgroundColor: "#f5f5f5",
      px: 2,
      py: 1,
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: 500,
      minWidth: "160px",
    }}
  >
    ⚙️ <strong>Motor:</strong> {product.motor || "N/A"}
  </Box>
  <Box
    sx={{
      backgroundColor: "#f5f5f5",
      px: 2,
      py: 1,
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: 500,
      minWidth: "160px",
    }}
  >
    🔄 <strong>Transmission:</strong> {product.transmission || "N/A"}
  </Box>
  <Box
    sx={{
      backgroundColor: "#f5f5f5",
      px: 2,
      py: 1,
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: 500,
      minWidth: "160px",
    }}
  >
    📦 <strong>Quantity:</strong> {product.quantity || 0}
  </Box>
</Box>


            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Specifications
            </Typography>

            <Box display="flex" flexWrap="wrap" gap={1}>
              {productFields.map(([label, key]) => (
                <Box key={key} flexBasis={{ xs: "100%", sm: "48%" }}>
                  {editMode ? (
                    <TextField
                      label={label}
                      fullWidth
                      name={key}
                      value={product[key] ?? ""}
                      onChange={handleInputChange}
                      type={["quantity", "bikePrice"].includes(key) ? "number" : "text"}
                      variant="outlined"
                      size="small"
                      InputProps={{ style: { fontSize: 13, padding: "6px 8px" } }}
                      InputLabelProps={{ style: { fontSize: 13 } }}
                    />
                  ) : (
                    <Typography fontSize={13}>
                      <strong>{label}:</strong> {product[key] || "N/A"}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>

            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              {editMode ? (
                <>
                  <Button variant="contained" color="success" onClick={handleSaveEdit}>
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEditMode(false);
                      setProduct({ ...originalProduct });
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="contained" color="warning" onClick={() => setEditMode(true)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => setConfirmOpen(true)}>
                    Delete
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductDetails;
