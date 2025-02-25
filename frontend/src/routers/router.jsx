import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import Wishlist from "../pages/Wishlist";
import BooksPage from "../pages/books/BooksPage";
import ManageBanners from "../pages/dashboard/banners/ManageBanners";
import AdminOrders from "../pages/dashboard/admin/AdminOrders";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import CouponManagement from "../pages/dashboard/admin/CouponManagement";
import AdminRedirect from "../components/AdminRedirect";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/orders",
            element: <PrivateRoute><OrderPage/></PrivateRoute>
        },
        {
            path: "/about",
            element: <div>About</div>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/cart",
          element: <CartPage/>
        },
        {
          path: "/checkout",
          element: <PrivateRoute><CheckoutPage/></PrivateRoute>
        },
        {
          path: "/books/:id",
          element: <SingleBook/>
        },
        {
          path: "/user-dashboard",
          element: <PrivateRoute><UserDashboard/></PrivateRoute>
        },
        {
          path: "/wishlist",
          element: <Wishlist/>
        },
        {
          path: "/books",
          element: <BooksPage/>
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />
        },
        {
          path: "/reset-password",
          element: <ResetPassword />
        }
      ]
    },
    {
      path: "/freshbooksadmin",
      element: <AdminLogin/>
    },
    {
      path: "/dashboard",
      element: <AdminRedirect/>
    },
    {
      path: "/admin-dashboard",
      element: <AdminRoute>
        <DashboardLayout/>
      </AdminRoute>,
      children:[
        {
          path: "",
          element: <AdminRoute><Dashboard/></AdminRoute>
        },
        {
          path: "add-new-book",
          element: <AdminRoute>
            <AddBook/>
          </AdminRoute>
        },
        {
          path: "edit-book/:id",
          element: <AdminRoute>
            <UpdateBook/>
          </AdminRoute>
        },
        {
          path: "manage-books",
          element: <AdminRoute>
            <ManageBooks/>
          </AdminRoute>
        },
        {
          path: "manage-banners",
          element: <AdminRoute>
            <ManageBanners/>
          </AdminRoute>
        },
        {
          path: "orders",
          element: <AdminRoute>
            <AdminOrders/>
          </AdminRoute>
        },
        {
          path: "manage-coupons",
          element: <AdminRoute>
            <CouponManagement/>
          </AdminRoute>
        }
      ]
    }
  ]);

  export default router;