import axios from "axios";
import {
  API_ENDPOINTS,
  API_BASE_URL,
  API_BASE_URL_DEALER,
  API_BASE_URL_DEALER_SUBDEALER,
} from "../API/authApi";
import axiosInstance from "../../interceptor";

const token = localStorage.getItem("token");
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.REGISTER, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error in registerUser function:", error);
    throw error;
  }
};

const enquiryToken = localStorage.getItem("enquiry");

export const submitEnquiry = async (enquiryData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.ENQUIRY, enquiryData, {
      headers: {
        "Content-Type": "application/json",
        enquiry: enquiryToken, // custom header: 'enquiry'
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in submitEnquiry function:", error);
    throw error;
  }
};

export const addProduct = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_ENDPOINTS.ADMIN_ADD_PRODUCT,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error.response?.data || { message: "Failed to add product" };
  }
};

export const getProducByDealer = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.DealerFetchProductById(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error getting product with ID ${id}:`, error);
    throw error;
  }
};

export const getProductByuser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.GET_PRODUCT_BY_USER(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error getting product with ID ${id}:`, error);
    throw error;
  }
};

export const getProducBySubDealer = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      API_ENDPOINTS.SubDealerFetchProductById(id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error getting product with ID ${id}:`, error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.ADMIN_GET_PRODUCT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response || [];
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

// export const dealerGetAllProducts = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.get(API_ENDPOINTS.DEALER_GET_PRODUCT, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response || [];
//   } catch (error) {
//     console.error("Error getting products:", error);
//     throw error;
//   }
// };

export const getAllProductsByDealer = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.DealerFetchProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      API_ENDPOINTS.ADMIN_GET_PRODUCT_BY_ID(id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error getting product with ID ${id}:`, error);
    throw error;
  }
};

export const editProductById = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      API_ENDPOINTS.ADMIN_EDIT_PRODUCT_BY_ID(id),
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error editing product with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

export const DealereditProductById = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      API_ENDPOINTS.DEALER_EDIT_PRODUCT_BY_ID(id),
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error editing product with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      API_ENDPOINTS.ADMIN_DELETE_PRODUCT(id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error.response?.data || { message: "Failed to delete product" };
  }
};

export const addDealer = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_ENDPOINTS.ADMIN_ADD_DEALER,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding dealer:", error);
    throw error.response?.data || { message: "Failed to add dealer" };
  }
};

export const addUserDealer= async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_ENDPOINTS.AddUsersByDealer,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding dealer:", error);
    throw error.response?.data || { message: "Failed to add dealer" };
  }
};

export const addDealerSubDealerBySUBDealer = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_ENDPOINTS.ADD_DEALER_BY_SUBDEALER,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding dealer:", error);
    throw error.response?.data || { message: "Failed to add dealer" };
  }
};

export const addDealerSubDealerByUser = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_ENDPOINTS.ADD_USER_BY_USER,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding dealer:", error);
    throw error.response?.data || { message: "Failed to add dealer" };
  }
};

export const addSubDealer = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_ENDPOINTS.ADMIN_ADD_SUBDEALER,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding dealer:", error);
    throw error.response?.data || { message: "Failed to add dealer" };
  }
};

export const getAllSubDealers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.ADMIN_GET_SUBDEALER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch subdealers" };
  }
};

export const fetchProductbyuser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.API_BASE_URL_DEALER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch subdealers" };
  }
};

export const deleteSubDealers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.ADMIN_GET_SUBDEALER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch subdealers" };
  }
};

export const getAllDealers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.ADMIN_GET_DEALER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};

export const getAllSUBDealers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.SUBDEALER_GET_DEALER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};

export const getAllDealersByDealer = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.DealerFetchUsers, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};

export const getProductByDealer = async () => {
  try {
  const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.DEALER_GET_PRODUCT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};

export const getClubIncentivesbySubDealerr = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.SUBDEALER_CLUB_INCENTIVE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching club incentives:", error);
    throw error.response?.data || { message: "Failed to fetch club incentives" };
  }
};

export const profile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.DEALER_GET_OWN_PROFILE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};

export const getAllDealersSubdealers = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.ADMIN_GET_DEALER_SUBDEALER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};

export const getAllProductsDealer = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.DEALER_GET_ALL_PRODUCTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};


export const getAllProductSubDealer = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.SUBDEALER_GET_ALL_PRODUCTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};

