// import React, { useState, useEffect } from "react";
// import {
//   addDealerSubDealerByUser,
//   getAllProductsUser,
// } from "../services/api"; // Make sure this path is correct
// import "bootstrap/dist/css/bootstrap.min.css";

// const AddUserBySubDealer = () => {
//   const initialFormData = {
//     role: "",
//     referral1: "",
//     referral2: "",
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     country: "India",
//     state: "",
//     city: "",
//     userImg: null,
//     aadharImg: null,
//     panImg: null,
//     passbookImg: null,
//     aadhar: "",
//     pan: "",
//     bankAccountNumber: "",
//     ifsc: "",
//     landRequired: "",
//     requiredStaff: "",
//     deposit: "",
//     monthlyMaintenance: "",
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [bikeSelections, setBikeSelections] = useState([]);
//   const [bikeOptions, setBikeOptions] = useState([]);
//   const [bikeDropdownOpen, setBikeDropdownOpen] = useState(false);
//   const [loadingBikes, setLoadingBikes] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBikes = async () => {
//       setLoadingBikes(true);
//       setError(null);
//       try {
//         const bikesData = await getAllProductsUser(); // This should now return the actual bike array or throw
//         console.log("Data from getAllProductsSubDealer API:", bikesData);

//         // Assuming bikesData is the array directly
//         setBikeOptions(Array.isArray(bikesData) ? bikesData : []);
//         if (!Array.isArray(bikesData)) {
//             console.warn("getAllProductsSubDealer did not return an array. Received:", bikesData);
//         }

//       } catch (err) {
//         console.error("Error fetching bikes in useEffect:", err);
//         let message = "Failed to load bike options.";
//         if (err.code === 'ERR_NETWORK') {
//             message = "Network error fetching bikes. Please check your connection and ensure the server is running.";
//         } else if (err.response) {
//           console.error("Error response data (fetch bikes):", err.response.data);
//           console.error("Error response status (fetch bikes):", err.response.status);
//           message = err.response.data?.message || err.response.data?.error || `Server error (${err.response.status}) fetching bikes.`;
//         } else if (err.message) {
//           message = err.message;
//         }
//         setError(message);
//         setBikeOptions([]);
//       } finally {
//         setLoadingBikes(false);
//       }
//     };

//     fetchBikes();
//   }, []);

//   useEffect(() => {
//     // This log helps confirm if bikeOptions was populated correctly
//     console.log("bikeOptions state updated to:", bikeOptions);
//   }, [bikeOptions]);


//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleBikeToggle = (bikeId) => {
//     setBikeSelections((prev) => {
//       const existingBikeIndex = prev.findIndex(
//         (bike) => bike.bikeId === bikeId
//       );
//       if (existingBikeIndex >= 0) {
//         return prev.filter((bike) => bike.bikeId !== bikeId);
//       } else {
//         return [...prev, { bikeId, quantity: 1 }];
//       }
//     });
//   };

//   const handleQuantityChange = (bikeId, newQuantity) => {
//     const quantity = parseInt(newQuantity, 10);
//     if (isNaN(quantity) || quantity < 1) {
//         setBikeSelections(prev => prev.filter(b => b.bikeId !== bikeId));
//         return;
//     }
//     setBikeSelections((prev) => {
//       const bikeExists = prev.some(b => b.bikeId === bikeId);
//       if (bikeExists) {
//         return prev.map((bike) =>
//           bike.bikeId === bikeId ? { ...bike, quantity: quantity } : bike
//         ).filter(bike => bike.quantity > 0);
//       } else if (quantity > 0) {
//         return [...prev, {bikeId, quantity}];
//       }
//       return prev;
//     });
//   };

//   const getBikeQuantity = (bikeId) => {
//     const bike = bikeSelections.find((b) => b.bikeId === bikeId);
//     return bike ? bike.quantity : 0;
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (submitLoading) return;
//   setSubmitLoading(true);
//   setError(null);

//   try {
//     const submissionData = new FormData();
    
