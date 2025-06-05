// import React from "react";
// import { Navigate } from "react-router-dom";

// // Utility function to check if a token exists and is valid
// const isAuthenticated = () => {
//   const token = localStorage.getItem('token'); // Replace 'authToken' with your token key
//   // Add your logic to validate the token if needed
//   return !!token;
// };

// const AuthProtected = ({ children }) => {
//   const isLoggedIn = isAuthenticated();

//   if (!isLoggedIn) {
//     return <Navigate to="/login" />;
//   }

//   return <>{children}</>;
// };

// export { AuthProtected };
// router.jsx or your routing file
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavigationManu from "@/components/shared/navigationMenu/NavigationManu";
import Header from "@/components/shared/header/Header";
import useBootstrapUtils from "@/hooks/useBootstrapUtils";
import SupportDetails from "@/components/supportDetails";

const RootLayout = () => {
  const pathName = useLocation().pathname; // Get current path
  useBootstrapUtils(pathName); // Hook for Bootstrap utility (if necessary)

  return (
    <>
      <Header />
      <NavigationManu /> {/* Include NavigationManu which includes Sidebar */}
      <main className="nxl-container">
        <div className="nxl-content">
          <Outlet /> {/* This is where page content will be rendered */}
        </div>
      </main>
      <SupportDetails /> {/* Support footer or details */}
    </>
  );
};

export default RootLayout;
