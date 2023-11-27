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
import UserProfile from "../pages/Dashboard/User/UserProfile";
import AllUsers from "../pages/Dashboard/admin/AllUsers";
import AdminRoute from "../hooks/admin route/AdminRoute";
import AllDeliveryMan from "../pages/Dashboard/admin/AllDeliveryMan";
import AllParcels from "../pages/Dashboard/admin/AllParcels";
import DeliveryList from "../pages/Dashboard/delivery man/deliveryList";
import MyReviews from "../pages/Dashboard/delivery man/MyReviews";
import Statistics from "../pages/Dashboard/admin/Statistics";
import Error from "../pages/Error/Error";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
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
        errorElement: <Error />,
        children: [


            //User related routes
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
                loader: ({ params }) => axios.get(`https://shipswift-shihab8902.vercel.app/booking/${params.id}`)
            },
            {
                path: "/dashboard/payment",
                element: <Payment />
            },
            {
                path: "/dashboard/userProfile",
                element: <UserProfile />
            },


            //Admin related routes
            {
                path: "/dashboard/statistics",
                element: <Statistics />
            },
            {
                path: "/dashboard/allUsers",
                element: <AdminRoute>
                    <AllUsers />
                </AdminRoute>
            },
            {
                path: "/dashboard/deliveryMans",
                element: <AdminRoute>
                    <AllDeliveryMan />
                </AdminRoute>
            },
            {
                path: "/dashboard/allParcels",
                element: <AdminRoute>
                    <AllParcels />
                </AdminRoute>
            },

            //Delivery man routes
            {
                path: "/dashboard/deliveryList",
                element: <DeliveryList />
            },
            {
                path: "/dashboard/myReviews",
                element: <MyReviews />
            }

        ]
    },
    {
        path: "/dashboard/paymentSuccess",
        element: <PaymentSuccess />
    }
])