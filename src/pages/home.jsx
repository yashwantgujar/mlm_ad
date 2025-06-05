// import React from 'react'
// import LeadsOverviewChart from '@/components/widgetsCharts/LeadsOverviewChart'
// import LatestLeads from '@/components/widgetsTables/LatestLeads'
// import Schedule from '@/components/widgetsList/Schedule'
// import Project from '@/components/widgetsList/Project'
// import TeamProgress from '@/components/widgetsList/Progress'
// import PaymentRecordChart from '@/components/widgetsCharts/PaymentRecordChart'
// import SiteOverviewStatistics from '@/components/widgetsStatistics/SiteOverviewStatistics'
// import TasksOverviewChart from '@/components/widgetsCharts/TasksOverviewChart'
// import SalesMiscellaneous from '@/components/widgetsMiscellaneous/SalesMiscellaneous'
// import PageHeaderDate from '@/components/shared/pageHeader/PageHeaderDate'
// import PageHeader from '@/components/shared/pageHeader/PageHeader'
// import Footer from '@/components/shared/Footer'
// import { projectsDataTwo } from '@/utils/fackData/projectsDataTwo'


// const Home = () => {
//     return (
//         <>
//             <PageHeader >
//                 <PageHeaderDate />
//             </PageHeader>
//             <div className='main-content'>
//                 <div className='row'>
//                     <SiteOverviewStatistics />
//                     <PaymentRecordChart />
//                     <SalesMiscellaneous isFooterShow={true} dataList={projectsDataTwo} />
                   
                    
//                     {/* <TasksOverviewChart /> */}
//                     <LeadsOverviewChart chartHeight={315} />
//                     {/* <LatestLeads title={"Latest Users"} /> */}
//                     {/* <Schedule title={"Upcoming Schedule"} /> */}
//                     {/* <Project cardYSpaceClass="hrozintioal-card" borderShow={true} title="Project Status" /> */}
//                     {/* <TeamProgress title={"Total Progress"} footerShow={true} /> */}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default Home




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState ,useEffect} from 'react';
// import { getAllProducts } from '../services/api';


// const Home = () => {
//   const navigate = useNavigate();
//   const [userRole, setUserRole] = useState("");


//   const role = localStorage.getItem('role');
  
//   console.log(role);

//   // Buttons for each role (3 buttons per role)
//   const roleButtons = {
//     admin: [
//       {
//         label: "products",
//         icon: '🛵',
//       bg: 'linear-gradient(135deg, #8E2DE2, rgb(6, 231, 234))',
//         route: '/all-product-list-by-admin',
//       },
//       {
//         label: "Users",
//         icon: '👤',
//         bg: 'linear-gradient(135deg, #11998e, #38ef7d)',
//         route: '/all-dealer-subdealer-list-by-admin',
//       },
//       {
//         label: "Enquiry",
//         icon: '📞',
//         bg: 'linear-gradient(135deg, #00F260, rgb(2, 206, 148))',
//         route: '/enquiry',
//       },
//     ],
//     dealer: [
//       {
//         label: "Products",
//         icon: '🛵',
//         bg: 'linear-gradient(135deg, #8E2DE2, rgb(6, 231, 234))',
//         route: '/all-product-list-by-dealer',
//       },
//       {
//         label: "Users",
//         icon: '👤',
//         bg: 'linear-gradient(135deg, rgb(63, 170, 143), rgb(78, 212, 210))',
//         route: '/all-dealer-subdealer-list-by-dealer',
//       },
//       {
//         label: "Income",
//         icon: '💰',
//         bg: 'linear-gradient(135deg, #00F260, rgb(2, 206, 148))',
//         route: '/get-incentives',
//       },
      
