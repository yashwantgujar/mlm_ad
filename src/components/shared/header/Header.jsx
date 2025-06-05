import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiAlignLeft, FiArrowLeft, FiArrowRight, FiChevronRight, FiMaximize, FiMinimize, FiMoon, FiPlus, FiSun, } from "react-icons/fi";
import LanguagesModal from './LanguagesModal';
import NotificationsModal from './NotificationsModal';
import ProfileModal from './ProfileModal';
import SearchModal from './SearchModal';
import TimesheetsModal from './TimesheetsModal';
import HeaderDropDownModal from './HeaderDropDownModal';
import MegaMenu from './megaManu/MegaMenu';
import { NavigationContext } from '../../../contentApi/navigationProvider';


const Header = () => {
    const { navigationOpen, setNavigationOpen } = useContext(NavigationContext)
    const [openMegaMenu, setOpenMegaMenu] = useState(false)
    const [navigationExpend, setNavigationExpend] = useState(false)
    const miniButtonRef = useRef(null);
    const expendButtonRef = useRef(null);


    useEffect(() => {
        if (openMegaMenu) {
            document.documentElement.classList.add("nxl-lavel-mega-menu-open")
        }
        else {
            document.documentElement.classList.remove("nxl-lavel-mega-menu-open")
        }
    }, [openMegaMenu])

    const handleThemeMode = (type) => {
        if (type === "dark") {
            document.documentElement.classList.add("app-skin-dark")
            localStorage.setItem("skinTheme", "dark");
        }
        else {
            document.documentElement.classList.remove("app-skin-dark")
            localStorage.setItem("skinTheme", "light");
        }
    }

    useEffect(() => {
        const handleResize = () => {
            const newWindowWidth = window.innerWidth;
            if (newWindowWidth <= 1024) {
                document.documentElement.classList.remove('minimenu');
                document.querySelector('.navigation-down-1600').style.display = 'none';
            }
            else if (newWindowWidth >= 1025 && newWindowWidth <= 1400) {
                document.documentElement.classList.add('minimenu');
                document.querySelector('.navigation-up-1600').style.display = 'none';
                document.querySelector('.navigation-down-1600').style.display = 'block';
            }
            else {
                document.documentElement.classList.remove('minimenu');
                document.querySelector('.navigation-up-1600').style.display = 'block';
                document.querySelector('.navigation-down-1600').style.display = 'none';
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        const savedSkinTheme = localStorage.getItem("skinTheme");
        handleThemeMode(savedSkinTheme)

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNavigationExpendUp = (e, pram) => {
        e.preventDefault()
        if (pram === "show") {
            setNavigationExpend(true);
            document.documentElement.classList.add('minimenu')
        }
        else {
            setNavigationExpend(false);
            document.documentElement.classList.remove('minimenu')
        }
    }

    const handleNavigationExpendDown = (e, pram) => {
        e.preventDefault()
        if (pram === "show") {
            setNavigationExpend(true);
            document.documentElement.classList.remove('minimenu')
        }
        else {
            setNavigationExpend(false);
            document.documentElement.classList.add('minimenu')
        }
    }

    const fullScreenMaximize = () => {
        const elem = document.documentElement;

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }

        document.documentElement.classList.add("fsh-infullscreen")
        document.querySelector("body").classList.add("full-screen-helper")

    };
    const fullScreenMinimize = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { 
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        document.documentElement.classList.remove("fsh-infullscreen")
        document.querySelector("body").classList.remove("full-screen-helper")
    }

    return (
     <header className="nxl-header" style={{
  position: 'fixed',
  top: 0,
  left:  0,
  right:0,
  zIndex: 1050,
  background: 'linear-gradient(90deg,rgb(166, 218, 201) 0 0%,rgb(29, 127, 152) 100%)',
  color: '#fff',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
//      border: 0,
   boxShadow: 'none', // 🛠️ Remove box-shadow if it's causing a line
    borderBottom: 'none'
  
}}>

            <div className="header-wrapper "style={{ margin: 0, padding: 0 }}   >

                {/* <!--! [Start] Header Left !--> */}
                <div className="header-left d-flex align-items-center gap-4">
                    {/* <!--! [Start] nxl-head-mobile-toggler !--> */}
                    <a href="#" className="nxl-head-mobile-toggler" onClick={(e) => {e.preventDefault(), setNavigationOpen(true)}} id="mobile-collapse">
                        <div className={`hamburger hamburger--arrowturn ${navigationOpen ? "is-active" : ""}`}>
                            <div className="hamburger-box">
                                <div className="hamburger-inner"></div>
                            </div>
                        </div>
                    </a>

                    <div className="nxl-navigation-toggle navigation-up-1600">
                        <a href="#" onClick={(e) => handleNavigationExpendUp(e, "show")} id="menu-mini-button" ref={miniButtonRef} style={{ display: navigationExpend ? "none" : "block" }}>
                            <FiAlignLeft size={24} />
                        </a>
                        <a href="#" onClick={(e) => handleNavigationExpendUp(e, "hide")} id="menu-expend-button" ref={expendButtonRef} style={{ display: navigationExpend ? "block" : "none" }}>
                            <FiArrowRight size={24} />
                        </a>
                    </div>
                    <div className="nxl-navigation-toggle navigation-down-1600">
                        <a href="#" onClick={(e) => handleNavigationExpendDown(e, "hide")} id="menu-mini-button" ref={miniButtonRef} style={{ display: navigationExpend ? "block" : "none" }}>
                            <FiAlignLeft size={24} />
                        </a>
                        <a href="#" onClick={(e) => handleNavigationExpendDown(e, "show")} id="menu-expend-button" ref={expendButtonRef} style={{ display: navigationExpend ? "none" : "block" }}>
                            <FiArrowRight size={24} />
                        </a>
                    </div>
                    {/* <!--! [End] nxl-navigation-toggle !-->
                    <!--! [Start] nxl-lavel-mega-menu-toggle !--> */}
                    <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                        <a href="#" onClick={(e) => {e.preventDefault(), setOpenMegaMenu(true)}} id="nxl-lavel-mega-menu-open">
                            <FiAlignLeft size={24} />
                        </a>
                    </div>
                    {/* <!--! [End] nxl-lavel-mega-menu-toggle !-->
                    <!--! [Start] nxl-lavel-mega-menu !--> */}
                    <div className="nxl-drp-link nxl-lavel-mega-menu">
                        <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                            <a href="#" onClick={(e) => {e.preventDefault(), setOpenMegaMenu(false)}} id="nxl-lavel-mega-menu-hide">
                                <i className="me-2"><FiArrowLeft /></i>
                                <span>Back</span>
                            </a>
                        </div>
                        {/* <!--! [Start] nxl-lavel-mega-menu-wrapper !--> */}
                        <div className="nxl-lavel-mega-menu-wrapper d-flex gap-3">
                            <HeaderDropDownModal />
                            <MegaMenu />
                        </div>
                    </div>
                </div>
                {/* <!--! [End] Header Left !-->
                <!--! [Start] Header Right !--> */}
                <div className="header-right ms-auto">
                    <div className="d-flex align-items-center">
                        <SearchModal />
                        <LanguagesModal />
                        {/* <div className="nxl-h-item d-none d-sm-flex" >
                            <div className="full-screen-switcher">
                                <span className="nxl-head-link me-0">
                                    <FiMaximize size={20} className="maximize" onClick={fullScreenMaximize} />
                                    <FiMinimize size={20} className="minimize" onClick={fullScreenMinimize} />
                                </span>
                            </div>
                        </div> */}
                        <div className="nxl-h-item dark-light-theme">
                            <div className="nxl-head-link me-0 dark-button" onClick={() => handleThemeMode("dark")}>
                                <FiMoon size={20} />
                            </div>
                            <div className="nxl-head-link me-0 light-button" onClick={() => handleThemeMode("light")} style={{ display: "none" }}>
                                <FiSun size={20} />
                            </div>
                        </div>
                        <TimesheetsModal />
                        <NotificationsModal />
                        <ProfileModal />
                    </div>
                </div>
                {/* <!--! [End] Header Right !--> */}
            </div>
        </header>
    )
}

export default Header

// import React, { useContext, useEffect, useRef, useState } from 'react';
// import {
//   FiAlignLeft, FiArrowLeft, FiArrowRight, FiMoon, FiSun
// } from "react-icons/fi";
// import LanguagesModal from './LanguagesModal';
// import NotificationsModal from './NotificationsModal';
// import ProfileModal from './ProfileModal';
// import SearchModal from './SearchModal';
// import TimesheetsModal from './TimesheetsModal';
// import HeaderDropDownModal from './HeaderDropDownModal';
// import MegaMenu from './megaManu/MegaMenu';
// import { NavigationContext } from '../../../contentApi/navigationProvider';

// const Header = () => {
//   const { navigationOpen, setNavigationOpen } = useContext(NavigationContext);
//   const [openMegaMenu, setOpenMegaMenu] = useState(false);
//   const [navigationExpend, setNavigationExpend] = useState(false);
//   const miniButtonRef = useRef(null);
//   const expendButtonRef = useRef(null);

//   useEffect(() => {
//     if (openMegaMenu) {
//       document.documentElement.classList.add("nxl-lavel-mega-menu-open");
//     } else {
//       document.documentElement.classList.remove("nxl-lavel-mega-menu-open");
//     }
//   }, [openMegaMenu]);

//   const handleThemeMode = (type) => {
//     if (type === "dark") {
//       document.documentElement.classList.add("app-skin-dark");
//       localStorage.setItem("skinTheme", "dark");
//     } else {
//       document.documentElement.classList.remove("app-skin-dark");
//       localStorage.setItem("skinTheme", "light");
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       const newWindowWidth = window.innerWidth;
//       if (newWindowWidth <= 1024) {
//         document.documentElement.classList.remove('minimenu');
//         document.querySelector('.navigation-down-1600').style.display = 'none';
//       } else if (newWindowWidth >= 1025 && newWindowWidth <= 1400) {
//         document.documentElement.classList.add('minimenu');
//         document.querySelector('.navigation-up-1600').style.display = 'none';
//         document.querySelector('.navigation-down-1600').style.display = 'block';
//       } else {
//         document.documentElement.classList.remove('minimenu');
//         document.querySelector('.navigation-up-1600').style.display = 'block';
//         document.querySelector('.navigation-down-1600').style.display = 'none';
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     const savedSkinTheme = localStorage.getItem("skinTheme");
//     handleThemeMode(savedSkinTheme);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const handleNavigationExpendUp = (e, pram) => {
//     e.preventDefault();
//     if (pram === "show") {
//       setNavigationExpend(true);
//       document.documentElement.classList.add('minimenu');
//     } else {
//       setNavigationExpend(false);
//       document.documentElement.classList.remove('minimenu');
//     }
//   };

//   const handleNavigationExpendDown = (e, pram) => {
//     e.preventDefault();
//     if (pram === "show") {
//       setNavigationExpend(true);
//       document.documentElement.classList.remove('minimenu');
//     } else {
//       setNavigationExpend(false);
//       document.documentElement.classList.add('minimenu');
//     }
//   };

//   return (
//     <header
//       className="nxl-header"
//    style={{
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   zIndex: 1050,
//   background: 'linear-gradient(90deg,rgb(236, 240, 240) 0%,rgb(226, 232, 231) 100%)',
//   color: '#fff',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
// }}
//     >
//       <div className="header-wrapper d-flex justify-content-between align-items-center px-3 py-2">

//         {/* Header Left */}
//         <div className="header-left d-flex align-items-center gap-4">
//           <a href="#" className="nxl-head-mobile-toggler" onClick={(e) => { e.preventDefault(); setNavigationOpen(true); }} id="mobile-collapse">
//             <div className={`hamburger hamburger--arrowturn ${navigationOpen ? "is-active" : ""}`}>
//               <div className="hamburger-box">
//                 <div className="hamburger-inner"></div>
//               </div>
//             </div>
//           </a>

//           <div className="nxl-navigation-toggle navigation-up-1600">
//             <a href="#" onClick={(e) => handleNavigationExpendUp(e, "show")} id="menu-mini-button" ref={miniButtonRef} style={{ display: navigationExpend ? "none" : "block" }}>
//               <FiAlignLeft size={24} />
//             </a>
//             <a href="#" onClick={(e) => handleNavigationExpendUp(e, "hide")} id="menu-expend-button" ref={expendButtonRef} style={{ display: navigationExpend ? "block" : "none" }}>
//               <FiArrowRight size={24} />
//             </a>
//           </div>

//           <div className="nxl-navigation-toggle navigation-down-1600">
//             <a href="#" onClick={(e) => handleNavigationExpendDown(e, "hide")} id="menu-mini-button" ref={miniButtonRef} style={{ display: navigationExpend ? "block" : "none" }}>
//               <FiAlignLeft size={24} />
//             </a>
//             <a href="#" onClick={(e) => handleNavigationExpendDown(e, "show")} id="menu-expend-button" ref={expendButtonRef} style={{ display: navigationExpend ? "none" : "block" }}>
//               <FiArrowRight size={24} />
//             </a>
//           </div>

//           <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
//             <a href="#" onClick={(e) => { e.preventDefault(); setOpenMegaMenu(true); }} id="nxl-lavel-mega-menu-open">
//               <FiAlignLeft size={24} />
//             </a>
//           </div>

//           <div className="nxl-drp-link nxl-lavel-mega-menu">
//             <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
//               <a href="#" onClick={(e) => { e.preventDefault(); setOpenMegaMenu(false); }} id="nxl-lavel-mega-menu-hide">
//                 <i className="me-2"><FiArrowLeft /></i>
//                 <span>Back</span>
//               </a>
//             </div>
//             <div className="nxl-lavel-mega-menu-wrapper d-flex gap-3">
//               <HeaderDropDownModal />
//               <MegaMenu />
//             </div>
//           </div>
//         </div>

//         {/* Header Right */}
//         <div className="header-right d-flex align-items-center ms-auto">
//           <SearchModal />
//           <LanguagesModal />
//           <div className="nxl-h-item dark-light-theme">
//             <div className="nxl-head-link me-0 dark-button" onClick={() => handleThemeMode("dark")}>
//               <FiMoon size={20} />
//             </div>
//             <div className="nxl-head-link me-0 light-button" onClick={() => handleThemeMode("light")} style={{ display: "none" }}>
//               <FiSun size={20} />
//             </div>
//           </div>
//           <TimesheetsModal />
//           <NotificationsModal />
//           <ProfileModal />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
