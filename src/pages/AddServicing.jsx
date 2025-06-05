import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import Select from 'react-select';

const AddServicing = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', bike: 'X-Bolt' },
    { id: 2, name: 'Jane Smith', bike: 'Classic Pro' },
    { id: 3, name: 'Robert Brown', bike: 'E-TORQ' },
    { id: 4, name: 'Lucy Green', bike: 'X-Bolt Plus' }
  ]);

  const [serviceDetails, setServiceDetails] = useState({
    userName: '',
    bike: '',
    serviceType: [],
    serviceDate: '',
    description: '',
    cost: ''
  });

  const serviceOptions = [
    { value: 'Motor', label: 'Motor' },
    { value: 'Controller', label: 'Controller' },
    { value: 'Battery', label: 'Battery' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!serviceDetails.userName || !serviceDetails.bike || !serviceDetails.serviceDate || !serviceDetails.serviceType.length) return;

    // Your logic to submit the data
    console.log(serviceDetails);
  };

  const handleServiceTypeChange = (selectedOptions) => {
    const serviceType = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setServiceDetails({ ...serviceDetails, serviceType });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Bike Servicing Details</h2>

      <Card className="mb-4">
        <Card.Header as="h5">Add Service Record</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Select
                    value={serviceDetails.userName}
                    onChange={(e) => {
                      const selectedUser = users.find(user => user.name === e.target.value);
                      setServiceDetails({ ...serviceDetails, userName: e.target.value, bike: selectedUser?.bike || '' });
                    }}
                    required
                  >
                    <option value="">Select User</option>
                    {users.map(user => (
                      <option key={user.id} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Bike</Form.Label>
                  <Form.Control
                    type="text"
                    value={serviceDetails.bike}
                    onChange={(e) => setServiceDetails({ ...serviceDetails, bike: e.target.value })}
                    disabled
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Service Type</Form.Label>
                  <Select
                    isMulti
                    options={serviceOptions}
                    value={serviceOptions.filter(option => serviceDetails.serviceType.includes(option.value))}
                    onChange={handleServiceTypeChange}
                    placeholder="Select Service Type(s)"
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Service Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={serviceDetails.serviceDate}
                    onChange={(e) => setServiceDetails({ ...serviceDetails, serviceDate: e.target.value })}
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={serviceDetails.description}
                onChange={(e) => setServiceDetails({ ...serviceDetails, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cost (₹)</Form.Label>
              <Form.Control
                type="number"
                value={serviceDetails.cost}
                onChange={(e) => setServiceDetails({ ...serviceDetails, cost: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Service Record
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddServicing;