//       {
//         label: "club-incentives",
//         icon: '👥',
//         bg: 'linear-gradient(135deg, #8E2DE2, rgb(6, 231, 234))',
//         route: '/club-incentives',
//       },
//     ],
//     subdealer: [
//       {
//         label: "products",
//         icon: '🛵',
//         bg: 'linear-gradient(135deg, #8E2DE2, rgb(6, 231, 234))',
//         route: '/all-product-list-by-subdealer',
//       },
//       {
//         label: "Users",
//         icon: '👤',
//         bg: 'linear-gradient(135deg, #43cea2, #185a9d)',
//         route: '/all-dealer-subdealer-list-by-subdealer',
//       },
//       {
//         label: "Income",
//         icon: '💰',
//          bg: 'linear-gradient(135deg, #00F260, rgb(2, 206, 148))',
//         route: '/subdealer-incentives',
//       },
//     ],
//      user: [
//       // {
//       //   label: "Products",
//       //   icon: '🛵',
//       //   bg: 'linear-gradient(135deg, #8E2DE2, rgb(6, 231, 234))',
//       //   route: '/all-dealer-subdealer-list-by-user',
//       // },
//       {
//         label: "Users",
//         icon: '👤',
//         bg: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
//         route: '/all-dealer-subdealer-list-by-user',
//       },
//       {
//         label: "Income",
//         icon: '💰',
//          bg: 'linear-gradient(135deg, #00F260, rgb(2, 206, 148))',
//         route: '/user/orders',
//       },
//     ],
//   }; 

//   const buttons = roleButtons[role] || [];


//  const [products, setProducts] = useState([]);

//  useEffect(() => {
//     const role = localStorage.getItem("role");
//     setUserRole(role);
//     console.log("Role from localStorage:", role);
//   }, []);
     

     
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await getAllProducts();
//       console.log("all", response);
//       setProducts(response.data);
//     } catch (err) {
//       console.error("Failed to fetch products", err);
//     }
//   };

//   if (userRole === "admin") {
//     fetchData();
//   }
// }, [userRole]);




//   return (
//     <div
//       className="container mt-5"
//       style={{
//         minHeight: '100vh',
//      background: 'linear-gradient(135deg,rgb(167, 189, 189),rgb(219, 232, 229),rgb(146, 192, 170))',
//       // background: 'linear-gradient(135deg, #0f0f0f, #014d01,rgb(59, 168, 59))',
//       // background: 'linear-gradient(135deg, #000000, #003300, #00FF00)',



//         paddingTop: '3rem',
//         paddingBottom: '3rem',
//       }}
//     >
//       <div className="row justify-content-center g-4">
//         {buttons.map((btn, idx) => (
//           <div
//             key={idx}
//             className="col-12 col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center"
//           >
//             <div

//               // onClick={() => navigate(roleButtons.route)}
//               onClick={() => {
//                 console.log('Navigating to:', btn.route);
//                 navigate(btn.route);
//               }}
//               className="card text-white position-relative overflow-hidden shadow d-flex flex-column justify-content-start p-4"
//               style={{
//                 width: '100%',
//                 maxWidth: '320px',
//                 height: '180px',
//                 background: btn.bg,
//                 borderRadius: '1.5rem',
//                 cursor: 'pointer',
//                 transition: 'transform 0.3s ease-in-out, opacity 0.3s',
//                 opacity: 0.9,
//                 userSelect: 'none',
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'scale(1.07)';
//                 e.currentTarget.style.opacity = 1;
//                 const triangle = e.currentTarget.querySelector('.triangle');
//                 if (triangle) {
//                   triangle.style.right = '10px';
//                   triangle.style.opacity = '0.35';
//                 }
//                 const cube = e.currentTarget.querySelector('.cube');
//                 if (cube) {
//                   cube.style.bottom = '10px';
//                   cube.style.opacity = '0.25';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'scale(1)';
//                 e.currentTarget.style.opacity = 0.9;
//                 const triangle = e.currentTarget.querySelector('.triangle');
//                 if (triangle) {
//                   triangle.style.right = '-100px';
//                   triangle.style.opacity = '0';
//                 }
//                 const cube = e.currentTarget.querySelector('.cube');
//                 if (cube) {
//                   cube.style.bottom = '-100px';
//                   cube.style.opacity = '0';
//                 }
//               }}
//             >
//               {/* Icon and label on top-left */}
//               <div className="d-flex flex-column align-items-start" style={{ zIndex: 1 }}>
//                 <div
//                   style={{
//                     fontSize: '3rem',
//                     marginBottom: '0.3rem',
//                     textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
//                   }}
//                 >
//                   {btn.icon}
//                 </div>
//                 <h5
//                   className="card-title"
//                   style={{
//                     fontWeight: '600',
//                     fontSize: '1.4rem',
//                     textShadow: '1px 1px 4px rgba(0,0,0,0.35)',
//                     margin: 0,
//                   }}
//                 >
//                   {btn.label}
//                 </h5>
//               </div>

