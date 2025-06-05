import React, { useState, useEffect } from 'react';
import CardHeader from '@/components/shared/CardHeader';
import Pagination from '@/components/shared/Pagination';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { getAllLocations, getAlldata, updateByIDAssignData, deleteAssignData } from '../services/api';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AllCampaigns = ({ filterStatus = null, onDataLoaded }) => {
    const [campaigns, setCampaigns] = useState([]);
    const [locations, setLocations] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [campaignNameSearch, setCampaignNameSearch] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await getAllLocations();
                if (data && Array.isArray(data)) {
                    const uniqueLocations = [...new Set(data.map(loc => loc.location))];
                    setLocations(uniqueLocations.map(loc => ({ _id: loc, name: loc })));
                } else {
                    console.error("Unexpected response format:", data);
                }
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
    }, []);

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const formattedDate = selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : null;
            const formattedTime = selectedTime ? moment(selectedTime, 'HH:mm').format('HH:mm') : null;

            const { data, totalPages } = await getAlldata(
                '', // search not used
                page,
                selectedLocation, // ✅ using location in API call
                formattedDate,
                '' // time not used in API
            );

            let updatedData = data.map((item) => ({
                ...item,
                status: item.status || "Pending"
            }));

            // Client-side filtering (in case backend doesn't support some of these)
            if (formattedDate) {
                updatedData = updatedData.filter(item =>
                    moment(item.createdAt).format('YYYY-MM-DD') === formattedDate
                );
            }

            if (formattedTime) {
                updatedData = updatedData.filter(item =>
                    moment(item.createdAt).format('HH:mm') === formattedTime
                );
            }

            if (search) {
                updatedData = updatedData.filter(item =>
                    item.userId?.fullName?.toLowerCase().includes(search.toLowerCase())
                );
            }

            if (campaignNameSearch) {
                updatedData = updatedData.filter(item =>
                    item.campaignName?.toLowerCase().includes(campaignNameSearch.toLowerCase())
                );
            }

            if (selectedLocation) {
                updatedData = updatedData.filter(item =>
                    item.locationId?.location === selectedLocation
                );
            }

            if (filterStatus) {
                updatedData = updatedData.filter(item => item.status === filterStatus);
            }

            const expandedCampaigns = [];

            updatedData.forEach((item) => {
                const slots = Number(item.totalSlots) || 1;
                for (let i = 0; i < slots; i++) {
                    expandedCampaigns.push({
                        ...item,
                        slotIndex: i + 1 // Optional: show which slot number it is
                    });
                }
            });


            if (onDataLoaded) {
                onDataLoaded(expandedCampaigns); // passing expanded & filtered data up
            }
            setCampaigns(updatedData, expandedCampaigns);

            setTotalPages(totalPages || 1);

        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, [search, campaignNameSearch, selectedLocation, selectedDate, selectedTime, page, filterStatus]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateByIDAssignData(id, { status: newStatus });
            fetchCampaigns();
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAssignData(id);
            setCampaigns(prev => prev.filter(item => item._id !== id));
        } catch (err) {
            console.error("Error deleting campaign", err);
        }
    };

    return (
        <div className="col-lg-12">
            <div className="card stretch stretch-full">
                <CardHeader title={`Campaign Tracker ${filterStatus ? `- ${filterStatus}` : ''}`} />

                {/* Filters */}
                <div className="card-body custom-card-action m-4 p-0">
                    <div className="filters mb-4">
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <select
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="form-control"
                                >
                                    <option value="">Select Location</option>
                                    {locations.map((location) => (
                                        <option key={location._id} value={location._id}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-3 mb-3">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={setSelectedDate}
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="Select Date"
                                    className="form-control"
                                />
                            </div>

                            <div className="col-md-3 mb-3">
                                <input
                                    type="time"
                                    value={selectedTime || ''}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    className="form-control"
                                    placeholder="Select Time"
                                />
                            </div>

                            <div className="col-md-3 mb-3">
                                <input
                                    type="text"
                                    placeholder="Search by Client Name"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="form-control"
                                />
                            </div>

                            <div className="col-md-3 mb-3">
                                <input
                                    type="text"
                                    placeholder="Search by Campaign Name"
                                    value={campaignNameSearch}
                                    onChange={(e) => setCampaignNameSearch(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Campaign Table */}
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 text-center" style={{ tableLayout: 'auto', minWidth: '1600px' }}>
                            <thead>
                                <tr>
                                    <th style={{ whiteSpace: 'nowrap' }}>SR No.</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Time</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Client Name</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Client Number</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Location</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Timeslot Name</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Timeslot Price</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Amount</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Duration</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Total Slots</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Peak Slots</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Normal Slots</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Estimate Reach</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Total Budgets</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Status</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Campaign Name</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Content</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Media File</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>PDF Bill</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Created At</th>
                                    <th style={{ whiteSpace: 'nowrap' }} className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="20" className="text-center">Loading...</td></tr>
                                ) : campaigns.length > 0 ? (
                                    campaigns.map((item, index) => (
                                        <tr key={item._id || index}>
                                            <td>{(page - 1) * 10 + index + 1}</td>
                                            <td>{moment(item.createdAt).format("hh:mm A")}</td>
                                            <td>{item.userId?.fullName || '-'}</td>
                                            <td>{item.userId?.phone || '-'}</td>
                                            <td>{item.locationId?.location || '-'}</td>
                                            <td>{item.timeslot?.name || '-'}</td>
                                            <td>{item.timeslot?.amount || '-'}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.duration}</td>
                                            <td>{item.totalSlots}</td>
                                            <td>{item.peakSlots}</td>
                                            <td>{item.normalSlots}</td>
                                            <td>{item.estimateReach}</td>
                                            <td>{item.totalBugets}</td>
                                            <td className="text-start">{item.status}</td>
                                            <td>{item.campaignName || '-'}</td>
                                            <td>{item.Content || '-'}</td>
                                            <td>
                                                {item.MediaFile ? (
                                                    <a href={item.MediaFile} target="_blank" rel="noopener noreferrer">
                                                        <img src={item.MediaFile} alt="Media" style={{ width: 60 }} />
                                                    </a>
                                                ) : 'N/A'}
                                            </td>
                                            <td>
                                                {item.billPdf ? (
                                                    <a href={item.billPdf} download className="btn btn-sm btn-info">
                                                        PDF
                                                    </a>
                                                ) : 'No PDF'}
                                            </td>
                                            <td>{moment(item.createdAt).format("DD-MM-YYYY hh:mm A")}</td>
                                            <td>
                                                <div className="hstack gap-2 justify-content-end">
                                                    <button className="btn btn-sm btn-warning" onClick={() => alert(`Edit ${item._id}`)}>
                                                        <FiEdit />
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item._id)}>
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="20" className="text-center">No campaigns found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card-footer d-flex justify-content-center">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </div>

            </div>
        </div>
    );
};

export default AllCampaigns;