//     // Append all simple fields
//     const fields = [
//       'role', 'name', 'email', 'address', 'aadhar', 'pan', 
//       'bankAccountNumber', 'ifsc', 'country', 'state', 'city',
//       'deposit', 'landRequired', 'requiredStaff', 'monthlyMaintenance',
//       'referral1', 'referral2', 'password'
//     ];
    
//     fields.forEach(field => {
//       if (formData[field] !== undefined && formData[field] !== null) {
//         submissionData.append(field, formData[field]);
//       }
//     });

//     // Append files
//     if (formData.userImg) submissionData.append('userImg', formData.userImg);
//     if (formData.aadharImg) submissionData.append('aadharImg', formData.aadharImg);
//     if (formData.panImg) submissionData.append('panImg', formData.panImg);
//     if (formData.passbookImg) submissionData.append('passbookImg', formData.passbookImg);

//     // Handle evBikes
//     const evBikesPayload = bikeSelections.map(selection => ({
//       bikeId: selection.bikeId,
//       quantity: selection.quantity,
//     }));
//     submissionData.append('evBikes', JSON.stringify(evBikesPayload));

//     const response = await addDealerSubDealerByUser(submissionData);
    
//     alert("✅ User Added Successfully!");
//     setFormData(initialFormData);
//     setBikeSelections([]);
//     document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');

//   } catch (err) {
//     console.error("Error submitting form:", err);
//     let message = "❌ Failed to add user. Please try again.";

//     if (err.code === 'ERR_NETWORK') {
//       message = "Network Error: Could not connect to the server. Check connection and if server is running.";
//     } else if (err.response) {
//       console.error("Backend Error:", err.response.data);
//       message = err.response.data?.message || `Server error (${err.response.status}).`;
//     }
    
//     setError(message);
//     alert(message);
//   } finally {
//     setSubmitLoading(false);
//   }
// };

//   // JSX (UI part) - should be okay if data fetching and submission logic are fixed
//   return (
//     <div className="container mt-5 mb-5">
//       <h2 className="mb-4">Add New User By SubDealer</h2>
//       {error && <div className="alert alert-danger">{error}</div>}

//       <form className="row g-4" onSubmit={handleSubmit}>
//         {/* Role and Referrals */}
//         <div className="col-md-6">
//           <label htmlFor="role" className="form-label">Role*</label>
//           <select
//             id="role"
//             className="form-select"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             required
//             disabled={submitLoading}
//           >
//             <option value="dealer">Dealer</option>
//             <option value="subdealer">Sub Dealer</option>
//             <option value="user">User</option>
//           </select>
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="referral1" className="form-label">Referral Code 1 (Optional)</label>
//           <input
//             id="referral1"
//             type="text"
//             className="form-control"
//             name="referral1"
//             value={formData.referral1}
//             onChange={handleChange}
//             disabled={submitLoading}
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="referral2" className="form-label">Referral Code 2 (Optional)</label>
//           <input
//             id="referral2"
//             type="text"
//             className="form-control"
//             name="referral2"
//             value={formData.referral2}
//             onChange={handleChange}
//             disabled={submitLoading}
//           />
//         </div>

//         {/* Basic Info */}
//         <div className="col-md-6">
//           <label htmlFor="name" className="form-label">Full Name*</label>
//           <input
//             id="name"
//             type="text"
//             className="form-control"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             disabled={submitLoading}
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="email" className="form-label">Email*</label>
//           <input
//             id="email"
//             type="email"
//             className="form-control"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             disabled={submitLoading}
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="password" className="form-label">Password*</label>
//           <input
//             id="password"
//             type="password"
//             className="form-control"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             disabled={submitLoading}
//           />
//         </div>

//         {/* Address */}
//         <div className="col-md-6">
//           <label htmlFor="address" className="form-label">Address*</label>
//           <input
//             id="address"
//             type="text"
//             className="form-control"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             disabled={submitLoading}
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="country" className="form-label">Country*</label>
//           <input
//             id="country"
//             type="text"
//             className="form-control"
//             name="country"
//             value={formData.country}
//             readOnly
//             disabled={submitLoading}
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="state" className="form-label">State*</label>
//           <input
//             id="state"
//             type="text"
//             className="form-control"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             required
//             disabled={submitLoading}
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="city" className="form-label">City*</label>
//           <input
//             id="city"
//             type="text"
//             className="form-control"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             required
//             disabled={submitLoading}
//           />
//         </div>