//               {/* Triangle shape with emoji */}
//               <div
//                 className="triangle position-absolute d-flex justify-content-center align-items-center"
//                 style={{
//                   width: 0,
//                   height: 0,
//                   borderLeft: '50px solid transparent',
//                   borderRight: '50px solid transparent',
//                   // borderBottom: '100px solid rgba(0,0,0,0.25)',
//                   top: '10px',
//                   right: '-100px',
//                   opacity: 0,
//                   transition: 'right 0.4s ease-in-out, opacity 0.4s',
//                   pointerEvents: 'none',
//                   zIndex: 0,
//                 }}
//               >
//                 <span
//                   style={{
//                     position: 'absolute',
//                     top: '-40px',
//                     fontSize: '6rem',
//                   }}
//                 >
//                   {idx === 0 && '🛵'}
//                   {idx === 1 && '👤'}
//                   {idx === 2 && '💵'}
//                   {idx === 3 &&  '👥'}
//                 </span>
//               </div>

//               {/* Cube shape with emoji */}
//               <div
//                 className="cube position-absolute d-flex justify-content-center align-items-center"
//                 style={{
//                   width: '60px',
//                   height: '60px',
//                   backgroundColor: 'rgba(255, 255, 255, 0.15)',
//                   boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.25)',
//                   transform: 'rotate(25deg)',
//                   bottom: '-100px',
//                   right: '20px',
//                   opacity: 0,
//                   transition: 'bottom 0.4s ease-in-out, opacity 0.4s',
//                   zIndex: 0,
//                   borderRadius: '0.5rem',
//                 }}
//               >
//                 <span style={{ fontSize: '1.8rem' }}>
//                   {idx === 0 && '🛵'}
//                   {idx === 1 && '👤'}
//                   {idx === 2 && '💵'}
//                   {idx === 3 &&  '👥'}
//                 </span>
//               </div>

//             </div>
//           </div>
//         ))}
//       </div>

