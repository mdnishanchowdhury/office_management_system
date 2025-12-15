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
import Login from "../Page/Login/Login";
import AboutPage from "../Page/About/AboutPage";
import Service from "../Page/Service/Service";
import Contact from "../Page/Contact/Contact";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import ResignedPage from "../Page/HR-Dashboard/ResignedPage/ResignedPage";
import EmployeeLeftPage from "../Page/HR-Dashboard/EmployeeLeftPage";
import PredictedSalary from "../Page/HR-Dashboard/PredictedSalary/PredictedSalary";
import Power_bl from "../Page/HR-Dashboard/power_bl/Power_bl";
import DashboardRedirect from "../Page/HR-Dashboard/DashboardRedirect/DashboardRedirect";

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
        element: <ProtectedRoute allowedRoles={["hradmin"]}><AboutPage /></ProtectedRoute>
      },
      {
        path: "/service", element: <Service />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "*",
        element: <h2>NO ROUTE</h2>
      },
    ]
  },
  {
    path: "dashboard",
    element: <HRMenu />,
    children: [
      {
        path: "",
        element: <DashboardRedirect />
      },
      {
        path: "hr",
        element: <ProtectedRoute allowedRoles={["hradmin"]}><HR_Dashboard_Overview /></ProtectedRoute>
      },
      {
        path: "addEmployee",
        element: <ProtectedRoute allowedRoles={["hradmin"]}><AddEmployee /></ProtectedRoute>
      },
      {
        path: "predictedsalary",
        element: <ProtectedRoute allowedRoles={["hradmin"]}><PredictedSalary /></ProtectedRoute>
      },
      {
        path: "allEmployee",
        element: <ProtectedRoute allowedRoles={["hradmin"]}><AllEmployees /></ProtectedRoute>
      },
      {
        path: "employeeResignation",
        element:<ProtectedRoute allowedRoles={["hradmin"]}><EmployeeResignation /></ProtectedRoute>
      },
      {
        path: "employeeLeave",
        element: <ProtectedRoute allowedRoles={["hradmin"]}><EmployeeLeaveList /></ProtectedRoute>
      },
      {
        path: "powerbl",
        element: <ProtectedRoute allowedRoles={["hradmin"]}><Power_bl /></ProtectedRoute>
      },
      {
        path: "resignedPage",
        element:<ProtectedRoute allowedRoles={["hradmin"]}><ResignedPage /></ProtectedRoute> 
      },
      {
        path: "employeeLeftPage",
        element: <ProtectedRoute allowedRoles={["hradmin"]}><EmployeeLeftPage /></ProtectedRoute> 
      },

      // Employee pages
      {
        path: "profile",
        element:<ProtectedRoute allowedRoles={["employee"]}><Profile /></ProtectedRoute> 
      },

      {
        path: "*",
        element: <h2>NO ROUTE</h2>
      },
    ]
  }
]);
