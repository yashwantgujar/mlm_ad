// export  API_BASE_URL =  "http://3.82.103.193:8000/api/admin";
  export const API_BASE_URL = "http://localhost:9000/api/admin";
//  const export  API_BASE_URL =  "https://d277w8h3-8001.inc1.devtunnels.ms/api/admin";
export const API_BASE_URL_DEALER = "http://localhost:9000/api/dealer";
export const API_BASE_URL_DEALER_SUBDEALER ="http://localhost:9000/api/subdealer";
export const API_BASE_URL_DEALER_User = "http://localhost:9000/api/user";

export const API_ENDPOINTS = {
  ENQUIRY: `https://localhost:8000/api/website-registration`,

// admin routes

     ADMIN_ADD_PRODUCT : `${API_BASE_URL}/add-product`,
     ADMIN_GET_PRODUCT : `${API_BASE_URL}/all-products`,
 ADMIN_GET_PRODUCT_BY_ID : (id) => `${API_BASE_URL}/product/${id}`,
 ADMIN_EDIT_PRODUCT_BY_ID : (id) => `${API_BASE_URL}/edit-product/${id}`,
ADMIN_DELETE_PRODUCT : (id) => `${API_BASE_URL}/delete-product/${id}`,

 ADMIN_ADD_DEALER : `${API_BASE_URL}/add-dealer`,
 ADMIN_GET_DEALER : `${API_BASE_URL}/get-all-dealer`,
 ADMIN_ADD_SUBDEALER : `${API_BASE_URL}/add-sub-dealer`,
 ADMIN_GET_SUBDEALER : `${API_BASE_URL}/all-sub-dealers`,

 ADMIN_GET_DEALER_SUBDEALER : `${API_BASE_URL_DEALER_SUBDEALER}/get-all-dealer`,

 LOGIN : `${API_BASE_URL}/login`,

 //dealer routes


  LOGINDealer : `${API_BASE_URL_DEALER}/logindealer`,
 DEALER_GET_PRODUCT : `${API_BASE_URL_DEALER}/owned-bikes`,
 DEALER_GET_ALL_PRODUCTS : `${API_BASE_URL_DEALER}/bikes`,
 DEALER_GET_ALL_USER : `${API_BASE_URL_DEALER}/get-all-dealer`,

 DEALER_EDIT_PRODUCT_BY_ID : (id) => `${API_BASE_URL_DEALER}/edit-product/${id}`,
 DealerFetchProductById : (id) => `${API_BASE_URL_DEALER}/dealer/${id}`,
 DealerFetchUsers : `${API_BASE_URL_DEALER}/get-all-dealer`,

 DEALER_CLUB_INCENTIVE : `${API_BASE_URL_DEALER}/club-incentives`,
 DEALER_GET_OWN_incentives : () => `${API_BASE_URL_DEALER}/incentives`,

 DEALER_GET_OWN_PROFILE : `https://localhost:8000/api/dealer/profile`,

//  AddUsersByDealer : `${API_BASE_URL_DEALER}/add-dealer`,
 AddDealerSubDealerByDealer  : `${API_BASE_URL_DEALER}/add-dealer`,
 ADD_Incentives_Dealer :`${API_BASE_URL_DEALER}/incentives/:id`,

//Sub Dealer routes

  LOGINSUBDealer : `${API_BASE_URL_DEALER_SUBDEALER}/loginsubLogin`,

 SUBDEALER_GET_PRODUCT : `${API_BASE_URL_DEALER_SUBDEALER}/owned-bikes`,
 SUBDEALER_GET_ALL_PRODUCTS : `${API_BASE_URL_DEALER_SUBDEALER}/bikes`,

 SubDealerFetchProductById : (id) =>
  `${API_BASE_URL_DEALER_SUBDEALER}/subdealer/${id}`,



 SUBDEALER_GET_OWN_incentives : () => `${API_BASE_URL_DEALER_SUBDEALER}/incentives`,
 SUBDEALER_CLUB_INCENTIVE : `${API_BASE_URL_DEALER_SUBDEALER}/club-incentives`,

 ADD_DEALER_BY_SUBDEALER :  `${API_BASE_URL_DEALER_SUBDEALER}/add-dealer`,
 SUBDEALER_GET_DEALER : `${API_BASE_URL_DEALER_SUBDEALER}/get-all-dealer`,



 //user routes

  LOGINUser : `${API_BASE_URL_DEALER_User}/loginuser`,
 ADD_USER_BY_USER : `${API_BASE_URL_DEALER_User}/add-dealer`,

 ADMIN_GET_DEALER_USER : `${API_BASE_URL_DEALER_User}/get-all-dealer`,

 USER_GET_ALL_PRODUCTS : `${API_BASE_URL_DEALER_User}/bikes`,
  USER_GET_PRODUCT : `${API_BASE_URL_DEALER_User}/owned-bikes`,
// const GET_PRODUCT_BY_USER = `${API_BASE_URL_DEALER_User}/get-product-by-user`;









































































//   ADD_USER_BY_USER:`${API_BASE_URL_DEALER_User}/add-dealer`,
//   ADMIN_GET_DEALER_USER:`${API_BASE_URL_DEALER_User}/get-all-dealer`,

//   ADD_Incentives_Dealer: `${API_BASE_URL_DEALER}/incentives/:id`,

//   // GET_PRODUCT_BY_USER :`${API_BASE_URL_DEALER_User}/get-product-by-user`,


//   // ADMIN API'S
//    ADMIN_ADD_PRODUCT: `${API_BASE_URL}/add-product`,
//   LOGINUser: `${API_BASE_URL_DEALER_User}/loginuser`,
//     ADMIN_ADD_PRODUCT: `${API_BASE_URL}/add-product`,
//  ADMIN_ADD_PRODUCT: `${API_BASE_URL}/add-product`,
//   ADMIN_GET_PRODUCT: `${API_BASE_URL}/all-products`,
//   ADMIN_GET_PRODUCT_BY_ID: (id) => `${API_BASE_URL}/product/${id}`,
//   ADD_DEALER_BY_SUBDEALER:`${API_BASE_URL_DEALER_SUBDEALER}/add-dealer`,

//   //DEALER API'S
//   DEALER_GET_PRODUCT: `${API_BASE_URL_DEALER}/owned-bikes`,
//   SUBDEALER_GET_PRODUCT: `${API_BASE_URL_DEALER_SUBDEALER}/owned-bikes`,
//   // USER_GET_PRODUCT: `${API_BASE_URL_DEALER_User}/bikes`,
//   DealerFetchProductById: (id) => `${API_BASE_URL_DEALER}/dealer/${id}`,
//      LOGINDealer: `${API_BASE_URL_DEALER}/logindealer`,
//   AddDealerSubDealer: `${API_BASE_URL_DEALER}/add-dealer`,
//   DealerFetchUsers: `${API_BASE_URL_DEALER}/get-all-dealer`,
//   DEALER_GET_OWN_PROFILE: `https://localhost:8000/api/dealer/profile`,


//   SUBDEALER_GET_OWN_incentives: () => `${API_BASE_URL_DEALER_SUBDEALER}/incentives`,

//   // //incentives
//   DEALER_GET_OWN_incentives: () => `${API_BASE_URL_DEALER}/incentives`,



//   ADMIN_GET_PRODUCT_BY_ID: (id) => `${API_BASE_URL}/product/${id}`,
//   ADMIN_EDIT_PRODUCT_BY_ID: (id) => `${API_BASE_URL}/edit-product/${id}`,
//   LOGIN: `${API_BASE_URL}/login`,
//   ADMIN_DELETE_PRODUCT: (id) => `${API_BASE_URL}/delete-product/${id}`,

//   // ADMIN_DELETE: (productId) => `${API_BASE_URL}/products/${productId}`,

  
//   //dealer edit and delete products
//     DEALER_EDIT_PRODUCT_BY_ID: (id) => `${API_BASE_URL_DEALER}/edit-product/${id}`,

//     //dealer club incentives
   
//     DEALER_CLUB_INCENTIVE: `${API_BASE_URL_DEALER}/club-incentives`,
//      SUBDEALER_CLUB_INCENTIVE: `${API_BASE_URL_DEALER_SUBDEALER}/club-incentives`,

//      DEALER_GET_OWN_incentives:() => `${API_BASE_URL_DEALER}/incentives`,
//      SUBDEALER_GET_OWN_incentives: `${API_BASE_URL_DEALER_SUBDEALER}/incentives`,


//      SUBDEALER_GET_OWN_incentives: () => `${API_BASE_URL_DEALER_SUBDEALER}/incentives`,


//   SubDealerFetchProductById: (id) =>
//     `${API_BASE_URL_DEALER_SUBDEALER}/subdealer/${id}`,

//   ADMIN_ADD_DEALER: `${API_BASE_URL}/add-dealer`,
//   ADMIN_GET_DEALER: `${API_BASE_URL}/get-all-dealer`,
//   // ADMIN_GET_DEALER: `${API_BASE_URL}/all-dealers`,
//   // ADMIN_DELETE_DEALER: `${API_BASE_URL}/dealers/${Id}`,

//   // SUBDEALER_LOGIN:`${API_BASE_URL}/get-all-dealer`,
//   ADMIN_GET_DEALER_SUBDEALER: `${API_BASE_URL_DEALER_SUBDEALER}/get-all-dealer`,


//   DEALER_GET_ALL_USER: `${API_BASE_URL_DEALER}/get-all-dealer`,


//   DEALER_GET_ALL_PRODUCTS: `${API_BASE_URL_DEALER}/bikes`,
//   SUBDEALER_GET_ALL_PRODUCTS:`${API_BASE_URL_DEALER_SUBDEALER}/bikes`,
//     USER_GET_ALL_PRODUCTS:`${API_BASE_URL_DEALER_User}/bikes`,
//   SUBDEALER_GET_PRODUCT: `${API_BASE_URL_DEALER_SUBDEALER}/owned-bikes`,

//   ADMIN_ADD_SUBDEALER: `${API_BASE_URL}/add-sub-dealer`,
//   ADMIN_GET_SUBDEALER: `${API_BASE_URL}/all-sub-dealers`,

//   // GET_COMMISSION_DEALER_SUBDEALER: (id) => `${API_BASE_URL}/incentives/${id}`,

//   LOGINSUBDealer: `${API_BASE_URL_DEALER_SUBDEALER}/loginsubLogin`,
//   SUBDEALER_GET_DEALER: `${API_BASE_URL_DEALER_SUBDEALER}/get-all-dealer`,

  // UPDATE: `${API_BASE_URL}/products/${productId}`

  // REGISTER: `${API_BASE_URL}/register`,
  // LOGIN: `${API_BASE_URL}/login`,
  // GENERATE_ZIPS: `${API_BASE_URL}/genrate-files`,

  // GET_ALL_ZIPS: `${API_BASE_URL}/get-all-zips`,
  // DOWNLOAD_BYID_ZIPS: (zipID) => `${API_BASE_URL}/downloadZip/${zipID}`,
  // DELETE_ZIPS: (zipID) => `${API_BASE_URL}/delete-zip/${zipID}`,

  // ADD_USER: `${API_BASE_URL}/add-user`,
  // GET_ALL_USERS: `${API_BASE_URL}/getall-user`,
  // DELETE_USER: (id) => `${API_BASE_URL}/delete-user/${id}`,
  // GETBYID_USER: (id) => `${API_BASE_URL}/getbyid-user/${id}`,
  // UPDATEBYID_USER: (id) => `${API_BASE_URL}/update-user/${id}`,
  // IMPORT_USER: `${API_BASE_URL}/import`,
  // EXPORT_USER: `${API_BASE_URL}/export`,

  // ASSINGED_TASK_USER: `${API_BASE_URL}/assign-task`,

  // DELETE_ASSIGN_TASK: (id) => `${API_BASE_URL}/delete-assign-task/${id}`,
  // GETBYID_ASSIGN_TASK: (id) => `${API_BASE_URL}/getbyid-assign-task/${id}`,
  // UPDATEBYID_ASSIGN_TASK: (id) => `${API_BASE_URL}/update-assign-task/${id}`,

  // GET_BY_USERID_TASK: (userId) => `${API_BASE_URL}/getbyid-task/${userId}`,
  // DELETE_USERID_TASK: (id) => `${API_BASE_URL}/deleteuserstask/${id}`,

  // //update Task
  // UPDATE_BY_TASK: (id) => `${API_BASE_URL}/update-task/${id}`,

  // GET_ALL_DATA: `${API_BASE_URL}/getall-data`,

  // GET_BY_USERID_DATA: (userId) => `${API_BASE_URL}/getbyid-data/${userId}`,
  // DELETE_USERID_TDATA: (id) => `${API_BASE_URL}/delete-data/${id}`,

  // //update Task
  // UPDATE_BY_DATA: (id) => `${API_BASE_URL}/update-data/${id}`,

  // GET_ALL_TIMESLOTS: `${API_BASE_URL}/getall-timeslots`,
  // GET_ALL_LOCATIONS: `${API_BASE_URL}/getall-location`,
  // CREATE_LOCATION: `${API_BASE_URL}/add-location`,
  // UPDATE_LOCATION: `${API_BASE_URL}/update-location`,
  // DELETE_LOCATION: `${API_BASE_URL}/delete-location`,

  // // sub admin..
  // ADD_SUBADMIN: `${API_BASE_URL}/create-subadmin`,
  // GET_ALL_SUBADMINS: `${API_BASE_URL}/all-sub-admin`,
  // UPDATE_SUBADMIN: `${API_BASE_URL}/update-subadmin`,
  // DELETE_SUBADMIN: `${API_BASE_URL}/delete-subadmin`,

  // // slots details..
  // GET_ALL_BOOKED_SLOTS: `${API_BASE_URL}/individual-slots`
};
