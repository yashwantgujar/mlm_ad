
import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClassicPro from "../assets/Images/ClassicPro.png";
import ClassicSuper from "../assets/Images/ClassicSuper.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllProducts } from "../services/api";
import { productsData } from "@/utils/fackData/productsData";

const DealerTableView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;
  const [bike,setbike]=useState([]);
    const [products, setProducts] = useState([]);




 const [bikeList, setBikeList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        console.log("📦 All Products:", res.data);
        setBikeList(res.data);

        console.log("📦 All Products:", res.data);

      // Log all product _ids for debug
      const productIds = res.data.map((p) => p._id);
      console.log("🔍 Product IDs from DB:", productIds);

      setBikeList(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  console.log("👤 User Data:", user);
  

const BASE_URL = "https://d277w8h3-9000.inc1.devtunnels.ms/"; 

const assignedBikes = Array.isArray(user?.evBikes) && Array.isArray(bikeList)
  ? user.evBikes.map((assigned, index) => {
      // TEMP: fallback to index if ID doesn't match anything
      const matchedBike = bikeList[index % bikeList.length]; // circular index for safety

      console.log("🔗 Assigned ID:", assigned._id);
      console.log("🛵 Matched Bike:", matchedBike);

      const imgPath = matchedBike?.bikeImgs?.[0]?.replace(/\\/g, "/");

      return {
        name: matchedBike?.bikeName || "Unknown Bike",
        quantity: assigned.quantity,
        image: imgPath ? `${BASE_URL}${imgPath}` : null,
         product: matchedBike || null,
      };
    })
  : [];

   const handleViewDetails = (product) => {
  if (product) {
    navigate("/product-details", { state: { product } });
  }
};

  

  
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
            <div className="col-lg-3 col-md-6 col-12 mb-4" key={index}>
              <div className="card shadow-sm h-100">
                {bike.image ? (
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "contain" }}
                  />
                ) : (
                  <div
                    className="card-img-top bg-light d-flex justify-content-center align-items-center"
                    style={{ height: "150px" }}
                  >
                    <span>No Image</span>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{bike.name}</h5>
                  <p className="card-text">Quantity: {bike.quantity}</p>
                </div>
                  <button onClick={() =>  handleViewDetails(bike.product)} className="btn btn-primary mx-2 my-2">
  View Details
</button>


              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No bikes assigned to this user.</p>
          </div>
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



export default DealerTableView;