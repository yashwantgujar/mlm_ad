import React, { useState, useEffect } from 'react';
import CardHeader from '@/components/shared/CardHeader';
import Pagination from '@/components/shared/Pagination';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { getAllLocations, updateLocation, deleteLocation } from '../services/api'; // Adjust path as needed

const AllLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    package: '',
    dailyReach: '',
    visiblity: '',
    maxAmount: '',
    minAmount: '',
    peakHoursAmount: '',
    normalHoursAmount: '',
    city: '',
    costPerImpression: '',
    fileUrl: '',
    url: '',
  });
  const userToken = localStorage.getItem('token');

  // Fetch locations
  const fetchLocations = async (pageNum) => {
    try {
      setLoading(true);
      const res = await getAllLocations(pageNum);
      setLocations(res || []);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to fetch locations:', err);
      setError('Failed to load locations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations(page);
  }, [page]);

  const handleEditClick = (location) => {
    setSelectedLocation(location);
    setFormData({
      location: location.location || '',
      package: location.package || '',
      dailyReach: location.dailyReach || '',
      visiblity: location.visiblity || '',
      maxAmount: location.maxAmount || '',
      minAmount: location.minAmount || '',
      peakHoursAmount: location.peakHoursAmount || '',
      normalHoursAmount: location.normalHoursAmount || '',
      city: location.city || '',
      costPerImpression: location.costPerImpression || '',
      fileUrl: location.fileUrl || '',
      url: location.url || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await updateLocation(selectedLocation._id, formData);
      fetchLocations(page);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating location:', error);
      setError('Failed to update location. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this location?');
    if (!confirmDelete) return;
  
    try {
      await deleteLocation(id, userToken); // Pass token here
      fetchLocations(page);
    } catch (error) {
      console.error('Delete failed:', error);
      setError('Failed to delete location. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchLocations(newPage);
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error) return <div className="text-center p-5 text-danger">{error}</div>;

  return (
    <div className="col-lg-12">
      <div className="card stretch stretch-full">
        <CardHeader title="All Locations" />

        <div className="card-body custom-card-action p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Media</th>
                  <th>Location</th>
                  <th>Package</th>
                  <th>Daily Reach</th>
                  <th>Visibility</th>
                  <th>Max Amt</th>
                  <th>Min Amt</th>
                  <th>Peak Hrs</th>
                  <th>Normal Hrs</th>
                  <th>City</th>
                  <th>Cost/Impression</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {locations.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="text-center py-4">No locations found</td>
                  </tr>
                ) : (
                  locations.map((item, index) => (
                    <tr key={index}>
                      <td>{item.fileUrl ? <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">View File</a> : <a href={item.url} target="_blank" rel="noopener noreferrer">View URL</a>}</td>
                      <td>{item.location}</td>
                      <td>{item.package}</td>
                      <td>{item.dailyReach}</td>
                      <td>{item.visiblity}</td>
                      <td>{item.maxAmount}</td>
                      <td>{item.minAmount}</td>
                      <td>{item.peakHoursAmount}</td>
                      <td>{item.normalHoursAmount}</td>
                      <td>{item.city}</td>
                      <td>{item.costPerImpression}</td>
                      <td>
                        <div className="hstack gap-2 justify-content-end">
                          <button className="avatar-text avatar-md" title="Edit" onClick={() => handleEditClick(item)}>
                            <FiEdit />
                          </button>
                          <button className="avatar-text avatar-md" title="Delete" onClick={() => handleDelete(item._id)}>
                            <FiTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Location</h5>
                <button type="button" className="close" onClick={() => setIsModalOpen(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  {[
                    { label: 'Location', name: 'location' },
                    { label: 'Package', name: 'package' },
                    { label: 'Daily Reach', name: 'dailyReach' },
                    { label: 'Visibility', name: 'visiblity' },
                    { label: 'Max Amount', name: 'maxAmount', type: 'number' },
                    { label: 'Min Amount', name: 'minAmount', type: 'number' },
                    { label: 'Peak Hours Amount', name: 'peakHoursAmount', type: 'number' },
                    { label: 'Normal Hours Amount', name: 'normalHoursAmount', type: 'number' },
                    { label: 'City', name: 'city' },
                    { label: 'Cost per Impression', name: 'costPerImpression', type: 'number' },
                    { label: 'File URL', name: 'fileUrl' },
                    { label: 'URL', name: 'url' },
                  ].map(({ label, name, type = 'text' }) => (
                    <div className="form-group" key={name}>
                      <label>{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="form-control"
                        placeholder={`Enter ${label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllLocations;
