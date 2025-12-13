import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import HRMenu from "../Layout/Menu/HR_menu";
import AddEmployee from "../Page/HR-Dashboard/Add_Employee/AddEmployee";
import AllEmployees from "../Page/HR-Dashboard/All_Employees/AllEmployees";
import EmployeeResignation from "../Page/HR-Dashboard/Employee_Resignation/EmployeeResignation";
import EmployeeLeaveList from "../Page/HR-Dashboard/Employee_Leave_List/EmployeeLeaveList";
import HR_Dashboard_Overview from "../Page/HR-Dashboard/HR_Dashboard_Overview/HR_Dashboard_Overview";
import Profile from "../Page/EmployeeDashboard/Profile/Profile";
import ViewMenu from "../Page/EmployeeDashboard/Contend/ViewMenu/ViewMenu";
import ContentDashboard from "../Page/EmployeeDashboard/Contend/ContentDashboard/ContentDashboard";
import Login from "../Page/Login/Login";
import AboutPage from "../Page/About/AboutPage";
import Service from "../Page/Service/Service";
import Contact from "../Page/Contact/Contact";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import ResignedPage from "../Page/HR-Dashboard/ResignedPage/ResignedPage";
import EmployeeLeftPage from "../Page/HR-Dashboard/EmployeeLeftPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <ProtectedRoute allowedRoles={["hradmin"]}><AboutPage></AboutPage></ProtectedRoute>
      },
      {
        path: "/service",
        element: <Service></Service>
      },
      {
        path: "/contact",
        element: <Contact></Contact>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "*",
        element: <h2>NO ROUTE</h2>
      }
    ]
  },
  {
    path: "dashboard",
    element: <HRMenu></HRMenu>,
    children: [
      {
        path: "",
        element: <HR_Dashboard_Overview></HR_Dashboard_Overview>
      },
      {
        path: "/dashboard/addEmployee",
        element: <AddEmployee></AddEmployee>
      },
      {
        path: "/dashboard/allEmployee",
        element: <AllEmployees></AllEmployees>
      },
      {
        path: "/dashboard/employeeResignation",
        element: <EmployeeResignation></EmployeeResignation>
      },
      {
        path: "/dashboard/employeeLeave",
        element: <EmployeeLeaveList></EmployeeLeaveList>
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>
      },
      {
        path: "/dashboard/canteen",
        element: <ContentDashboard></ContentDashboard>
      },
      {
        path: "/dashboard/canteen/menu",
        element: <ViewMenu></ViewMenu>
      },
      {
        path: "/dashboard/resignedPage",
        element: <ResignedPage></ResignedPage>
      },
      {
        path: "/dashboard/employeeLeftPage",
        element: <EmployeeLeftPage></EmployeeLeftPage>
      },
      {
        path: "*",
        element: <h2>NO ROUTE</h2>
      }
    ]
  }
]);