//         {/* File Uploads */}
//         <div className="col-md-6">
//           <label htmlFor="userImg" className="form-label">User Image*</label>
//           <input
//             id="userImg"
//             type="file"
//             className="form-control"
//             name="userImg"
//             onChange={handleChange}
//             required
//             accept="image/*"
//             disabled={submitLoading}
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="aadharImg" className="form-label">Aadhar Image*</label>
//           <input
//             id="aadharImg"
//             type="file"
//             className="form-control"
//             name="aadharImg"
//             onChange={handleChange}
//             required
//             accept="image/*,application/pdf"
//             disabled={submitLoading}
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="panImg" className="form-label">PAN Image*</label>
//           <input
//             id="panImg"
//             type="file"
//             className="form-control"
//             name="panImg"
//             onChange={handleChange}
//             required
//             accept="image/*,application/pdf"
//             disabled={submitLoading}
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="passbookImg" className="form-label">Passbook/Cancelled Cheque Image*</label>
//           <input
//             id="passbookImg"
//             type="file"
//             className="form-control"
//             name="passbookImg"
//             onChange={handleChange}
//             required
//             accept="image/*,application/pdf"
//             disabled={submitLoading}
//           />
//         </div>


//         {/* ID and Bank Details */}
//         <div className="col-md-6">
//           <label htmlFor="aadhar" className="form-label">Aadhar Number*</label>
//           <input
//             id="aadhar"
//             type="text"
//             className="form-control"
//             name="aadhar"
//             value={formData.aadhar}
//             onChange={handleChange}
//             required
//             pattern="\d{12}"
//             title="Aadhar number must be 12 digits"
//             disabled={submitLoading}
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="pan" className="form-label">PAN Number*</label>
//           <input
//             id="pan"
//             type="text"
//             className="form-control"
//             name="pan"
//             value={formData.pan}
//             onChange={handleChange}
//             required
//             pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
//             title="Invalid PAN format"
//             disabled={submitLoading}
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="bankAccountNumber" className="form-label">Bank Account Number*</label>
//           <input
//             id="bankAccountNumber"
//             type="text"
//             className="form-control"
//             name="bankAccountNumber"
//             value={formData.bankAccountNumber}
//             onChange={handleChange}
//             required
//             disabled={submitLoading}
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="ifsc" className="form-label">IFSC Code*</label>
//           <input
//             id="ifsc"
//             type="text"
//             className="form-control"
//             name="ifsc"
//             value={formData.ifsc}
//             onChange={handleChange}
//             required
//             pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
//             title="Invalid IFSC code format"
//             disabled={submitLoading}
//           />
//         </div>


//         {/* EV Bikes Dropdown */}
//         <div className="col-12">
//           <label className="form-label">Select EV Bikes (Optional)</label>
//           <div className="dropdown">
//             <button
//               type="button"
//               className="btn btn-outline-secondary dropdown-toggle w-100 text-start"
//               onClick={() => setBikeDropdownOpen(!bikeDropdownOpen)}
//               disabled={loadingBikes || submitLoading}
//             >
//               {loadingBikes
//                 ? "Loading bikes..."
//                 : bikeSelections.length > 0
//                 ? bikeOptions
//                     .filter((bikeOption) =>
//                       bikeSelections.some(
//                         (selectedBike) => selectedBike.bikeId === bikeOption._id
//                       )
//                     )
//                     .map((bike) => {
//                       const selectedBikeInfo = bikeSelections.find(
//                         (b) => b.bikeId === bike._id
//                       );
//                       return `${bike.bikeName || 'Unknown Bike'} (Qty: ${selectedBikeInfo ? selectedBikeInfo.quantity : 'N/A'})`;
//                     })
//                     .join(", ")
//                 : "Select Bikes"}
//             </button>

