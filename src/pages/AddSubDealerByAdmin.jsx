import React, { useState } from 'react';
import { addSubDealer } from '../services/api';

const AddSubDealerForm = () => {
  const [formData, setFormData] = useState({
    dealerName: '',
    referral1: '',
    referral2: '',
    email: '',
    address: '',
    aadhar: '',
    pan: '',
    bankAccountNumber: '',
    ifsc: '',
    country: '',
    state: '',
    city: '',
    deposit: '',
    landRequired: '',
    requiredStaff: '',
    evBike: '',
    monthlyMaintenance: '',
    password: '',
    dealerImg: null,
    aadharImg: null,
    panImg: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      const result = await addSubDealer(formDataObj);
      alert(result.message);
    } catch (error) {
      alert(error.message || "Failed to add sub-dealer");
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">Add New Sub-Dealer</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            {/* Personal Info */}
            <div className="mb-4">
              <h5 className="text-primary border-bottom pb-2">Personal Details</h5>
              <div className="row">
                {[
                  { label: "Dealer Name", name: "dealerName" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Address", name: "address" },
                  { label: "Aadhar Number", name: "aadhar" },
                  { label: "Pan Number", name: "pan" },
                ].map(({ label, name, type = "text" }) => (
                  <div className="col-md-6 mb-3" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                      type={type}
                      className="form-control"
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Details */}
            <div className="mb-4">
              <h5 className="text-warning border-bottom pb-2">Bank & Referrals</h5>
              <div className="row">
                {[
                  { label: "Bank Account Number", name: "bankAccountNumber" },
                  { label: "IFSC Code", name: "ifsc" },
                  { label: "Referral 1", name: "referral1" },
                  { label: "Referral 2", name: "referral2" },
                ].map(({ label, name }) => (
                  <div className="col-md-6 mb-3" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                      type="text"
                      className="form-control"
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dealer Setup Info */}
            <div className="mb-4">
              <h5 className="text-danger border-bottom pb-2">Dealer Setup Info</h5>
              <div className="row">
                {[
                  { label: "Country", name: "country" },
                  { label: "State", name: "state" },
                  { label: "City", name: "city" },
                  { label: "Deposit (₹)", name: "deposit" },
                  { label: "Land Required (sqft)", name: "landRequired" },
                  { label: "Required Staff", name: "requiredStaff" },
                  { label: "EV Bike Count", name: "evBike" },
                  { label: "Monthly Maintenance (₹)", name: "monthlyMaintenance" },
                ].map(({ label, name }) => (
                  <div className="col-md-6 mb-3" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                      type="text"
                      className="form-control"
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* File Uploads */}
            <div className="mb-4">
              <h5 className="text-info border-bottom pb-2">Upload Documents</h5>
              <div className="row">
                {[
                  { label: "Upload Dealer Photo", name: "dealerImg" },
                  { label: "Upload Aadhar Image", name: "aadharImg" },
                  { label: "Upload PAN Image", name: "panImg" },
                ].map(({ label, name }) => (
                  <div className="col-md-4 mb-3" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                      type="file"
                      className="form-control"
                      name={name}
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label">Set Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">Submit Sub-Dealer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubDealerForm;