export const getAllProductUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.USER_GET_ALL_PRODUCTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};


export const getAllUserByDealer = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.DEALER_GET_ALL_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};

// export const getAllProductsSubDealer = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.get(API_ENDPOINTS.SUBDEALER_GET_ALL_PRODUCTS, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching dealers:", error);
//     throw error.response?.data || { message: "Failed to fetch dealers" };
//   }
// };


export const getAllProductsSubDealer = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.SUBDEALER_GET_PRODUCT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};

export const getAllProductsUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.USER_GET_PRODUCT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};



export const addUserbyDealer= async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_ENDPOINTS.AddDealerSubDealerByDealer ,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding dealer:", error);
    throw error.response?.data || { message: "Failed to add dealer" };
  }
};

export const getIncentivesbySubdealer = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. User might not be authenticated.");
    throw { message: "Authentication token not found. Please login." };
  }

  try {
    const response = await axios.get(API_ENDPOINTS.SUBDEALER_GET_OWN_incentives() ,{
      headers: {
        Authorization:`Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching incentives:", error);
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw { message: "Failed to get Incentives. Please try again later." };
  }
};

export const getAllDealersUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.ADMIN_GET_DEALER_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};

export const getAllCommissionData = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      API_ENDPOINTS.ADD_Incentives_Dealer, // Handle both with and without ID
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching commission data:", error);
    throw (
      error.response?.data || { message: "Failed to fetch commission data" }
    );
  }
};

export const adminDeleteDealer = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.ADMIN_DELETE_DEALER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error.response?.data || { message: "Failed to fetch dealers" };
  }
};
// Function to update a product
export const updateProduct = async (productId, updatedData, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/products/${productId}`,
      updatedData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data; // Updated product data
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Login API function
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, loginData);
    return response;
  } catch (error) {
    console.error("Error in loginUser function:", error);
    throw error;
  }
};

export const loginDealer = async (loginData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL_DEALER}/logindealer`,
      loginData
    );
    console.log("response-------------", response);
    return response;
  } catch (error) {
    console.error("Error in loginUser function:", error);
    throw error;
  }
};

export const loginSubDealer = async (loginData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL_DEALER_SUBDEALER}/loginsubLogin`,
      loginData
    );
    console.log("response-------------", response);
    return response;
  } catch (error) {
    console.error("Error in loginUser function:", error);
    throw error;
  }
};

export const loginByUser = async (loginData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.LOGINUser, loginData);
    console.log("response-------------", response);
    return response;
  } catch (error) {
    console.error("Error in loginUser function:", error);
    throw error;
  }
};

// export const loginUser = async (userData) => {
//     try {
//         const response = await axios.post(API_ENDPOINTS.LOGIN, userData, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         return response;
//     } catch (error) {
//         console.error("Error in registerUser function:", error);
//         throw error;
//     }
// };


//dealer club incentives
export const getClubIncentivesbyDealer = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.DEALER_CLUB_INCENTIVE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching club incentives:", error);
    throw error.response?.data || { message: "Failed to fetch club incentives" };
  }
};


export const getClubIncentivesbySubDealer = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.SUBDEALER_CLUB_INCENTIVE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching club incentives:", error);
    throw error.response?.data || { message: "Failed to fetch club incentives" };
  }
};