//             {!loadingBikes && bikeDropdownOpen && (
//               <div
//                 className="dropdown-menu show w-100"
//                 style={{ maxHeight: "250px", overflowY: "auto", position: "absolute", zIndex: 1050 }}
//               >
//                 {bikeOptions.length > 0 ? bikeOptions.map((bike) => {
//                   const isSelected = bikeSelections.some(
//                     (b) => b.bikeId === bike._id
//                   );
//                   const quantity = getBikeQuantity(bike._id);

//                   return (
//                     <div key={bike._id} className="dropdown-item d-flex justify-content-between align-items-center p-2">
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           id={`bike-${bike._id}`}
//                           checked={isSelected}
//                           onChange={() => handleBikeToggle(bike._id)}
//                           disabled={submitLoading}
//                         />
//                         <label
//                           className="form-check-label ms-2"
//                           htmlFor={`bike-${bike._id}`}
//                         >
//                           {bike.bikeName || 'Unnamed Bike'}
//                         </label>
//                       </div>

//                       {isSelected && (
//                         <div className="quantity-selector d-flex align-items-center">
//                           <button
//                             type="button"
//                             className="btn btn-sm btn-outline-secondary py-0 px-2"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleQuantityChange(bike._id, quantity - 1);
//                             }}
//                             disabled={submitLoading || quantity <= 1}
//                           >
//                             -
//                           </button>
//                           <input
//                             type="number"
//                             className="form-control form-control-sm mx-1 text-center"
//                             style={{ width: "50px" }}
//                             value={quantity}
//                             min="1"
//                             onChange={(e) => {
//                                 e.stopPropagation();
//                                 handleQuantityChange(bike._id, e.target.value);
//                             }}
//                             onClick={(e) => e.stopPropagation()}
//                             disabled={submitLoading}
//                           />
//                           <button
//                             type="button"
//                             className="btn btn-sm btn-outline-secondary py-0 px-2"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleQuantityChange(bike._id, quantity + 1);
//                             }}
//                             disabled={submitLoading}
//                           >
//                             +
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 }) : <div className="dropdown-item text-muted">No bikes available.</div>}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Extra Fields (conditional for subdealer) */}
//         {(formData.role === "subdealer") && (
//           <>
//             <div className="col-md-6">
//               <label htmlFor="landRequired" className="form-label">Land Required (sq.ft)*</label>
//               <input
//                 id="landRequired"
//                 type="text"
//                 className="form-control"
//                 name="landRequired"
//                 value={formData.landRequired}
//                 onChange={handleChange}
//                 required={formData.role === "subdealer"}
//                 disabled={submitLoading}
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="requiredStaff" className="form-label">Required Staff*</label>
//               <input
//                 id="requiredStaff"
//                 type="number"
//                 min="0"
//                 className="form-control"
//                 name="requiredStaff"
//                 value={formData.requiredStaff}
//                 onChange={handleChange}
//                 required={formData.role === "subdealer"}
//                 disabled={submitLoading}
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="deposit" className="form-label">Deposit (INR)*</label>
//               <input
//                 id="deposit"
//                 type="number"
//                 min="0"
//                 className="form-control"
//                 name="deposit"
//                 value={formData.deposit}
//                 onChange={handleChange}
//                 required={formData.role === "subdealer"}
//                 disabled={submitLoading}
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="monthlyMaintenance" className="form-label">Monthly Maintenance (INR)*</label>
//               <input
//                 id="monthlyMaintenance"
//                 type="number"
//                 min="0"
//                 className="form-control"
//                 name="monthlyMaintenance"
//                 value={formData.monthlyMaintenance}
//                 onChange={handleChange}
//                 required={formData.role === "subdealer"}
//                 disabled={submitLoading}
//               />
//             </div>
//           </>
//         )}


//         {/* Submit Button */}
//         <div className="col-12">
//           <button type="submit" className="btn btn-primary w-100" disabled={submitLoading || loadingBikes}>
//             {submitLoading ? 'Submitting...' : 'Submit'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddUserBySubDealer;





