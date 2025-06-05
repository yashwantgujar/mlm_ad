// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { getAllDealersSubsubdealers} from "../services/api";

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);



 
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const response = await getAllDealersSubsubdealers

        
//         // Ensure we're working with an array
//         const data = Array.isArray(response) ? response : 
//                    response?.data ? response.data : 
//                    [];
        
//         setUsers(data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setError("Failed to fetch users. Please try again.");
//         setUsers([]); // Ensure users is always an array
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) {
//     return (
//       <div className="container mt-5 text-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5 mb-5">
//       <h2 className="mb-4">All Users</h2>
      
//       {users.length === 0 ? (
//         <div className="alert alert-info">No users found.</div>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered table-striped table-hover">
//             <thead className="table-dark">
//               <tr>
//                 <th>#</th>
//                 <th>Role</th>
//                 <th>Full Name</th>
//                 <th>Email</th>
//                 <th>Referral 1</th>
//                 <th>Referral 2</th>
//                 <th>City</th>
//                 <th>State</th>
//                 <th>EV Bikes</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, idx) => (
//                 <tr key={user._id || idx}>
//                   <td>{idx + 1}</td>
//                   <td className="text-capitalize">{user.role || "-"}</td>
//                   <td>{user.name || "-"}</td>
//                   <td>{user.email || "-"}</td>
//                   <td>{user.referral1 || "-"}</td>
//                   <td>{user.referral2 || "-"}</td>
//                   <td>{user.city || "-"}</td>
//                   <td>{user.state || "-"}</td>
//                   <td>
//                     {Array.isArray(user.evBikes) 
//                       ? user.evBikes.join(", ") 
//                       : "-"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserList;

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getAllDealersUser } from "../services/api";


const DealerSubdealerListByUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllDealersUser();
        
        const data = res?.users || [];
      


        
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setRoleFilter(value);

    if (value === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) => user.role?.toLowerCase() === value.toLowerCase()
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
        {/* Go Back Button */}
      <div className="text-center mt-4">
        <button onClick={() => navigate(-1)} className="btn btn-outline-primary px-4 py-2 mb-4">
          ⬅️Back
        </button>
      </div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          User Data
        </Typography>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="role-filter-label">Filter by Role</InputLabel>
          <Select
            labelId="role-filter-label"
            id="role-filter"
            value={roleFilter}
            label="Filter by Role"
            onChange={handleRoleChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Dealer">Dealer</MenuItem>
            <MenuItem value="SubDealer">Sub Dealer</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
               <TableCell><strong>S.No</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              {/* <TableCell><strong>Referral 1</strong></TableCell>
              <TableCell><strong>Referral 2</strong></TableCell> */}
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers?.length > 0 ? (
              [...filteredUsers].reverse().map((user, index) => (
                <TableRow key={index}>
                 <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name || "-"}</TableCell>
                  <TableCell>{user.role || "-"}</TableCell>
                  <TableCell>{user.email || "-"}</TableCell>
                  <TableCell>{user.address || "-"}</TableCell>

                  {/* <TableCell>
                    {user.referral1Details
                      ? `${user.referral1Details.name || "-"} (${user.referral1Details.referralCode || "-"})`
                      : "-"}
                  </TableCell> */}

                  {/* <TableCell>
                    {user.referral2Details
                      ? `${user.referral2Details.name || "-"} (${user.referral2Details.referralCode || "-"})`
                      : "-"}
                  </TableCell> */}

                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate("/all-dealer-informationByUserView", {
                          state: { user },
                        })
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DealerSubdealerListByUser;