export const getIncentives = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. User might not be authenticated.");
    throw { message: "Authentication token not found. Please login." };
  }

  try {
    const response = await axios.get(API_ENDPOINTS.DEALER_GET_OWN_incentives(id), {
      headers: {
        Authorization:`Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching incentives:", error);
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw { message: "Failed to get Incentives. Please try again later." };
  }
};



// export const getIncentivesbySUbdealer = async (id) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     console.error("No token found. User might not be authenticated.");
//     throw { message: "Authentication token not found. Please login." };
//   }

//   try {
//     const response = await axios.get(API_ENDPOINTS.SUBDEALER_GET_OWN_incentives(id), {
//       headers: {
//         Authorization:`Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching incentives:", error);
//     if (error.response && error.response.data) {
//       throw error.response.data;
//     }
//     throw { message: "Failed to get Incentives. Please try again later." };
//   }
// };



export const getIncentivesbySUbdealer = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. User might not be authenticated.");
    throw { message: "Authentication token not found. Please login." };
  }

  try {
    const response = await axios.get(API_ENDPOINTS.SUBDEALER_GET_OWN_incentives() ,{
      headers: {
        Authorization:`Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching incentives:", error);
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw { message: "Failed to get Incentives. Please try again later." };
  }
};

export const getIncentivesDealer = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(API_ENDPOINTS.DEALER_GET_OWN_incentives(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching incentives:", error);
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw { message: "Failed to get Incentives. Please try again later." };
  }
};

export const addZips = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.GENERATE_ZIPS,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in function:", error);
    throw error;
  }
};

export const getAllZips = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_ZIPS, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response?.data?.zipRecords;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { categories: [], totalPages: 1 };
  }
};
export const downloadByIdZip = async (id) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.DOWNLOAD_BYID_ZIPS(id),
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // 🔥 This ensures the response is treated as a file
      }
    );

    // Create a blob and trigger download
    const blob = new Blob([response.data], { type: "application/zip" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `patients_data_${id}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return response;
  } catch (error) {
    console.error("Error fetching zip file:", error);
    throw error;
  }
};

export const deleteZips = async (id) => {
  try {
    const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_ZIPS(id), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response?.data?.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_ENDPOINTS.ADD_USER, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in addUser function:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const getAllUsers = async (search = "", page = 1) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_USERS, {
      params: { search, page, limit: 10 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response:", response.data);

    return {
      users: response.data.users,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], totalPages: 1 };
  }
};

export const getAllUsersWithoutSearch = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_USERS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_USER(id), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const getbyidUser = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GETBYID_USER(id), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response?.data;
  } catch (error) {
    console.error("Error feching user:", error);
    throw error;
  }
};

export const updateByIDUser = async (id, userData) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.UPDATEBYID_USER(id),
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is correctly passed
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in updateByIDUser function:", error);
    throw error;
  }
};

export const importUser = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.IMPORT_USER,
      { users: data },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error importing users:", error);
    throw error;
  }
};

export const addCategory = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.ADD_CATEGORY,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in function:", error);
    throw error;
  }
};

export const getAllCategory = async (search = "", page = 1) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GETALL_CATEGORY, {
      headers: { Authorization: `Bearer ${token}` },
      params: { search, page, limit: 10 },
    });

    if (response?.data?.data) {
      return {
        categories: response?.data?.data, // Changed 'users' to 'categories'
        totalPages: response?.data.totalPages,
      };
    }
    return { categories: [], totalPages: 1 };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { categories: [], totalPages: 1 };
  }
};

export const getAllCategoryWithoutSearch = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GETALL_CATEGORY, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { categories: [], totalPages: 1 };
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.DELETE_CATEGORY(id),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const getbyidCategory = async (id) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.GETBYID_CATEGORY(id),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error feching user:", error);
    throw error;
  }
};

export const updateByIDCategory = async (userData, id) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.UPDATEBYID_CATEGORY(id),
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is correctly passed
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in updateByIDUser function:", error);
    throw error;
  }
};

export const addMeasurements = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.ADD_MESUREMENT,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in function:", error);
    throw error;
  }
};

export const getAllMeasurements = async (search = "") => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GETALL_MESUREMENT, {
      headers: { Authorization: `Bearer ${token}` },
      params: { search },
    });

    if (response?.data?.data) {
      return {
        categories: response?.data?.data,
        // totalPages: response?.data.totalPages,
      };
    }
    return { categories: [] };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { categories: [] };
  }
};

export const deleteMeasurements = async (id, deleteEntireMeasurement) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.DELETE_MESUREMENT(id),
      {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          deleteEntireMeasurement,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error deleting measurement:", error);
    throw error;
  }
};

export const deleteMeasurementsPArticular = async (id, measurementId) => {
  try {
    const response = await axios.delete(API_ENDPOINTS.DELETE_MESUREMENT(id), {
      headers: { Authorization: `Bearer ${token}` },
      data: { measurementId }, // Send measurementId as part of the request body
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting measurement:", error);
    throw error;
  }
};

export const getbyidMeasurements = async (id) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.GETBYID_MESUREMENT(id),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error feching user:", error);
    throw error;
  }
};

export const updateByIDMeasurements = async (userData, id) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.UPDATEBYID_MESUREMENT(id),
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in updateByIDUser function:", error);
    throw error;
  }
};

