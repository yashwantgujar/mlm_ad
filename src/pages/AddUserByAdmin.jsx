
import React, { useState, useEffect } from "react";
import { addDealer, getAllDealers, getAllProducts } from "../services/api"; // Assuming getAllDealers is used elsewhere or for future use
import "bootstrap/dist/css/bootstrap.min.css";

const AddUser = () => {
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
    evBikes: [], // This will store objects like { bikeId: '...', quantity: 1 }
    landRequired: "",
    requiredStaff: "",
    deposit: "",
    monthlyMaintenance: "",
    quantity:"",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [bikeOptions, setBikeOptions] = useState([]);
  const [bikeDropdownOpen, setBikeDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setBikeOptions(res.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    // Fetching dealers might not be directly needed for this form,
    // but keeping it if it's used for something else (e.g., populating referral dropdowns in future)
    const fetchDealers = async () => {
      try {
        await getAllDealers();
      } catch (err)
        {
        console.error("Error fetching dealers:", err);
      }
    };

    fetchProducts();
    fetchDealers();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBikeToggle = (bikeId) => {
    setFormData((prev) => {
      const existingBikeIndex = prev.evBikes.findIndex(
        (bike) => bike.bikeId === bikeId
      );
      let updatedEvBikes;

      if (existingBikeIndex > -1) {
        // Bike exists, remove it
        updatedEvBikes = prev.evBikes.filter(
          (bike) => bike.bikeId !== bikeId
        );
      } else {
        // Bike doesn't exist, add it with default quantity 1
        // You could add a UI element to change quantity if needed
        updatedEvBikes = [...prev.evBikes, { bikeId: bikeId, quantity: 1 }];
      }
      return { ...prev, evBikes: updatedEvBikes };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();

    // console.log("Form data before submission:", formData); // For debugging

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "evBikes") {
        // Ensure evBikes is an array of objects before stringifying
        if (Array.isArray(value)) {
          submissionData.append(key, JSON.stringify(value));
        } else {
          // Fallback for safety, though it should always be an array here
          submissionData.append(key, JSON.stringify([]));
        }
      } else if (value instanceof File) {
        submissionData.append(key, value, value.name);
      } else if (value !== null && value !== undefined) {
        submissionData.append(key, value);
      }
    });
    
    // For debugging: Log FormData contents
    // for (let pair of submissionData.entries()) {
    //   console.log(pair[0]+ ': ' + pair[1]); 
    // }

    try {
      await addDealer(submissionData);
      alert("✅ User Added Successfully!");
      setFormData(initialFormData); // Reset form
      // Clear file input fields visually (React doesn't control file input values directly after selection)
      document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error.message || "❌ Failed to add user. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="container mb-5">
      <h2 className="mb-4">Add New User</h2>
      <form className="row g-4" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="col-md-6">
          <label className="form-label">Role</label>
          <select className="form-select" name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="dealer">Dealer</option>
            <option value="subdealer">Sub Dealer</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Referral Code 1</label>
          <input type="text" className="form-control" name="referral1" value={formData.referral1} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Referral Code 2</label>
          <input type="text" className="form-control" name="referral2" value={formData.referral2} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        {/* ID & Banking */}
        <div className="col-md-6">
          <label className="form-label">Aadhar Number</label>
          <input type="text" className="form-control" name="aadhar" value={formData.aadhar} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">PAN Number</label>
          <input type="text" className="form-control" name="pan" value={formData.pan} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Bank Account Number</label>
          <input type="text" className="form-control" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">IFSC Code</label>
          <input type="text" className="form-control" name="ifsc" value={formData.ifsc} onChange={handleChange} />
        </div>

        {/* Address */}
        <div className="col-md-6">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">State</label>
          <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">City</label>
          <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
        </div>

        {/* Uploads */}
        <div className="col-md-6">
          <label className="form-label">User Image</label>
          <input type="file" className="form-control" name="userImg" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Aadhar Image</label>
          <input type="file" className="form-control" name="aadharImg" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">PAN Image</label>
          <input type="file" className="form-control" name="panImg" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Passbook Image</label>
          <input type="file" className="form-control" name="passbookImg" onChange={handleChange} />
        </div>

        {/* EV Bikes */}
        <div className="col-md-6 position-relative">
          <label className="form-label">Select EV Bikes</label>
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-outline-secondary dropdown-toggle w-100 text-start"
              onClick={() => setBikeDropdownOpen(!bikeDropdownOpen)}
            >
              {formData.evBikes.length > 0
                ? bikeOptions
                    .filter((bikeOption) => // Filter from all available bikeOptions
                      formData.evBikes.some(
                        (selectedBike) => selectedBike.bikeId === bikeOption._id
                      )
                    )
                    .map((bike) => bike.bikeName) // Map to name for display
                    .join(", ")
                : "Select Bikes"}
            </button>
            <ul
              className={`dropdown-menu w-100 ${bikeDropdownOpen ? "show" : ""}`}
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                position: "absolute",
                zIndex: 1050,
              }}
            >
              {bikeOptions.map((bike) => (
                <li key={bike._id}>
                  <div className="form-check px-3 py-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`bike-${bike._id}`}
                      checked={formData.evBikes.some(
                        (selectedBike) => selectedBike.bikeId === bike._id
                      )}
                      onChange={() => handleBikeToggle(bike._id)}
                    />
                    <label className="form-check-label" htmlFor={`bike-${bike._id}`}>
                      {bike.bikeName} {/* Assuming bike object has bikeName */}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Business Info */}
        <div className="col-md-6">
          <label className="form-label">Land Required</label>
          <input type="text" className="form-control" name="landRequired" value={formData.landRequired} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Required Staff</label>
          <input type="text" className="form-control" name="requiredStaff" value={formData.requiredStaff} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Deposit</label>
          <input type="text" className="form-control" name="deposit" value={formData.deposit} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Monthly Maintenance</label>
          <input type="text" className="form-control" name="monthlyMaintenance" value={formData.monthlyMaintenance} onChange={handleChange} />
        </div>

        {/* Submit */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;