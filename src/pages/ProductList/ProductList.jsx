import React, { useState } from 'react';

const bikes = [
  {
    id: 1,
    name: 'ETORQ PRO',
    image: 'https://via.placeholder.com/100?text=ETORQ+PRO',
    model: 'ET-001',
    price: '₹80,000',
    specs: {
      Transmission: 'Front & Reverse',
      Motor: 'BLDC Hub Motor',
      Dimensions: '1900mm / 490mm / 1150mm',
      Wheelbase: '1450mm',
      BatteryType: 'Lithium',
      Color: 'Red',
    },
    availableColors: ['Red', 'Black', 'White', 'Blue'],
  },
  {
    id: 2,
    name: 'X-BOLT',
    image: 'https://via.placeholder.com/100?text=X-BOLT',
    model: 'XB-002',
    price: '₹90,000',
    specs: {
      Transmission: 'Front & Reverse',
      Motor: 'BLDC Hub Motor',
      Dimensions: '1920mm / 500mm / 1180mm',
      Wheelbase: '1490mm',
      BatteryType: 'Graphene',
      Color: 'Black',
    },
    availableColors: ['Black', 'Red', 'White', 'Green'],
  },
  {
    id: 3,
    name: 'CLASSIC-PRO',
    image: 'https://via.placeholder.com/100?text=CLASSIC-PRO',
    model: 'CP-003',
    price: '₹75,000',
    specs: {
      Transmission: 'Front & Reverse',
      Motor: 'BLDC Hub Motor',
      Dimensions: '1900mm / 480mm / 1150mm',
      Wheelbase: '1470mm',
      BatteryType: 'Lithium',
      Color: 'Red',
    },
    availableColors: ['Red', 'Black', 'White'],
  },
  {
    id: 4,
    name: 'X-BOLT PLUS',
    image: 'https://via.placeholder.com/100?text=X-BOLT+PLUS',
    model: 'XB-004',
    price: '₹95,000',
    specs: {
      Transmission: 'Front & Reverse',
      Motor: 'BLDC Hub Motor',
      Dimensions: '1950mm / 490mm / 1170mm',
      Wheelbase: '1500mm',
      BatteryType: 'Lithium',
      Color: 'Black',
    },
    availableColors: ['Black', 'Red', 'White', 'Sea Green'],
  },
  {
    id: 5,
    name: 'CLASSIC SUPER',
    image: 'https://via.placeholder.com/100?text=CLASSIC+SUPER',
    model: 'CS-005',
    price: '₹85,000',
    specs: {
      Transmission: 'Front & Reverse',
      Motor: 'BLDC Hub Motor',
      Dimensions: '1900mm / 470mm / 1160mm',
      Wheelbase: '1450mm',
      BatteryType: 'Lithium',
      Color: 'Blue',
    },
    availableColors: ['Blue', 'White', 'Green', 'Black'],
  },
];

const ProductListing = () => {
  const [selectedBike, setSelectedBike] = useState(null);

  const handleView = (bike) => setSelectedBike(bike);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center text-primary">Bike Product Listing</h2>

      <div className="row">
        {/* Bike Listing Table */}
        {bikes.map((bike) => (
          <div className="col-md-4 mb-3" key={bike.id}>
            <div className="card shadow-lg">
              <img
                src={bike.image}
                alt={bike.name}
                className="card-img-top"
                style={{ cursor: 'pointer' }}
                onClick={() => handleView(bike)}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{bike.name}</h5>
                <p className="card-text">{bike.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View Section */}
      {selectedBike && (
        <div className="mt-5 card shadow p-4">
          <h3 className="text-primary">Details for {selectedBike.name}</h3>
          <div className="row">
            <div className="col-md-4">
              <img
                src={selectedBike.image}
                alt={selectedBike.name}
                className="img-fluid mb-3"
                style={{ width: '100%' }}
              />
            </div>
            <div className="col-md-8">
              <ul className="list-group">
                {Object.entries(selectedBike.specs).map(([key, val]) => (
                  <li key={key} className="list-group-item d-flex justify-content-between">
                    <strong>{key}</strong>
                    <span>{val}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3">
                <strong>Available Colors:</strong>
                <div className="d-flex flex-wrap">
                  {selectedBike.availableColors.map((color, index) => (
                    <span
                      key={index}
                      className="badge me-2 mb-2"
                      style={{
                        backgroundColor: color.toLowerCase(),
                        color: 'white',
                        padding: '10px',
                      }}
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