export const getAllOrders = async (search = "", page = 1) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GETALL_ORDERS, {
      headers: { Authorization: `Bearer ${token}` },
      params: { search, page, limit: 10 },
    });

    if (response?.data?.orders) {
      return {
        users: response.data.orders,
        totalPages: response.data.totalPages,
      };
    }
    return { users: [], totalPages: 1 };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], totalPages: 1 };
  }
};

export const updateByIDOrders = async (userData, id) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.UPDATEBYID_ORDERS(id),
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is correctly passed
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in updateByIDUser function:", error);
    throw error;
  }
};

export const getAllTaskWithoutSearch = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_TASK, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const getbyUserIdData = async (id) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.GET_BY_USERID_TASK(id),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error feching user:", error);
    throw error;
  }
};

export const updateData = async (id, userData) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.UPDATE_BY_DATA(id),
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is correctly passed
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in updateByIDUser function:", error);
    throw error;
  }
};

//ASSIGNED USER
export const assignUserTask = async (userData) => {
  try {
    // Check if token is available
    if (!token) {
      throw new Error("Token is missing. Please authenticate again.");
    }

    // Log the headers to check if token is included
    console.log("Authorization Header:", `Bearer ${token}`);

    const response = await axios.post(
      API_ENDPOINTS.ASSINGED_TASK_USER,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // token being sent here
        },
      }
    );

    return response; // Return only the data
  } catch (error) {
    console.error("Error in assignUserTask function:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const deleteAssignTask = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.DELETE_ASSIGN_TASK(id),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const getbyidAssignTask = async (id) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.GETBYID_ASSIGN_TASK(id),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error feching user:", error);
    throw error;
  }
};

export const updateByIDAssignTask = async (id, userData) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.UPDATEBYID_ASSIGN_TASK(id),
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is correctly passed
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in updateByIDUser function:", error);
    throw error;
  }
};

export const deleteUserAssignTask = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.DELETE_USERID_TASK(id),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

//data
export const getAlldata = async (search, page = 1) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_DATA, {
      params: { search, page, limit: 10 },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response?.data?.data) {
      return {
        data: response?.data?.data,
        totalPages: response?.data.totalPages,
      };
    }
    return { data: [], totalPages: 1 };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { data: [], totalPages: 1 };
  }
};

export const deleteAssignData = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.DELETE_USERID_TDATA(id),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const getbyidAssignData = async (id) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.GET_BY_USERID_DATA(id),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error feching user:", error);
    throw error;
  }
};

export const updateByIDAssignData = async (id, userData) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.UPDATE_BY_DATA(id),
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is correctly passed
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in updateByIDUser function:", error);
    throw error;
  }
};

export const getAllTimeslots = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_TIMESLOTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const addLocation = async (formData) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_LOCATION,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // add token if needed
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error adding location");
  }
};

export const getAllLocations = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_LOCATIONS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const updateLocation = async (id, updatedLocation) => {
  try {
    const response = await axiosInstance.put(
      `${API_ENDPOINTS.UPDATE_LOCATION}/${id}`,
      updatedLocation,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating location:", error);
    throw new Error("Failed to update location.");
  }
};

export const deleteLocation = async (id, token) => {
  try {
    const response = await axios.delete(
      `${API_ENDPOINTS.DELETE_LOCATION}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new sub-admin
export const addSubadmin = async (formData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.ADD_SUBADMIN, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to headers for authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Failed to add user"
    );
  }
};

export const getAllSubAdmins = async (searchTerm = "", page = 1) => {
  try {
    const response = await axios.get(API_ENDPOINTS.GET_ALL_SUBADMINS, {
      params: { searchTerm, page },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token to headers for authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response
        ? error.response.data.message
        : "Failed to fetch sub-admins"
    );
  }
};

// Delete a sub-admin
export const deleteSubAdmin = async (id) => {
  try {
    const response = await axios.delete(
      `${API_ENDPOINTS.DELETE_SUBADMIN}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response
        ? error.response.data.message
        : "Failed to delete sub-admin"
    );
  }
};

// Update a sub-admin
export const updateSubAdmin = async (id, formData) => {
  try {
    const response = await axios.put(
      `${API_ENDPOINTS.UPDATE_SUBADMIN}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response
        ? error.response.data.message
        : "Failed to update sub-admin"
    );
  }
};

//  slots distribution..
export const getAllBookedSlots = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.GET_ALL_BOOKED_SLOTS, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching booked slots:", error.message);
    throw error;
  }
};
