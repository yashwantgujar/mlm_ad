import React, { useState } from 'react';

const AddUser = () => {
  const [formData, setFormData] = useState({
    userPic: null,
    name: '',
    address: '',
    aadharNo: '',
    panNo: '',
    bankAccountNo: '',
    email: '',
    referral1: '',
    referral2: '',
  });

  const [errors, setErrors] = useState({
    aadharNo: '',
    panNo: '',
    bankAccountNo: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Aadhar No Validation: Must be exactly 16 digits
    if (!/^\d{16}$/.test(formData.aadharNo)) {
      newErrors.aadharNo = 'Aadhar number must be exactly 16 digits.';
    }

    // PAN No Validation: 12 alphanumeric characters
    if (!/^[A-Z0-9]{12}$/.test(formData.panNo)) {
      newErrors.panNo = 'PAN number must be exactly 12 alphanumeric characters.';
    }

    // Bank Account No Validation: Should only contain digits
    if (!/^\d+$/.test(formData.bankAccountNo)) {
      newErrors.bankAccountNo = 'Bank account number must contain only digits.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log(formData);
      alert('🎉 User Added Successfully!');
      // Reset form
      setFormData({
        userPic: null,
        name: '',
        address: '',
        aadharNo: '',
        panNo: '',
        bankAccountNo: '',
        email: '',
        referral1: '',
        referral2: '',
      });
      setErrors({});
    } else {
      alert('❌ Please correct the errors.');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold text-primary" style={{ marginTop: '10px' }}>
        Add User
      </h2>

      <form onSubmit={handleSubmit} className="row g-4 shadow p-5 rounded bg-white">
        {/* Referral 1 and Referral 2 fields moved to the top */}
        <div className="col-md-6">
          <label className="form-label">Referral-1 (Your Code)</label>
          <input
            type="text"
            name="referral1"
            value={formData.referral1}
            onChange={handleChange}
            className="form-control shadow-sm"
            placeholder="Enter your referral code"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Referral-2 (Dealer/Subdealer Code)</label>
          <input
            type="text"
            name="referral2"
            value={formData.referral2}
            onChange={handleChange}
            className="form-control shadow-sm"
            placeholder="Enter dealer referral code"
            required
          />
        </div>

        {/* User Pic */}
        <div className="col-md-6">
          <label className="form-label">User Pic</label>
          <input
            type="file"
            name="userPic"
            onChange={handleChange}
            className="form-control shadow-sm"
            required
          />
        </div>

        {/* Name */}
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control shadow-sm"
            placeholder="Enter Full Name"
            required
          />
        </div>

        {/* Address */}
        <div className="col-md-12">
          <label className="form-label">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control shadow-sm"
            rows="2"
            placeholder="Enter your full address"
            required
          ></textarea>
        </div>

        {/* Aadhar Number */}
        <div className="col-md-6">
          <label className="form-label">Aadhar Number</label>
          <input
            type="text"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            className="form-control shadow-sm"
            placeholder="xxxx-xxxx-xxxx"
            required
          />
          {errors.aadharNo && <div className="text-danger">{errors.aadharNo}</div>}
        </div>

        {/* PAN Number */}
        <div className="col-md-6">
          <label className="form-label">PAN Number</label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            className="form-control shadow-sm"
            placeholder="ABCDE1234F"
            required
          />
          {errors.panNo && <div className="text-danger">{errors.panNo}</div>}
        </div>

        {/* Bank Account Number */}
        <div className="col-md-6">
          <label className="form-label">Bank Account Number</label>
          <input
            type="text"
            name="bankAccountNo"
            value={formData.bankAccountNo}
            onChange={handleChange}
            className="form-control shadow-sm"
            placeholder="Enter account no."
            required
          />
          {errors.bankAccountNo && <div className="text-danger">{errors.bankAccountNo}</div>}
        </div>

        {/* Email */}
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control shadow-sm"
            placeholder="Enter email address"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary btn-lg mt-4 w-100 shadow-sm">
            🚀 Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
