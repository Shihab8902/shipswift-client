import { useContext } from "react";
import useUserType from "../hooks/user/useUserType"
import { RiMenu3Fill } from "react-icons/ri";
import { UserContext } from "../context/AuthProvider";
import { NavLink, Outlet } from "react-router-dom";
import logo from '../assets/images/logo.png';

import { TbTruckDelivery } from "react-icons/tb";
import { GiStarsStack } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { IoMdStats } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";

const Dashboard = () => {
    const { userType } = useUserType();
    const { user } = useContext(UserContext);


    const navlinks = <>
        {
            user && userType === "user" && <>
                <NavLink to="/" className="text-white font-medium uppercase  mb-5 p-4 flex items-center gap-2"> <FaUserLarge className="text-2xl" /> My Profile</NavLink>
                <NavLink to="/dashboard/book-a-parcel" className="text-white font-medium flex items-center gap-2  uppercase mb-5 p-4"><FaClipboardList className="text-2xl" /> Book a parcel</NavLink>
                <NavLink to="/" className="text-white font-medium uppercase  mb-5 p-4 flex items-center gap-2"> <FaListCheck className="text-2xl" /> My parcels</NavLink>
            </>

        }

        {
            user && userType === "deliveryMan" && <>
                <NavLink to="/" className="text-white font-medium uppercase  mb-5 p-4 flex items-center gap-2"> <TbTruckDelivery className="text-2xl" /> My delivery list</NavLink>
                <NavLink to="/" className="text-white font-medium flex items-center gap-2  uppercase mb-5 p-4"><GiStarsStack className="text-2xl" /> My reviews</NavLink>
            </>
        }

        {
            user && userType === "admin" && <>
                <NavLink to="/" className="text-white font-medium uppercase  mb-5 p-4 flex items-center gap-2"> <IoMdStats className="text-2xl" />Statistics</NavLink>
                <NavLink to="/" className="text-white font-medium flex items-center gap-2  uppercase mb-5 p-4"><FaUsers className="text-2xl" /> All users</NavLink>
                <NavLink to="/" className="text-white font-medium flex items-center gap-2  uppercase mb-5 p-4"><FaBoxOpen className="text-2xl" /> All parcels</NavLink>
                <NavLink to="/" className="text-white font-medium flex items-center gap-2  uppercase mb-5 p-4"><CiDeliveryTruck className="text-2xl" /> All delivery men</NavLink>
            </>
        }


    </>


    return (
        <div className="drawer lg:drawer-open">
            <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden text-3xl p-4"><RiMenu3Fill /></label>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content p-10">

                <Outlet />

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-blue-700 text-base-content">
                    <div className='flex items-center gap-1 mt-5 mb-10'>
                        <img className='w-[30px] md:w-[50px]' src={logo} alt="" />
                        <p className={`text-lg md:text-2xl font-semibold text-white`}>ShipSwift</p>
                    </div> <hr className="mb-5" />
                    {navlinks}

                    <hr className="mb-5" />

                    <NavLink to="/" className="text-white font-medium uppercase  mb-5 p-4 flex items-center gap-2"> <IoHome className="text-2xl" /> Home</NavLink>
                </ul>

            </div>
        </div>
    )
}

export default Dashboard