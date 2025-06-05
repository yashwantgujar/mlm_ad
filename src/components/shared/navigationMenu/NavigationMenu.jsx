import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import Menus from './Menus';
import { NavigationContext } from '../../../contentApi/navigationProvider';

const NavigationManu = () => {
  const { navigationOpen, setNavigationOpen } = useContext(NavigationContext);
  const pathName = useLocation().pathname;

  useEffect(() => {
    setNavigationOpen(false);
  }, [pathName]);

  const role = localStorage.getItem("role");

  const getRoleLabel = () => {
    switch (role) {
      case "admin":
        return "Admin";
      case "dealer":
        return "Dealer";
      case "subdealer":
        return "Sub Dealer";
      default:
        return "User";
    }
  };

  return (
    <nav className={` nxl-navigation  ${navigationOpen ? "mob-navigation-active" : ""}`}
       style={{
    background: "linear-gradient(180deg,rgb(136, 208, 185) 0 0%,rgb(29, 127, 152) 100%)",
    zIndex: 1180, // lower than header's 1050
    position: 'fixed', // ensure it's positioned properly
    top: 0,
    left: 0,
    bottom: 0,
     border: 0,
         borderRight: "none",
 
  }}

      

    >
    
      {/* <div className="m-header" style={{ background: "linear-gradient(90deg,rgb(63, 189, 164) 0%,rgb(13, 100, 90) 100%)" }} >
        <Link to="/" className="b-brand">
          <h3>{getRoleLabel()}</h3>
          <img src="/images/logo-abbr.png" alt="logo" className="logo logo-sm" />
        </Link>
      </div> */}




      <div className="navbar-wrapper" style={{ margin: 0, padding: 0 }}>

        {/* <div className="m-header"  style={{ background: "linear-gradient(90deg,rgb(63, 189, 164) 0%,rgb(8, 119, 106) 100%)" }} >
          <Link to="/" className="b-brand">
            <h3>{getRoleLabel()}</h3>
            <img src="/images/logo-abbr.png" alt="logo" className="logo logo-sm" />
          </Link>
        </div> */}




        <div className={`navbar-content`}

        >
          
     <div className="flex justify-between items-center w-full px-4 py-2">
  {/* Logo and Role Label in One Line */}
  <div className="flex items-center text-large gap-6 ">
    <span className='p-2'>
      <img
      src="/"
      alt="logo"
      className="h-8 w-auto object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<span class="text-sm font-medium text-white">Logo</span>';
      }}
    />
   
  
    </span>
   <span  className="text-2xl font-extrabold  font-bold text-white  h-10 text-bold" style={{ fontSize: "30px", fontWeight: "800" }}>
     
     <strong>{getRoleLabel()}</strong></span>
  </div>
       

 
</div>





        


          <PerfectScrollbar>
       

   <div style={{
  width: '80%',
  height: '2px',
  backgroundColor: 'white',
  marginTop: '8px',

  marginLeft: '18px', // added left margin
  position: 'relative',
  zIndex: 1200
}}></div>


            <ul className="nxl-navbar">
                

              <li className="nxl-item nxl-caption">
       
       

                <label style={{ color: 'rgb(227, 236, 235)' }} className="text-lg font-semibold">
                  Navigation
                </label>





              </li>
              <Menus />
            </ul>

            {/* Optional card section */}
            {/* <div className="card text-center">
              <div className="card-body">
                <i className="fs-4 text-dark"><FiSunrise /></i>
                <h6 className="mt-4 text-dark fw-bolder">Downloading Center</h6>
                <p className="fs-11 my-3 text-dark">Duralux is a production ready CRM to get started up and running easily.</p>
                <Link to="#" className="btn btn-primary text-dark w-100">Download Now</Link>
              </div>
            </div> */}

            <div style={{ height: "18px" }}></div>
          </PerfectScrollbar>
        </div>
      </div>
      <div
        onClick={() => setNavigationOpen(false)}
        className={`${navigationOpen ? "nxl-menu-overlay" : ""}`}
      ></div>
    </nav>
  );
};

export default NavigationManu;
