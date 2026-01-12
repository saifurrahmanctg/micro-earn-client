import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import PrivateRoute from "./PrivateRoute";

// Worker Components
import WorkerTasks from "../Pages/Dashboard/Worker/WorkerTasks";
import TaskDetails from "../Pages/Dashboard/Worker/TaskDetails";
import MySubmissions from "../Pages/Dashboard/Worker/MySubmissions";
import Withdraw from "../Pages/Dashboard/Worker/Withdraw";

// Buyer Components
import AddTask from "../Pages/Dashboard/Buyer/AddTask";
import MyTasks from "../Pages/Dashboard/Buyer/MyTasks";
import UpdateTask from "../Pages/Dashboard/Buyer/UpdateTask";
import PurchaseCoins from "../Pages/Dashboard/Buyer/PurchaseCoins";
import Payment from "../Pages/Dashboard/Buyer/Payment";
import PaymentHistory from "../Pages/Dashboard/Buyer/PaymentHistory";

// Admin Components
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageTasks from "../Pages/Dashboard/Admin/ManageTasks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
        {
            path: "",
            element: <DashboardHome />
        },
        // Worker Routes
        {
            path: "worker-tasks",
            element: <WorkerTasks />
        },
        {
            path: "task-details/:id",
            element: <TaskDetails />
        },
        {
            path: "my-submissions",
            element: <MySubmissions />
        },
        {
            path: "withdraw",
            element: <Withdraw />
        },
        // Buyer Routes
        {
            path: "add-task",
            element: <AddTask />
        },
        {
            path: "my-tasks",
            element: <MyTasks />
        },
        {
            path: "update-task/:id",
            element: <UpdateTask />
        },
        {
            path: "purchase-coins",
            element: <PurchaseCoins />
        },
        {
            path: "payment",
            element: <Payment />
        },
        {
            path: "payment-history",
            element: <PaymentHistory />
        },
        // Admin Routes
        {
            path: "manage-users",
            element: <ManageUsers />
        },
        {
            path: "manage-tasks",
            element: <ManageTasks />
        }
    ]
  }
], {
    future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    }
});