//           {/* <BikeMonthlyChart bikes={products}></BikeMonthlyChart> */}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllProducts } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [products, setProducts] = useState([]);

  const role = localStorage.getItem('role');

  useEffect(() => {
    const roleFromStorage = localStorage.getItem("role");
    setUserRole(roleFromStorage);
    console.log("Role from localStorage:", roleFromStorage);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        console.log("all", response);
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    if (userRole === "admin") {
      fetchData();
    }
  }, [userRole]);

  const roleButtons = {
    admin: [
      { label: "products", icon: '🛵', bg: 'linear-gradient(135deg, #8E2DE2, rgb(6, 231, 234))', route: '/all-product-list-by-admin' },
      { label: "Users", icon: '👤', bg: 'linear-gradient(135deg, #11998e, #38ef7d)', route: '/all-dealer-subdealer-list-by-admin' },
      { label: "Enquiry", icon: '📞', bg: 'linear-gradient(135deg, #00F260, rgb(2, 206, 148))', route: '/enquiry' }, 
        { label: "add-product", icon: '🛵+ ', bg: 'linear-gradient(135deg, #8E2DE2, rgb(6, 231, 234))', route: '/add-product-by-admin' },
    ],
    dealer: [
      { label: "Products", icon: '🛵', bg: 'linear-gradient(135deg, #8E2DE2, rgb(6, 231, 234))', route: '/all-product-list-by-dealer' },
      { label: "Users", icon: '👤', bg: 'linear-gradient(135deg, rgb(63, 170, 143), rgb(78, 212, 210))', route: '/all-dealer-subdealer-list-by-dealer' },
      { label: "Income", icon: '💰', bg: 'linear-gradient(135deg, #00F260, rgb(2, 206, 148))', route: '/get-incentives' },
      { label: "club-incentives", icon: '👥', bg: 'linear-gradient(135deg, #8E2DE2, rgb(6, 231, 234))', route: '/club-incentives' },
    ],
    subdealer: [
      { label: "products", icon: '🛵', bg: 'linear-gradient(135deg, #8E2DE2, rgb(6, 231, 234))', route: '/all-product-list-by-subdealer' },
      { label: "Users", icon: '👤', bg: 'linear-gradient(135deg, #43cea2, #185a9d)', route: '/all-dealer-subdealer-list-by-subdealer' },
      { label: "Income", icon: '💰', bg: 'linear-gradient(135deg, #00F260, rgb(2, 206, 148))', route: '/subdealer-incentives' },
    ],
    user: [
      { label: "Users", icon: '👤', bg: 'linear-gradient(135deg, #2193b0, #6dd5ed)', route: '/all-dealer-subdealer-list-by-user' },
      { label: "Income", icon: '💰', bg: 'linear-gradient(135deg, #00F260, rgb(2, 206, 148))', route: '/user/orders' },
    ],
  };

  const buttons = roleButtons[role] || [];

  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,rgb(167, 189, 189),rgb(219, 232, 229),rgb(146, 192, 170))',
        padding: '0',
        margin: '0',
       
       
      }}
    ><div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-8 pt-4 px-3 ">
        {buttons.map((btn, idx) => (
          <div key={idx} className="col d-flex justify-content-center">
            <div
              onClick={() => navigate(btn.route)}
              className="card text-white position-relative overflow-hidden shadow d-flex flex-column justify-content-start p-4"
              style={{
                width: '100%',
                maxWidth: '320px',
                height: '180px',
                background: btn.bg,
                borderRadius: '1.5rem',
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out, opacity 0.3s',
                opacity: 0.9,
                userSelect: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.07)';
                e.currentTarget.style.opacity = 1;
                const triangle = e.currentTarget.querySelector('.triangle');
                const cube = e.currentTarget.querySelector('.cube');
                if (triangle) {
                  triangle.style.right = '10px';
                  triangle.style.opacity = '0.35';
                }
                if (cube) {
                  cube.style.bottom = '10px';
                  cube.style.opacity = '0.25';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.opacity = 0.9;
                const triangle = e.currentTarget.querySelector('.triangle');
                const cube = e.currentTarget.querySelector('.cube');
                if (triangle) {
                  triangle.style.right = '-100px';
                  triangle.style.opacity = '0';
                }
                if (cube) {
                  cube.style.bottom = '-100px';
                  cube.style.opacity = '0';
                }
              }}
            >
              <div className="d-flex flex-column align-items-start" style={{ zIndex: 1 }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.3rem', textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>
                  {btn.icon}
                </div>
                <h5 className="card-title" style={{ fontWeight: '600', fontSize: '1.4rem', textShadow: '1px 1px 4px rgba(0,0,0,0.35)', margin: 0 }}>
                  {btn.label}
                </h5>
              </div>

              {/* Triangle */}
              <div
                className="triangle position-absolute d-flex justify-content-center align-items-center"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '50px solid transparent',
                  borderRight: '50px solid transparent',
                  top: '10px',
                  right: '-100px',
                  opacity: 0,
                  transition: 'right 0.4s ease-in-out, opacity 0.4s',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                <span style={{ position: 'absolute', top: '-40px', fontSize: '6rem' }}>
                  {idx === 0 && '🛵'}
                  {idx === 1 && '👤'}
                  {idx === 2 && '💵'}
                  {idx === 3 && '👥'}
                </span>
              </div>

              {/* Cube */}
              <div
                className="cube position-absolute d-flex justify-content-center align-items-center"
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.25)',
                  transform: 'rotate(25deg)',
                  bottom: '-100px',
                  right: '20px',
                  opacity: 0,
                  transition: 'bottom 0.4s ease-in-out, opacity 0.4s',
                  zIndex: 0,
                  borderRadius: '0.5rem',
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>
                  {idx === 0 && '🛵'}
                  {idx === 1 && '👤'}
                  {idx === 2 && '💵'}
                  {idx === 3 && '👥'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
