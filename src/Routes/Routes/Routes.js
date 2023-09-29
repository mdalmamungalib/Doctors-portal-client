import { createBrowserRouter } from "react-router-dom";
import Main from "../../Pages/Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import SingUp from "../../Pages/Home/SingUp/SingUp";
import DashBoard from "../../Pages/DashBoard/DashBoard/DashBoard";
import PrivetRout from "../PrivetRout/PrivetRout";
import DashboardLayout from "../../Pages/Layout/DashboardLayout";
import MyAppointment from "../../Pages/DashBoard/MyAppointment/MyAppointment";
import AllUsers from "../../Pages/DashBoard/AllUsers/AllUsers";
import AdminRout from "../AdminRour/AdminRout";
import AddDoctor from "../../Pages/DashBoard/AddDoctor/AddDoctor";
import MangeDoctors from "../../Pages/DashBoard/MangeDoctors/MangeDoctors";
import Payment from "../../Pages/DashBoard/Payment/Payment";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import About from "../../Pages/Home/About/About";
import ReviewFrom from "../../Pages/DashBoard/RevewFrom/ReviewFrom";
import Testimonials from "../../Pages/Home/Testimonials/Testimonials";
import ManageReviews from "../../Pages/DashBoard/ManageReviews/ManageReviews";
import ContactUsFrom from "../../Pages/Home/ContactUsFrom/ContactUsFrom";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <DisplayError></DisplayError>,
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/appointment",
                element: <PrivetRout>
                    <Appointment></Appointment>
                </PrivetRout>
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/reviews",
                element: <PrivetRout>
                    <Testimonials></Testimonials>
                </PrivetRout>
            },
            {
                path: "/contactUsFrom",
                element:<ContactUsFrom></ContactUsFrom>
            },
            {
                path: "/singUp",
                element: <SingUp></SingUp>
            }
        ]
    },
    {
        path: "/dashBoard",
        errorElement: <DisplayError></DisplayError>,
        element: <PrivetRout>
            <DashboardLayout></DashboardLayout>
        </PrivetRout>,
        children: [
            {
                path: "/dashBoard",
                element: <PrivetRout>
                    <MyAppointment></MyAppointment>
                </PrivetRout>
            },
            {
                path: "/dashBoard/review",
                element: <PrivetRout>
                    <ReviewFrom></ReviewFrom>
                </PrivetRout>
            },
            {
                path: "/dashBoard/allUsers",
                element: <AdminRout>
                    <AllUsers></AllUsers>
                </AdminRout>

            },
            {
                path: "/dashBoard/addDoctor",
                element: <AdminRout>
                    <AddDoctor></AddDoctor>
                </AdminRout>

            },
            {
                path: "/dashBoard/MangeDoctor",
                element: <AdminRout>
                    <MangeDoctors></MangeDoctors>
                </AdminRout>

            },
            {
                path: "/dashBoard/payment/:id",
                element: <AdminRout>
                    <Payment></Payment>
                </AdminRout>,
                loader: ({ params }) => fetch(`https://doctors-portal-server-smoky-mu.vercel.app/bookings/${params.id}`)
            },
            {
                path: "/dashBoard/MangeReviews",
                element: <AdminRout>
                    <ManageReviews></ManageReviews>
                </AdminRout>
            }
        ]
    }
])