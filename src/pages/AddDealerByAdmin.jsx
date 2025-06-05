import React, { useState } from "react";
import { addDealer } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap is imported

const AddDealerForm = () => {
  const [formData, setFormData] = useState({
    dealerName: "",
    referral1: "",
    referral2: "",
    email: "",
    address: "",
    aadhar: "",
    pan: "",
    bankAccountNumber: "",
    ifsc: "",
    country: "",
    state: "",
    city: "",
    deposit: "",
    landRequire: "",
    requiredStaff: "",
    evBike: "",
    monthlyMaintainance: "",
    password: "",
    dealerImg: null,
    aadharImg: null,
    panImg: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await addDealer(data); // <-- direct integration
      alert("Dealer added successfully!");
    } catch (error) {
      alert(error.message || "Error while adding dealer");
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <header className="sticky-top bg-white border-bottom p-4 mb-4 shadow-sm">
  <h2 className="text-center text-primary">Add Dealer</h2>
</header>

      {/* Form Container */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 bg-light p-5 rounded shadow-sm border border-2 border-primary">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-primary">Dealer Name</label>
                  <input
                    type="text"
                    name="dealerName"
                    className="form-control"
                    placeholder="Dealer Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-primary">Referral 1</label>
                  <input
                    type="text"
                    name="referral1"
                    className="form-control"
                    placeholder="Referral 1"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-primary">Referral 2</label>
                  <input
                    type="text"
                    name="referral2"
                    className="form-control"
                    placeholder="Referral 2"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-primary">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-primary">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Address"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-primary">Aadhar Number</label>
                  <input
                    type="text"
                    name="aadhar"
                    className="form-control"
                    placeholder="Aadhar Number"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-primary">PAN Number</label>
                  <input
                    type="text"
                    name="pan"
                    className="form-control"
                    placeholder="PAN Number"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-primary">Bank Account Number</label>
                  <input
                    type="text"
                    name="bankAccountNumber"
                    className="form-control"
                    placeholder="Bank Account Number"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-primary">IFSC Code</label>
                  <input
                    type="text"
                    name="ifsc"
                    className="form-control"
                    placeholder="IFSC Code"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-primary">Country</label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    placeholder="Country"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-primary">State</label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="State"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-primary">City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="City"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-primary">Deposit Amount</label>
                  <input
                    type="number"
                    name="deposit"
                    className="form-control"
                    placeholder="Deposit Amount"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-primary">Land Required (in sq.ft)</label>
                  <input
                    type="text"
                    name="landRequired"
                    className="form-control"
                    placeholder="Land Required"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-primary">Required Staff</label>
                  <input
                    type="text"
                    name="requiredStaff"
                    className="form-control"
                    placeholder="Required Staff"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-primary">EV Bike Model</label>
                  <input
                    type="text"
                    name="evBike"
                    className="form-control"
                    placeholder="EV Bike Model"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-primary">Monthly Maintenance</label>
                  <input
                    type="text"
                    name="monthlyMaintenance"
                    className="form-control"
                    placeholder="Monthly Maintenance"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-primary">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-primary">Dealer Image:</label>
                <input
                  type="file"
                  name="dealerImg"
                  className="form-control"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-primary">Aadhar Image:</label>
                <input
                  type="file"
                  name="aadharImg"
                  className="form-control"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-primary">PAN Image:</label>
                <input
                  type="file"
                  name="panImg"
                  className="form-control"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-success w-100">
                  Add Dealer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDealerForm;
