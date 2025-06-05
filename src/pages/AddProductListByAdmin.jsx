  // import React, { useEffect, useState } from "react";
  // import { getAllProducts, getProductById } from "../services/api"; // Only necessary imports
  // import { useNavigate } from "react-router-dom";
  // import "bootstrap/dist/css/bootstrap.min.css";

  // const ProductList = () => {
  //   const [products, setProducts] = useState([]);
  //   const navigate = useNavigate();

  //   // Fetch all products
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const allProducts = await getAllProducts();
  //         setProducts(allProducts);
  //       } catch (err) {
  //         console.error("Failed to fetch products", err);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  //   // Navigate to preview page for product details
  //   const handleBuyNow = async (id) => {
  //     try {
  //       const productData = await getProductById(id);
  //       navigate("/product-details", { state: { product: productData } });
  //     } catch (err) {
  //       console.error("Failed to fetch product by ID", err);
  //     }
  //   };


  
    

  //   return (
  //     <div className="container py-5">
  //       <h2 className="mb-5 text-center text-success">🚲 Our Electric Bikes</h2>

  //       <div className="row">
  //         {products.map((product, index) => (
  //           <div className="col-md-6 p-4" key={index}>
  //             <div className="card shadow h-100 border-0">
  //               <div className="bg-white d-flex justify-content-center align-items-center">
  //                 {product.bikeImgs && product.bikeImgs.length > 0 ? (
  //                   <img
  //                     src={`http://localhost:8000/${product.bikeImgs[0].replace(/\\/g, "/")}`}
  //                     alt="bike"
  //                     className="img-fluid"
  //                     style={{ maxHeight: "400px", objectFit: "cover" }}
  //                   />
  //                 ) : (
  //                   <p>No image available</p>
  //                 )}
  //               </div>

  //               <div className="card-body">
  //                 <h5 className="card-title fw-bold text-dark">{product.bikeName}</h5>
  //                 <ul className="list-unstyled mb-3 text-muted">
  //                   <li><strong>Battery:</strong> {product.batteryLithium || product.batteryLead}</li>
  //                   <li><strong>Speed:</strong> {product.range}</li>
  //                   <li><strong>Warranty:</strong> {product.warranty}</li>
  //                   <li><strong>Display:</strong> LCD Display & 5 Ride Modes</li>
  //                 </ul>

  //                 <div className="d-flex align-items-center mb-3">
  //                   <h4 className="text-primary fw-bold mb-0 me-2">₹{product.bikePrice}</h4>
  //                   <small className="text-muted text-decoration-line-through">
  //                     ₹{Math.round(product.bikePrice * 1.18)}
  //                   </small>
  //                   <span className="badge bg-danger text-white ms-2">
  //                     {Math.round(100 - (product.bikePrice / (product.bikePrice * 1.18)) * 100)}% OFF
  //                   </span>
  //                 </div>

  //                 <div className="d-flex">
  //                   <button
  //                     className="btn btn-warning text-white w-100 fw-bold"
  //                     onClick={() => handleBuyNow(product._id)}
  //                   >
  //                     PREVIEW...
  //                   </button>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // export default ProductList;


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
    } from "@mui/material";
    import { getAllProducts, getProductById } from "../services/api";

    const ProductList = () => {
      const [products, setProducts] = useState([]);
      const navigate = useNavigate();

      useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await getAllProducts();
      console.log("all", response);
      setProducts(response.data); // <-- Fix here
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };
  fetchData();
}, []);


      const handleBuyNow = async (id) => {
        try {
          const productData = await getProductById(id);
          navigate("/product-details", { state: { product: productData } });
        } catch (err) {
          console.error("Failed to fetch product by ID", err);
        }
      };

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
        
                        <Button variant="contained" fullWidth onClick={() =>handleBuyNow(product._id)}>
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

    export default ProductList;
