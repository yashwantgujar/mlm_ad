import React, { useState } from 'react';

const AddDealer = () => {
  const [formData, setFormData] = useState({
    dealerPic: null,
    dealerName: '',
    address: '',
    landArea: '',
    staffCount: '',
    depositAmount: 3000000,
    referralDealer: '',
    referralOther: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('🎉 Dealer Registered Successfully!');
    // Reset Form
    setFormData({
      dealerPic: null,
      dealerName: '',
      address: '',
      landArea: '',
      staffCount: '',
      depositAmount: 3000000,
      referralDealer: '',
      referralOther: '',
    });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold text-success" style={{ marginTop: '10px' }}>
        Dealer Registration
      </h2>

      <form onSubmit={handleSubmit} className="row g-4 shadow p-5 rounded bg-white">
        
        <div className="col-md-6">
          <label className="form-label">Dealer Picture</label>
          <input type="file" name="dealerPic" onChange={handleChange} className="form-control shadow-sm" required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Dealer Name</label>
          <input type="text" name="dealerName" value={formData.dealerName} onChange={handleChange} className="form-control shadow-sm" placeholder="Enter Dealer Name" required />
        </div>

        <div className="col-md-12">
          <label className="form-label">Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} className="form-control shadow-sm" rows="2" placeholder="Enter full address" required></textarea>
        </div>

        <div className="col-md-6">
          <label className="form-label">Land Area (in sqft)</label>
          <input type="number" name="landArea" value={formData.landArea} onChange={handleChange} className="form-control shadow-sm" placeholder="800 - 1000 sqft required" required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Staff Count</label>
          <input type="number" name="staffCount" value={formData.staffCount} onChange={handleChange} className="form-control shadow-sm" placeholder="Minimum 4 staff required" required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Deposit Amount (₹)</label>
          <input type="number" name="depositAmount" value={formData.depositAmount} className="form-control shadow-sm" readOnly />
          <small className="text-muted">Fixed deposit of ₹30,00,000</small>
        </div>

        <div className="col-md-6">
          <label className="form-label">Referral Code (Dealer)</label>
          <input type="text" name="referralDealer" value={formData.referralDealer} onChange={handleChange} className="form-control shadow-sm" placeholder="Your Referral Code" required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Referral Code (User or Self)</label>
          <input type="text" name="referralOther" value={formData.referralOther} onChange={handleChange} className="form-control shadow-sm" placeholder="User or Self Referral Code" required />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success btn-lg mt-4 w-100 shadow-sm">
            🚀 Register Dealer
          </button>
        </div>
      </form>

      {/* Facility details */}
      <div className="mt-5">
        <h4 className="fw-bold text-center text-primary">Dealer Facilities & Income</h4>
        <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item">• ₹30,00,000 deposit to Admin</li>
          <li className="list-group-item">• ₹1,00,000 per month maintenance for 24 months</li>
          <li className="list-group-item">• Minimum 800–1000 sqft land required</li>
          <li className="list-group-item">• Minimum 4 staff members required</li>
          <li className="list-group-item">• ₹2,000 per bike on indirect sale</li>
          <li className="list-group-item">• ₹2,000 per bike when dispatching to Sub Dealer</li>
          <li className="list-group-item">• ₹9,500 per bike on direct sale (using dealer's referral)</li>
        </ul>
      </div>
    </div>
  );
};

export default AddDealer;
