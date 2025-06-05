import React from 'react';
// import bikeImage from '../assets/Images/bikeImagee.png';

const BikeDetails = () => {
  // Assuming the purchased bike color is black (you can change this)
  const purchasedColor = 'black';
  
  return (
    <div className="container-fluid p-0" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Sticky Header */}
      <div
        style={{
          position: 'sticky',
          top: '0',
          backgroundColor: 'white',
          zIndex: '100',
          padding: '15px 0',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid #eee'
        }}
      >
        <div className="container">
          <h2 className="text-center mb-0">Bike Details</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ height: 'calc(100vh - 70px)', overflow: 'hidden' }}>
        <div className="row h-100">
          {/* Left side - Bike Image (Fixed) */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-4">
            <div
              style={{
                border: '1px solid #eee',
                padding: '15px',
                borderRadius: '12px',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9f9f9'
              }}
            >
              <img
                src={bikeImage}
                alt={`Bike in ${purchasedColor} color`}
                className="img-fluid"
                style={{ 
                  maxHeight: '100%', 
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  filter: purchasedColor === 'black' ? 'brightness(0.9)' : 
                         purchasedColor === 'white' ? 'brightness(1.2)' : 
                         `hue-rotate(${getHueRotation(purchasedColor)}deg)`
                }}
              />
            </div>
          </div>

          {/* Right side - Scrollable Specifications */}
          <div className="col-lg-6 p-4" style={{ overflowY: 'auto', height: '100%' }}>
            <div style={{ paddingRight: '15px' }}>
              <h4 className="mb-4">Specifications</h4>
              
              <table className="table table-hover">
                <tbody>
                  <tr className="table-light">
                    <td><strong>Transmission:</strong></td>
                    <td><span className="text-primary">Front & Reverse</span></td>
                  </tr>
                  <tr>
                    <td><strong>Motor:</strong></td>
                    <td><span className="text-primary">BLDC Hub Motor</span></td>
                  </tr>
                  <tr className="table-light">
                    <td><strong>Dimensions:</strong></td>
                    <td>1900mm / 480mm / 1150mm</td>
                  </tr>
                  <tr>
                    <td><strong>Wheelbase:</strong></td>
                    <td>1470mm</td>
                  </tr>
                  <tr className="table-light">
                    <td><strong>Ground Clearance:</strong></td>
                    <td>180mm</td>
                  </tr>
                  <tr>
                    <td><strong>Kerb Weight:</strong></td>
                    <td>85 kg</td>
                  </tr>
                  <tr className="table-light">
                    <td><strong>Loading Capacity:</strong></td>
                    <td>200 kg</td>
                  </tr>
                  <tr>
                    <td><strong>Tyre Size:</strong></td>
                    <td>10-12 Inch</td>
                  </tr>
                  <tr className="table-light">
                    <td><strong>Brake:</strong></td>
                    <td>Double Disc - 220mm Disk Brake</td>
                  </tr>
                  <tr>
                    <td><strong>Battery Type:</strong></td>
                    <td>Lead / Lithium / Graphene</td>
                  </tr>
                  <tr className="table-light">
                    <td><strong>Lead Battery:</strong></td>
                    <td>60V - 32/38/42 Ah</td>
                  </tr>
                  <tr>
                    <td><strong>Charging Time (Lead):</strong></td>
                    <td>7-8 Hours</td>
                  </tr>
                  <tr className="table-light">
                    <td><strong>Range (Lead):</strong></td>
                    <td>50/80/100 km</td>
                  </tr>
                  <tr>
                    <td><strong>Lithium Battery:</strong></td>
                    <td>60V - 30/34/42/52 Ah</td>
                  </tr>
                  <tr className="table-light">
                    <td><strong>Charging Time (Lithium):</strong></td>
                    <td>5/6/4.5/5.5 Hours</td>
                  </tr>
                  <tr>
                    <td><strong>Range (Lithium):</strong></td>
                    <td>70/90/110/140 km</td>
                  </tr>
                </tbody>
              </table>

              {/* Display purchased color information */}
              <div className="mt-4 pt-3 border-top">
                <h5>Color:</h5>
                <div className="d-flex align-items-center gap-3 mt-3">
                  <div 
                    style={{ 
                      backgroundColor: purchasedColor, 
                      width: '35px', 
                      height: '35px', 
                      borderRadius: '50%',
                      border: purchasedColor === 'white' ? '1px solid #ddd' : 'none'
                    }}
                  />
                  <span className="text-capitalize">{purchasedColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to adjust image color (optional)
function getHueRotation(color) {
  switch(color) {
    case 'red': return -30;
    case 'blue': return 180;
    case 'green': return 90;
    default: return 0;
  }
}

export default BikeDetails;