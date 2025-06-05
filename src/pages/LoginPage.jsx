  // import { useState } from "react";
  // import { useNavigate } from "react-router-dom";
  // import { loginUser } from "../services/api";

  // export default function Login() {
  //   const navigate = useNavigate();

  //   const [formData, setFormData] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   const [error, setError] = useState("");
  //   const [success, setSuccess] = useState("");

  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setError("");
  //     setSuccess("");

  //     try {
  //       const response = await loginUser(formData);
  //       localStorage.setItem("admin",response.data.admin.role)

  //       const responseData = await loginDealer(formData);
  //       localStorage.setItem("dealer",responseData.data.admin.role)

    
        
  //       if (response.status === 200) {
  //         setSuccess("Login successful!");
  //         localStorage.setItem("token", response.data.token); // Save token in localStorage
  //         navigate("/home"); // Navigate to dashboard or home
  //       }
  //     } catch (err) {
  //       setError(err.response?.data?.message || "Login failed.");
  //     }
  //   };

  //   return (
  //     <div className="container mt-5">
  //       <h2 className="text-center mb-4">Login</h2>

  //       {error && <div className="alert alert-danger">{error}</div>}
  //       {success && <div className="alert alert-success">{success}</div>}

  //       <form onSubmit={handleSubmit}>
  //         <div className="mb-3">
  //           <label className="form-label">Email</label>
  //           <input
  //             type="email"
  //             className="form-control"
  //             name="email"
  //             value={formData.email}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>

  //         <div className="mb-3">
  //           <label className="form-label">Password</label>
  //           <input
  //             type="password"
  //             className="form-control"
  //             name="password"
  //             value={formData.password}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>

  //         <div className="text-center">
  //           <button type="submit" className="btn btn-primary mt-3">
  //             Login
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // }




//  import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   loginUser,
//   loginDealer,
//   loginSubDealer,
//   loginByUser,
// } from "../services/api";

// export default function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [role, setRole] = useState("admin");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) setIsLoggedIn(true);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       let response;

//       if (role === "admin") {
//         response = await loginUser(formData);
//       } else if (role === "dealer") {
//         response = await loginDealer(formData);
//         localStorage.setItem("evBikes", JSON.stringify(response.data.dealer.evBikes));
//       } else if (role === "subdealer") {
//         response = await loginSubDealer(formData);
//       } else if (role === "user") {
//         response = await loginByUser(formData);
//       }

//       // Get user info based on role
//       const user =
//         role === "admin"
//           ? response.data.admin
//           : role === "dealer"
//           ? response.data.dealer
//           : role === "subdealer"
//           ? response.data.subdealer
//           : response.data.user;

//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("email", formData.email);

//       localStorage.setItem("id", user.id);

//       setSuccess("Login successful!");
//       setIsLoggedIn(true);
//       navigate("/home");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   return (
//     <div className="container">
//       {/* <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Login</h2>
//         {isLoggedIn && (
//           <button className="btn btn-danger" onClick={handleLogout}>
//             Logout
//           </button>
//         )}
//       </div> */}

//       {error && <div className="alert alert-danger">{error}</div>}
//       {success && <div className="alert alert-success">{success}</div>}

//       {!isLoggedIn && (
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Login As</label>
//             <select
//               className="form-control"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               required
//             >
//               <option value="admin">Admin</option>
//               <option value="dealer">Dealer</option>
//               <option value="subdealer">Sub Dealer</option>
//               <option value="user">User</option>
//             </select>
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="text-center">
//             <button type="submit" className="btn btn-primary mt-3">
//               Login
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  loginDealer,
  loginSubDealer,
  loginByUser,
} from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      let response;

      if (role === "admin") response = await loginUser(formData);
      else if (role === "dealer") {
        response = await loginDealer(formData);
        localStorage.setItem("evBikes", JSON.stringify(response.data.dealer.evBikes));
      } else if (role === "subdealer") response = await loginSubDealer(formData);
      else if (role === "user") response = await loginByUser(formData);

      const user =
        role === "admin" ? response.data.admin :
        role === "dealer" ? response.data.dealer :
        role === "subdealer" ? response.data.subdealer :
        response.data.user;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("id", user.id);

      setSuccess("Login successful!");
      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f4ff"  }}
    
    >
      <div className="card shadow p-4 rounded-4" style={{ width: "100%", maxWidth: "550px" }}>
        <h4 className="text-center text-primary mb-4 fw-bold">Login </h4>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}
{/* 
        {!isLoggedIn && ( */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Login As</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="admin">Admin</option>
                <option value="dealer">Dealer</option>
                <option value="subdealer">Sub Dealer</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="d-grid">
              <button
  type="submit"
  className="btn fw-bold px-4 py-2"
  style={{
    backgroundColor: "#29e3a2",
    borderColor: "#0d6efd",
    borderRadius: "8px",
    color: "#fff",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#29e3a2"; 
    e.target.style.borderColor = "#0047ab";
    e.target.style.transform = "scale(1.03)"; 
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "#0d6efd"; 
    e.target.style.borderColor = "#0d6efd";
    e.target.style.transform = "scale(1)";
  }}
>
  Login
</button>

            </div>
          </form>
        {/* )} */}
{/* 
        {isLoggedIn && (
          <div className="text-center p-4 bg-light rounded-4 shadow-sm mt-4">
  <p className="text-success fs-5 fw-semibold mb-3">
    You’re already logged in.
  </p>
 
</div>

        )} */}
      </div>
    </div>
  );
}
