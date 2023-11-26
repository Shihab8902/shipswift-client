import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layouts/Dashboard";
import PrivateRoute from "../hooks/private route/PrivateRoute";
import BookAParcel from "../pages/Dashboard/User/BookAParcel";
import MyParcels from "../pages/Dashboard/User/MyParcels";
import UpdateParcel from "../pages/Dashboard/User/UpdateParcel";
import axios from "axios";
import Payment from "../pages/Dashboard/User/Payment";
import PaymentSuccess from "../pages/Dashboard/User/PaymentSuccess";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h2>404 page not found</h2>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <Dashboard />
        </PrivateRoute>,
        errorElement: <h3>This page does not exist</h3>,
        children: [
            {
                path: "/dashboard/book-a-parcel",
                element: <BookAParcel />
            },
            {
                path: "/dashboard/myParcels",
                element: <MyParcels />
            },
            {
                path: "/dashboard/updateBooking/:id",
                element: <UpdateParcel />,
                loader: ({ params }) => axios.get(`http://localhost:9000/booking/${params.id}`)
            },
            {
                path: "/dashboard/payment",
                element: <Payment />
            }
        ]
    },
    {
        path: "/dashboard/paymentSuccess",
        element: <PaymentSuccess />
    }
])