import React, { useState } from "react";
import { addProduct } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProductUser= () => {
  const [formData, setFormData] = useState({
    bikeName: "",
    range: "",
    warranty: "",
    colors: "",
    transmission: "",
    motor: "",
    dimensions: "",
    wheelbase: "",
    groundClearance: "",
    kerbWeight: "",
    loadingCapacity: "",
    tyreFR: "",
    brakeFR: "",
    batteryType: "",
    batteryLead: "",
    chargingTimeLead: "",
    rangeLead: "",
    batteryLithium: "",
    chargingTimeLithium: "",
    rangeLithium: "",
    bikePrice: ""
  });

  const [bikeImgs, setBikeImgs] = useState([]);
  const [previewImgs, setPreviewImgs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setBikeImgs(files);
    setPreviewImgs(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));
      bikeImgs.forEach((img, idx) => {
        data.append("bikeImg", img); // backend should accept array of files with same key
      });

      await addProduct(data);
      alert("Product added successfully!");

      setFormData(Object.fromEntries(Object.keys(formData).map(k => [k, ""])));
      setBikeImgs([]);
      setPreviewImgs([]);
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sections = [
    { title: "Basic Info", fields: ["bikeName", "range", "warranty", "colors", "bikePrice"] },
    { title: "Motor & Transmission", fields: ["transmission", "motor"] },
    { title: "Dimensions & Load", fields: ["dimensions", "wheelbase", "groundClearance", "kerbWeight", "loadingCapacity"] },
    { title: "Tyres & Brakes", fields: ["tyreFR", "brakeFR"] },
    { title: "Battery Details", fields: ["batteryType", "batteryLead", "chargingTimeLead", "rangeLead", "batteryLithium", "chargingTimeLithium", "rangeLithium"] }
  ];

  const labelMap = {
    tyreFR: "Tyre (F & R)",
    brakeFR: "Brake (F & R)",
    bikeName: "Bike Name",
    bikePrice: "Price (₹)",
    dimensions: "Dimensions (L×W×H)",
    range: "Range (km)",
    warranty: "Warranty (years)",
    wheelbase: "Wheelbase (mm)",
    groundClearance: "Ground Clearance (mm)",
    kerbWeight: "Kerb Weight (kg)",
    loadingCapacity: "Loading Capacity (kg)",
    chargingTimeLead: "Charging Time (Lead) (hrs)",
    rangeLead: "Range (Lead) (km)",
    chargingTimeLithium: "Charging Time (Lithium) (hrs)",
    rangeLithium: "Range (Lithium) (km)"
  };

  return (
    <div className="min-vh-100 py-5" style={{ background: "#f0f4f8" }}>
      <div className="container">
        <div className="card shadow border-0">
          <div className="card-header bg-gradient text-white" style={{ background: "linear-gradient(to right, #4f46e5, #0ea5e9)" }}>
            <h3 className="mb-0">🛵 Add New Bike Product</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-4 text-center">
                <label className="form-label fw-bold">Upload Bike Images*</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  required
                />
                <div className="d-flex flex-wrap justify-content-center mt-3 gap-3">
                  {previewImgs.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`bike-preview-${idx}`}
                      className="img-thumbnail shadow"
                      style={{ maxHeight: "150px" }}
                    />
                  ))}
                </div>
              </div>

              {sections.map((section, idx) => (
                <div key={idx} className="mb-4">
                  <h5 className="border-bottom pb-2 text-primary fw-bold">{section.title}</h5>
                  <div className="row">
                    {section.fields.map((field) => (
                      <div key={field} className="col-md-6 mb-3">
                        <label className="form-label">{labelMap[field] || field}</label>
                        <input
                          type={field === "bikePrice" ? "number" : "text"}
                          className="form-control border-primary-subtle shadow-sm"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required={field === "bikeName" || field === "bikePrice"}
                          placeholder={`Enter ${labelMap[field] || field}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold shadow"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </span>
                ) : (
                  "🚀 Add Product"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductUser;