import React, { useState, useEffect } from "react";
import {
  addDealerSubDealerByUser ,
 getAllProductUser,
} from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const AddUserByUser = () => {
  const initialFormData = {
    role: "",
    referral1: "",
    referral2: "",
    name: "",
    email: "",
    password: "",
    address: "",
    country: "India",
    state: "",
    city: "",
    userImg: null,
    aadharImg: null,
    panImg: null,
    passbookImg: null,
    aadhar: "",
    pan: "",
    bankAccountNumber: "",
    ifsc: "",
    landRequired: "",
    requiredStaff: "",
    deposit: "",
    monthlyMaintenance: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [bikeSelections, setBikeSelections] = useState([]);
  const [bikeOptions, setBikeOptions] = useState([]);
  const [bikeDropdownOpen, setBikeDropdownOpen] = useState(false);
  const [loadingBikes, setLoadingBikes] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoadingBikes(true);
        setError(null);
        const bikes = await getAllProductUser();
        setBikeOptions(Array.isArray(bikes) ? bikes : []);
      } catch (err) {
        console.error("Error fetching bikes:", err);
        setError(
          err.message || "Failed to load bike options. Please try again later."
        );
      } finally {
        setLoadingBikes(false);
      }
    };

    fetchBikes();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleBikeToggle = (bikeId) => {
    setBikeSelections((prev) => {
      const existingBikeIndex = prev.findIndex(
        (bike) => bike.bikeId === bikeId
      );

      if (existingBikeIndex >= 0) {
        return prev.filter((bike) => bike.bikeId !== bikeId);
      } else {
        return [...prev, { bikeId, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (bikeId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (isNaN(quantity) || quantity < 1) {
        // If quantity is invalid or less than 1, remove the bike from selections
        setBikeSelections(prev => prev.filter(b => b.bikeId !== bikeId));
        return;
    }

    setBikeSelections((prev) => {
      const bikeExists = prev.some(b => b.bikeId === bikeId);
      if (bikeExists) {
        return prev.map((bike) =>
          bike.bikeId === bikeId ? { ...bike, quantity: quantity } : bike
        ).filter(bike => bike.quantity > 0); // Ensure valid quantities
      } else if (quantity > 0) { // If bike was not selected but now quantity is > 0 (e.g. direct input)
        return [...prev, {bikeId, quantity}];
      }
      return prev;
    });
  };

  const getBikeQuantity = (bikeId) => {
    const bike = bikeSelections.find((b) => b.bikeId === bikeId);
    return bike ? bike.quantity : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitLoading) return;

    setSubmitLoading(true);
    setError(null);

    try {
      const submissionData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (!(value instanceof File) && value !== null && value !== undefined) {
          submissionData.append(key, value);
        }
      });

      if (formData.userImg) submissionData.append("userImg", formData.userImg);
      if (formData.aadharImg) submissionData.append("aadharImg", formData.aadharImg);
      if (formData.panImg) submissionData.append("panImg", formData.panImg);
      if (formData.passbookImg) submissionData.append("passbookImg", formData.passbookImg);

      // --- CORRECTED evBikes PAYLOAD ---
      // Backend expects each item in evBikes array to have a 'bikeId' field.
      const evBikesPayload = bikeSelections.map(selection => ({
        bikeId: selection.bikeId, // Ensure 'bikeId' key is used
        quantity: selection.quantity,
      }));

   
      if (evBikesPayload.length > 0) {
        submissionData.append("evBikes", JSON.stringify(evBikesPayload));
      } else {
        // If evBikes is optional and can be empty, you might send an empty array
        // or omit the field depending on backend requirements for optional fields.
        // Sending an empty array is common.
        submissionData.append("evBikes", JSON.stringify([]));
      }
    

      await addDealerSubDealerByUser(submissionData);
      alert("✅ User Added Successfully!");

      setFormData(initialFormData);
      setBikeSelections([]);
      document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');

    } catch (err) {
      console.error("Error submitting form (full error object):", err);
      if (err.response) {
        console.error("Backend Error Response Data:", err.response.data);
        console.error("Backend Error Response Status:", err.response.status);
      }

      const errorMessage = (err.response && err.response.data && (err.response.data.message || err.response.data.error)) || err.message || "❌ Failed to add user. Please try again.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="container mb-5">
      <h2 className="mb-4">Add New User By Dealer/SubDealer</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-4" onSubmit={handleSubmit}>
        {/* Role and Referrals */}
        <div className="col-md-6">
          <label htmlFor="role" className="form-label">Role*</label>
          <select
            id="role"
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            disabled={submitLoading}
          >
          
            <option value="Dealer">Dealer</option>
            <option value="subdealer">Sub Dealer</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="referral1" className="form-label">Referral Code 1 (Optional)</label>
          <input
            id="referral1"
            type="text"
            className="form-control"
            name="referral1"
            value={formData.referral1}
            onChange={handleChange}
            disabled={submitLoading}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="referral2" className="form-label">Referral Code 2 (Optional)</label>
          <input
            id="referral2"
            type="text"
            className="form-control"
            name="referral2"
            value={formData.referral2}
            onChange={handleChange}
            disabled={submitLoading}
          />
        </div>

        {/* Basic Info */}
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Full Name*</label>
          <input
            id="name"
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={submitLoading}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email*</label>
          <input
            id="email"
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={submitLoading}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Password*</label>
          <input
            id="password"
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={submitLoading}
          />
        </div>

        {/* Address */}
        <div className="col-md-6">
          <label htmlFor="address" className="form-label">Address*</label>
          <input
            id="address"
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            disabled={submitLoading}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="country" className="form-label">Country*</label>
          <input
            id="country"
            type="text"
            className="form-control"
            name="country"
            value={formData.country}
            readOnly
            disabled={submitLoading}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="state" className="form-label">State*</label>
          <input
            id="state"
            type="text"
            className="form-control"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            disabled={submitLoading}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="city" className="form-label">City*</label>
          <input
            id="city"
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            disabled={submitLoading}
          />
        </div>

        {/* File Uploads */}
        <div className="col-md-6">
          <label htmlFor="userImg" className="form-label">User Image*</label>
          <input
            id="userImg"
            type="file"
            className="form-control"
            name="userImg"
            onChange={handleChange}
            required
            accept="image/*"
            disabled={submitLoading}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="aadharImg" className="form-label">Aadhar Image*</label>
          <input
            id="aadharImg"
            type="file"
            className="form-control"
            name="aadharImg"
            onChange={handleChange}
            required
            accept="image/*,application/pdf"
            disabled={submitLoading}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="panImg" className="form-label">PAN Image*</label>
          <input
            id="panImg"
            type="file"
            className="form-control"
            name="panImg"
            onChange={handleChange}
            required
            accept="image/*,application/pdf"
            disabled={submitLoading}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="passbookImg" className="form-label">Passbook/Cancelled Cheque Image*</label>
          <input
            id="passbookImg"
            type="file"
            className="form-control"
            name="passbookImg"
            onChange={handleChange}
            required
            accept="image/*,application/pdf"
            disabled={submitLoading}
          />
        </div>


        {/* ID and Bank Details */}
        <div className="col-md-6">
          <label htmlFor="aadhar" className="form-label">Aadhar Number*</label>
          <input
            id="aadhar"
            type="text"
            className="form-control"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            required
            pattern="\d{12}"
            title="Aadhar number must be 12 digits"
            disabled={submitLoading}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="pan" className="form-label">PAN Number*</label>
          <input
            id="pan"
            type="text"
            className="form-control"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            required
            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
            title="Invalid PAN format"
            disabled={submitLoading}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="bankAccountNumber" className="form-label">Bank Account Number*</label>
          <input
            id="bankAccountNumber"
            type="text"
            className="form-control"
            name="bankAccountNumber"
            value={formData.bankAccountNumber}
            onChange={handleChange}
            required
            disabled={submitLoading}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="ifsc" className="form-label">IFSC Code*</label>
          <input
            id="ifsc"
            type="text"
            className="form-control"
            name="ifsc"
            value={formData.ifsc}
            onChange={handleChange}
            required
            pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
            title="Invalid IFSC code format"
            disabled={submitLoading}
          />
        </div>


        {/* EV Bikes Dropdown */}
        <div className="col-12">
          <label className="form-label">Select EV Bikes (Optional)</label>
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-outline-secondary dropdown-toggle w-100 text-start"
              onClick={() => setBikeDropdownOpen(!bikeDropdownOpen)}
              disabled={loadingBikes || submitLoading}
            >
              {loadingBikes
                ? "Loading bikes..."
                : bikeSelections.length > 0
                ? bikeOptions
                    .filter((bikeOption) =>
                      bikeSelections.some(
                        (selectedBike) => selectedBike.bikeId === bikeOption._id
                      )
                    )
                    .map((bike) => {
                      const selectedBikeInfo = bikeSelections.find(
                        (b) => b.bikeId === bike._id
                      );
                      return `${bike.bikeName || 'Unknown Bike'} (Qty: ${selectedBikeInfo ? selectedBikeInfo.quantity : 'N/A'})`;
                    })
                    .join(", ")
                : "Select Bikes"}
            </button>

            {!loadingBikes && bikeDropdownOpen && (
              <div
                className="dropdown-menu show w-100"
                style={{ maxHeight: "250px", overflowY: "auto", position: "absolute", zIndex: 1050 }}
              >
                {bikeOptions.length > 0 ? bikeOptions.map((bike) => {
                  const isSelected = bikeSelections.some(
                    (b) => b.bikeId === bike._id
                  );
                  const quantity = getBikeQuantity(bike._id);

                  return (
                    <div key={bike._id} className="dropdown-item d-flex justify-content-between align-items-center p-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`bike-${bike._id}`}
                          checked={isSelected}
                          onChange={() => handleBikeToggle(bike._id)}
                          disabled={submitLoading}
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor={`bike-${bike._id}`}
                        >
                          {bike.bikeName || 'Unnamed Bike'}
                        </label>
                      </div>

                      {isSelected && (
                        <div className="quantity-selector d-flex align-items-center">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary py-0 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(bike._id, quantity - 1);
                            }}
                            disabled={submitLoading || quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control form-control-sm mx-1 text-center"
                            style={{ width: "50px" }}
                            value={quantity}
                            min="1"
                            onChange={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(bike._id, e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            disabled={submitLoading}
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary py-0 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(bike._id, quantity + 1);
                            }}
                            disabled={submitLoading}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }) : <div className="dropdown-item text-muted">No bikes available.</div>}
              </div>
            )}
          </div>
        </div>

        {/* Extra Fields (conditional for subdealer) */}
        {(formData.role === "subdealer") && (
          <>
            <div className="col-md-6">
              <label htmlFor="landRequired" className="form-label">Land Required (sq.ft)*</label>
              <input
                id="landRequired"
                type="text"
                className="form-control"
                name="landRequired"
                value={formData.landRequired}
                onChange={handleChange}
                required={formData.role === "subdealer"}
                disabled={submitLoading}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="requiredStaff" className="form-label">Required Staff*</label>
              <input
                id="requiredStaff"
                type="number"
                min="0"
                className="form-control"
                name="requiredStaff"
                value={formData.requiredStaff}
                onChange={handleChange}
                required={formData.role === "subdealer"}
                disabled={submitLoading}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="deposit" className="form-label">Deposit (INR)*</label>
              <input
                id="deposit"
                type="number"
                min="0"
                className="form-control"
                name="deposit"
                value={formData.deposit}
                onChange={handleChange}
                required={formData.role === "subdealer"}
                disabled={submitLoading}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="monthlyMaintenance" className="form-label">Monthly Maintenance (INR)*</label>
              <input
                id="monthlyMaintenance"
                type="number"
                min="0"
                className="form-control"
                name="monthlyMaintenance"
                value={formData.monthlyMaintenance}
                onChange={handleChange}
                required={formData.role === "subdealer"}
                disabled={submitLoading}
              />
            </div>
          </>
        )}


        {/* Submit Button */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100" disabled={submitLoading || loadingBikes}>
            {submitLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserByUser;