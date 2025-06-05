import { createBrowserRouter ,Navigate} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Register from "../pages/RegisterForm";

import RootLayout from "../layout/root";
import Home from "../pages/home";
import Analytics from "../pages/analytics";
import ReportsSales from "../pages/reports-sales";
import ReportsLeads from "../pages/reports-leads";
import ReportsProject from "../pages/reports-project";
import AppsChat from "../pages/apps-chat";
import LayoutApplications from "../layout/layoutApplications";
import AppsEmail from "../pages/apps-email";
import ReportsTimesheets from "../pages/reports-timesheets";
import LoginCover from "../pages/login-cover";
import AppsTasks from "../pages/apps-tasks";
import AppsNotes from "../pages/apps-notes";
import AppsCalender from "../pages/apps-calender";
import AppsStorage from "../pages/apps-storage";
import Proposalist from "../pages/proposal-list";
import CustomersList from "../pages/customers-list";
import ProposalView from "../pages/proposal-view";
import ProposalEdit from "../pages/proposal-edit";
import LeadsList from "../pages/leadsList";
import CustomersView from "../pages/customers-view";
import CustomersCreate from "../pages/customers-create";
import ProposalCreate from "../pages/proposal-create";
import LeadsView from "../pages/leads-view";
import LeadsCreate from "../pages/leads-create";
import PaymentList from "../pages/payment-list";
import PaymentView from "../pages/payment-view/";
import PaymentCreate from "../pages/payment-create";
import ProjectsList from "../pages/projects-list";
import ProjectsView from "../pages/projects-view";
import ProjectsCreate from "../pages/projects-create";
import SettingsGaneral from "../pages/settings-ganeral";
import LayoutSetting from "../layout/layoutSetting";
import SettingsSeo from "../pages/settings-seo";
import SettingsTags from "../pages/settings-tags";
import SettingsEmail from "../pages/settings-email";
import SettingsTasks from "../pages/settings-tasks";
import SettingsLeads from "../pages/settings-leads";
import SettingsMiscellaneous from "../pages/settings-miscellaneous";
import SettingsRecaptcha from "../pages/settings-recaptcha";
import SettingsLocalization from "../pages/settings-localization";
import SettingsCustomers from "../pages/settings-customers";
import SettingsGateways from "../pages/settings-gateways";
import SettingsFinance from "../pages/settings-finance";
import SettingsSupport from "../pages/settings-support";
import LayoutAuth from "../layout/layoutAuth";
import LoginMinimal from "../pages/login-minimal";
import LoginCreative from "../pages/login-creative";
import RegisterCover from "../pages/register-cover";
import RegisterMinimal from "../pages/register-minimal";
import RegisterCreative from "../pages/register-creative";
import ResetCover from "../pages/reset-cover";
import ResetMinimal from "../pages/reset-minimal";
import ResetCreative from "../pages/reset-creative";
import ErrorCover from "../pages/error-cover";
import ErrorCreative from "../pages/error-creative";
import ErrorMinimal from "../pages/error-minimal";
import OtpCover from "../pages/otp-cover";
import OtpMinimal from "../pages/otp-minimal";
import OtpCreative from "../pages/otp-creative";
import MaintenanceCover from "../pages/maintenance-cover";
import MaintenanceMinimal from "../pages/maintenance-minimal";
import MaintenanceCreative from "../pages/maintenance-creative";
import HelpKnowledgebase from "../pages/help-knowledgebase";
import WidgetsLists from "../pages/widgets-lists";
import WidgetsTables from "../pages/widgets-tables";
import WidgetsCharts from "../pages/widgets-charts";
import WidgetsStatistics from "../pages/widgets-statistics";
import WidgetsMiscellaneous from "../pages/widgets-miscellaneous";
import AllCampaigns from "../pages/AllCampaigns";
import AllSubAdmin from "../pages/AllSubAdmin";
import AllLocations from "../pages/AllLocations";
import UsersList from "../pages/UserList";
import AllTotalSlots from "../pages/AllTotalSlots";
import TotalAvailableSlots from "../pages/TotalAvailableSlots";
import TotalBookedSlots from "../pages/TotalBookedSlots";
import TotalPeakedSlots from "../pages/TotalPeakedSlots";
import TotalNormalSlots from "../pages/TotalNormalSlots";
import TotalBookedPeakedSlots from "../pages/TotalBookedPeakesSlots";
import TotalBookedNormalSlots from "../pages/TotalBookedNormalSlots";
import AddSubAdmin from "../pages/AddSubAdmin";
import AddLocation from "../pages/AddLocation";
import ApprovedCampaigns from "../pages/ApprovedCampaigns";
import PendingCampaigns from "../pages/PendingCampaigns";
import RejectedCampaigns from "../pages/RejectedCampaigns";
import ProductList from "../pages/ProductList/ProductList";

import AddSubDealer from "../pages/AddSubDealer";
import SubDealerList from "../pages/SubDealerList";
import Inventory from "../pages/Inventory";
import ServicingList from "../pages/ServicingList";
import IncomeList from "../pages/IncomeList";
import AddUser from "../pages/AddUser";
import AddProduct from "../pages/AddProduct";
import AddUserByUser from "../pages/AddUserByUser";
import AddDealerByUser from "../pages/AddDealerByUser";
import AddSubDealerByUser from "../pages/AddSubDealerByUser";
import AddServicing from "../pages/AddServicing";
import AddDealership from "../pages/AddDealership";
import ListDealership from "../pages/ListDealership";
import AddProductByAdmin from "../pages/AddProductByAdmin";
import AddProductListByAdmin from "../pages/AddProductListByAdmin";
import AddDealerByAdmin from "../pages/AddDealerByAdmin";
import AllDealerListByAdmin from "../pages/AllDealerListByAdmin";
import AddSubDealerByAdmin from "../pages/AddSubDealerByAdmin";
import AllSubDealerListByAdmin from "../pages/AllSubDealerListByAdmin";
import AddUserByAdmin from "../pages/AddUserByAdmin";
import UserListByAdmin from "../pages/UserListByAdmin";
import AllDealerList from "../pages/AllDealerList";
import AllSubDealerList from "../pages/AllSubDealerList";
import AllUserList from "../pages/AllUserList";
import AllClubMember from "../pages/AllClubMember";
import AllClubMemberList from "../pages/AllClubMemberList";
import PerformanceIncentiveMember from "../pages/PerformanceIncentiveMember";
import PerformanceIncentiveMemberList from "../pages/PerformanceIncentiveMemberList ";
import Enquiry from "../pages/Enquiry";
import ProductDetails from "../pages/ProductDetails";
import DealerSubdealerListByAdmin from "../pages/DealerSubdealerListByAdmin";
import GetCommission from "../pages/GetCommission";
import GetIncentives from "../pages/GetIncentives";
import DealerTableView from "../pages/DealerSubdealerListByAdminView";
import AddProductListByDealer from "../pages/AddProductListByDealer";
import AddProductByDealer from "../pages/AddProductByDealer";
import AddUserByDealer from "../pages/AddUserByDealer";
import DealerSubdealerListByDealer from "../pages/DealerSubdealerListByDealer";
import DealerSubdealerListByDealerView from "../pages/DealerSubdealerListByDealerView";

import AddProductBySubDealer from "../pages/AddProductBySubDealer";
import DealerSubdealerListBySubDealer from '../pages/DealerSubdealerListBySubDealer'
import AddUserBySubDealer from '../pages/AddUserBySubDealer'
import DealerSubdealerListBySubDealerView from '../pages/DealerSubdealerListBySubDealerView'
import AddProductListBySubDealer from "../pages/AddProductListBySubDealer";
import AddProductUser from "../pages/AddProductUser";
import AddUserSubDealerByUser from "../pages/AddUserSubDealerByUser";
import DealerSubdealerListByUser from "../pages/DealerSubdealerListByUser";
import AddProductListByUser from "../pages/AddProductListByUser";
import DealerProductDetails from "../pages/DealerProductDetails";
import ClubIncentive from "../pages/ClubIncentive";
import ClubIncentiveSubdealer from "../pages/ClubIncentiveSubdealer";
import SubdealerIncentive from "../pages/SubdealerIncentive";
import UserInformationView from "../pages/UserInformationView";
import SubdealerProductDetails from "../pages/SubdealerProductDetails";
import UserProductDetails from "../pages/UserProductDetails";







export const router = createBrowserRouter([
  {
      path: '/',
      element: <Navigate to="/login"  />, 
    },
  {
      path: "/",
      element: <RootLayout />,
      children: [
          {
              path: "/home",
              element: <Home />
          },

      {
        path: "/login-page",
        element:<LoginPage />,
      },

{
  path: "/inventory",
  element:<Inventory />,
},

{
  path: "/servicing-list",
  element:<ServicingList />,
},


{
  path: "/add-userByuser",
  element:<AddUserByUser />,
},


{
  path: "/add-dealership",
  element:<AddDealership />,
},

{
  path: "/subdealer-incentives",
  element:<SubdealerIncentive />,
},


{
  path: "/add-dealership",
  element:<AddDealership />,
},

{
  path: "/list-dealership",
  element:<ListDealership />,
},

{
  path: "/income-list",
  element:<IncomeList />,
},

// admin section

{
  path: "/enquiry",
  element:<Enquiry />,
},

{
  path: "/add-product-by-admin",
  element:<AddProductByAdmin />,
},
{
  path: "/add-product-by-dealer",
  element:<AddProductByDealer />,
},


{
  path: "/add-product-by-subdealer",
  element:<AddProductBySubDealer />,
},



{
  path: "/all-product-list-by-admin",
  element:<AddProductListByAdmin />,
},
{
  path: "/all-product-list-by-dealer",
  element:<AddProductListByDealer />,
},


{
  path: "/all-product-list-by-subdealer",
  element:<AddProductListBySubDealer />,
},

{  path: "/all-product-list-by-user",
  element:<AddProductListByUser/>
},

//AddProductUser
{
  path: "/product-details",
  element:<ProductDetails />,
},

{
  path: "/dealer-productdetails",
  element:<DealerProductDetails />,
},

{path:"/subdealer-productdetails",
  element:<SubdealerProductDetails />,

},

{path:"/user-productdetails",
  element:<UserProductDetails/>,

},




{
  path: "/add-dealer-by-admin",
  element:<AddDealerByAdmin />,
},



{
  path: "/all-dealer-list-by-admin",
  element:<AllDealerListByAdmin />,
},




{
  path: "/add-sub-dealer-by-admin",
  element:<AddSubDealerByAdmin />,
},


{
  path: "/all-subdealer-list-by-admin",
  element:<AllSubDealerListByAdmin />,
},


{
  path: "/add-user-by-admin",
  element:<AddUserByAdmin />,
},
{
  path: "/add-user-by-dealer",
  element:<AddUserByDealer/>,
},
{
  path: "/add-user-by-subdealer",
  element:<AddUserBySubDealer/>,
},
{
path: "/add-user-by-user",
  element:<AddUserSubDealerByUser/>

},
{
  path: "/get-incentives",
  element:<GetIncentives />,
},
{
  path: "/get-commission",
  element:<GetCommission />,
},



{
  path: "/club-incentives",
  element:<ClubIncentive />,
},




{
  path: "/all-dealer-subdealer-list-by-admin",
  element:<DealerSubdealerListByAdmin/>,
},


{
  path: "/all-dealer-subdealer-list-by-dealer",
  element:<DealerSubdealerListByDealer/>,
},
{
  path: "/all-dealer-subdealer-list-by-subdealer",
  element:<DealerSubdealerListBySubDealer/>,
},
{ path: "/all-dealer-subdealer-list-by-user",
  element:<DealerSubdealerListByUser/>
},



{ path: "/all-dealer-informationByUserView",
  element:<UserInformationView/>
},



{
  path: "/all-dealer-information",
  element:<DealerTableView/>,
},

{
  path: "/club-incentives-subdealer",
  element:<ClubIncentiveSubdealer/>,
},


{
  path: "/all-dealer-informationByDealer",
  element:<DealerSubdealerListByDealerView/>,
},

{
  path: "/all-dealer-informationBySubDealerView",
element:<DealerSubdealerListBySubDealerView/>
},

// {
//    path: "/all-dealer-informationBySubDealer",
// element :<DealerSubdealerListBySubDealer/>,
// },



{
  path: "/all-dealer-list",
  element:<AllDealerList />,
},

{
  path: "/all-subdealer-list",
  element:<AllSubDealerList />,
},

{
  path: "/all-user-list",
  element:<AllUserList />,
},

{
  path: "/add-club-member",
  element:<AllClubMember />,
},


{
  path: "/all-members-list",
  element:<AllClubMemberList />,
},


{
  path: "/add-performanceIncentive-member",
  element:<PerformanceIncentiveMember />,
},


{
  path: "/all-performanceIncentive-members-list",
  element:<PerformanceIncentiveMemberList />,
},
      {
        path: "/dashboards/analytics",
        element: <Analytics />,
      },
      {
        path: "/all-campaigns",
        element: <AllCampaigns />,
      },
      {
        path: "/approved/campaigns",
        element: <ApprovedCampaigns />,
      },
      {
        path: "/pending/campaigns",
        element: <PendingCampaigns />,
      },
      {
        path: "/rejected/campaigns",
        element: <RejectedCampaigns />,
      },

      {
        path: "/all-locations",
        element: <AllLocations />,
      },
      
      {
        path: "/all-usersList",
        element: <UsersList/>
      },
  
      {
        path: "/add-product",
        element: <AddProduct/>
      },
     {
        path: "/all-product-list",
        element: <ProductList/>
      },
      {
        path: "/add-subdealer",
        element: <AddSubDealer/>
      },
     {
        path: "/subdealers-list",
        element: <SubDealerList/>
      },
  
       

      {
        path:"/all-sub-Admin",
        element:<AllSubAdmin/>
      },
      {
        path: "/add-sub-admin",
        element: <AddSubAdmin />,
      },
      {
        path: "/add-location",
        element: <AddLocation />,
      },
      {
        path:"/total-slots",
      element:<AllTotalSlots />
      },

      {
        path:"/total-available-slots",
        element:<TotalAvailableSlots />
      },

      {
        path:"total-booked-slots",
        element:<TotalBookedSlots />
      },

      {
        path:"total-peaked-slots",
        element:<TotalPeakedSlots />
      },

      {
        path:"/total-normal-slots",
        element:<TotalNormalSlots />
      },
   
        {
      path: "/total-booked-peak-slots",
      element:<TotalBookedPeakedSlots />

        },

        {
            path: "total-booked-normal-slots",
            element:<TotalBookedNormalSlots/>
        },
      {
        path: "/clients/payment/report",
        element: <ReportsSales />,
      },
      {
        path: "/reports/leads",
        element: <ReportsLeads />,
      },
      {
        path: "/reports/project",
        element: <ReportsProject />,
      },
      {
        path: "/reports/timesheets",
        element: <ReportsTimesheets />,
      },

      // Add by User 1. user add user, 2. user add dealer 3. user add sub-dealer
      {
        path: "/add-user",
        element: <AddUser />,
      },

      {
        path: "/add-dealer-by-user",
        element: <AddDealerByUser />,
      },

      {
        path: "/add-subdealer-by-user",
        element: <AddSubDealerByUser />,
      },

      //Add servicing in User Pannel;

      {
        path: "/add-servicing",
        element: <AddServicing />,
      },

      
      
      
      {
        path: "/proposal/view",
        element: <ProposalView />,
      },
      {
        path: "/proposal/edit",
        element: <ProposalEdit />,
      },
      {
        path: "/proposal/create",
        element: <ProposalCreate />,
      },
      {
        path: "/payment/list",
        element: <PaymentList />,
      },
      {
        path: "/payment/view",
        element: <PaymentView />,
      },
      {
        path: "/payment/create",
        element: <PaymentCreate />,
      },
      {
        path: "/customers/list",
        element: <CustomersList />,
      },
      {
        path: "/customers/view",
        element: <CustomersView />,
      },
      {
        path: "/customers/create",
        element: <CustomersCreate />,
      },
      {
        path: "/leads/list",
        element: <LeadsList />,
      },
      {
        path: "/leads/view",
        element: <LeadsView />,
      },
      {
        path: "/leads/create",
        element: <LeadsCreate />,
      },
      {
        path: "/projects/list",
        element: <ProjectsList />,
      },
      {
        path: "/projects/view",
        element: <ProjectsView />,
      },
      {
        path: "/projects/create",
        element: <ProjectsCreate />,
      },
      {
        path: "/widgets/lists",
        element: <WidgetsLists />,
      },
      {
        path: "/widgets/tables",
        element: <WidgetsTables />,
      },
      {
        path: "/widgets/charts",
        element: <WidgetsCharts />,
      },
      {
        path: "/widgets/statistics",
        element: <WidgetsStatistics />,
      },
      {
        path: "/widgets/miscellaneous",
        element: <WidgetsMiscellaneous />,
      },
      {
        path: "/help/knowledgebase",
        element: <HelpKnowledgebase />,
      },
    ],
  },

  {
    path:"/login",
    element:<LoginPage/>
},

{
  path:"/register",
  element:<Register/>
},
  {
    path: "/",
    element: <LayoutApplications />,
    children: [
      {
        path: "/applications/chat",
        element: <AppsChat />,
      },
      {
        path: "/applications/email",
        element: <AppsEmail />,
      },
      {
        path: "/applications/tasks",
        element: <AppsTasks />,
      },
      {
        path: "/applications/notes",
        element: <AppsNotes />,
      },
      {
        path: "/applications/calender",
        element: <AppsCalender />,
      },
      {
        path: "/applications/storage",
        element: <AppsStorage />,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutSetting />,
    children: [
      {
        path: "/settings/ganeral",
        element: <SettingsGaneral />,
      },
      {
        path: "/settings/seo",
        element: <SettingsSeo />,
      },
      {
        path: "/settings/tags",
        element: <SettingsTags />,
      },
      {
        path: "/settings/email",
        element: <SettingsEmail />,
      },
      {
        path: "/settings/tasks",
        element: <SettingsTasks />,
      },
      {
        path: "/settings/leads",
        element: <SettingsLeads />,
      },
      {
        path: "/settings/Support",
        element: <SettingsSupport />,
      },
      {
        path: "/settings/finance",
        element: <SettingsFinance />,
      },
      {
        path: "/settings/gateways",
        element: <SettingsGateways />,
      },
      {
        path: "/settings/customers",
        element: <SettingsCustomers />,
      },
      {
        path: "/settings/localization",
        element: <SettingsLocalization />,
      },
      {
        path: "/settings/recaptcha",
        element: <SettingsRecaptcha />,
      },
      {
        path: "/settings/miscellaneous",
        element: <SettingsMiscellaneous />,
      },
    ],
  },

  {
    path: "/",
    element: <LayoutAuth />,
    children: [
      {
        path: "/authentication/login/cover",
        element: <LoginCover />,
      },
      {
        path: "/authentication/login/minimal",
        element: <LoginMinimal />,
      },
      {
        path: "/authentication/login/creative",
        element: <LoginCreative />,
      },
      {
        path: "/authentication/register/cover",
        element: <RegisterCover />,
      },
      {
        path: "/authentication/register/minimal",
        element: <RegisterMinimal />,
      },
      {
        path: "/authentication/register/creative",
        element: <RegisterCreative />,
      },
      {
        path: "/authentication/reset/cover",
        element: <ResetCover />,
      },
      {
        path: "/authentication/reset/minimal",
        element: <ResetMinimal />,
      },
      {
        path: "/authentication/reset/creative",
        element: <ResetCreative />,
      },
      {
        path: "/authentication/404/cover",
        element: <ErrorCover />,
      },
      {
        path: "/authentication/404/minimal",
        element: <ErrorMinimal />,
      },
      {
        path: "/authentication/404/creative",
        element: <ErrorCreative />,
      },
      {
        path: "/authentication/verify/cover",
        element: <OtpCover />,
      },
      {
        path: "/authentication/verify/minimal",
        element: <OtpMinimal />,
      },
      {
        path: "/authentication/verify/creative",
        element: <OtpCreative />,
      },
      {
        path: "/authentication/maintenance/cover",
        element: <MaintenanceCover />,
      },
      {
        path: "/authentication/maintenance/minimal",
        element: <MaintenanceMinimal />,
      },
      {
        path: "/authentication/maintenance/creative",
        element: <MaintenanceCreative />,
      },
    ],
  },
]);
