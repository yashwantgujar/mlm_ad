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
import {  getProductById , getAllDealersUser, getProductByuser } from "../services/api";

const AddProductListByUser = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   const fetchData = async () => {
     try {
       const userData = localStorage.getItem("evBikes");
       const parsedUser = JSON.parse(userData);
       const dealerId = parsedUser?.[0]; // Extract ID from the array
 
       if (!dealerId) {
         console.error("No dealerId found in localStorage");
         return;
       }

       console.log("dealerId-----",dealerId );
       
 
       const allProducts = await getProductByuser(dealerId);
       console.log("req-----------", allProducts);
 
       // Ensure that allProducts is always an array
       if (Array.isArray(allProducts)) {
         setProducts(allProducts);
       } else if (allProducts) {
         setProducts([allProducts]); // If it's a single product, make it an array
       } else {
         console.error("Unexpected API format", allProducts);
       }
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
    <Box sx={{ px: 4, py: 5 }}>
      <Typography variant="h4" align="center" color="green" fontWeight="bold" gutterBottom>
        🚲 Our Electric Bikes
      </Typography>

      <Grid container spacing={4}>
        {products.map((product, index) => {
          const actualPrice = Math.round(product.bikePrice * 1.18);
          const discount = Math.round(100 - (product.bikePrice / actualPrice) * 100);
          const imageUrl = product.bikeImgs?.[0]
            ? `http://localhost:8000/${product.bikeImgs[0].replace(/\\/g, "/")}`
            : "";

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: 4 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={imageUrl || "https://via.placeholder.com/400x300"}
                  alt={product.bikeName}
                  sx={{ objectFit: "contain", p: 2 }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {product.bikeName}
                  </Typography>

                  <Stack spacing={0.5} mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Battery:</strong> {product.batteryLithium || product.batteryLead}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Speed:</strong> {product.range}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Warranty:</strong> {product.warranty}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Display:</strong> LCD Display & 5 Ride Modes
                    </Typography>
                  </Stack>

                  <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h6" color="primary" fontWeight="bold" mr={1}>
                      ₹{product.bikePrice}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textDecoration: "line-through" }}
                    >
                      ₹{actualPrice}
                    </Typography>
                    <Chip
                      label={`${discount}% OFF`}
                      color="error"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "#ff9800", color: "#fff", fontWeight: "bold" }}
                    onClick={() => handleBuyNow(product._id)}
                  >
                    Preview
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

export default AddProductListByUser;
