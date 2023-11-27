import { useContext, useEffect, useState } from 'react'
import './nav.css'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSolidUserPlus } from 'react-icons/bi';
import { IoIosNotifications } from "react-icons/io";
import logo from '../../../assets/images/logo.png';
import { UserContext } from '../../../context/AuthProvider';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/axios/useAxiosSecure';





const Nav = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const { user, logOutUser, loading } = useContext(UserContext);


    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [])


    //get current user type
    const { data: userType } = useQuery({
        queryKey: ["currentLoginUserRole"],
        enabled: !loading,
        queryFn: async () => {
            const result = await axiosSecure.get(`/user?email=${user?.email}`);
            return result.data.role;
        }
    });



    const navLinks = <>
        <li className='font-semibold text-lg'><NavLink to="/">Home</NavLink></li>
        {
            user && userType === "admin" ? <li className='font-semibold text-lg'><NavLink to="/dashboard/statistics">Dashboard</NavLink></li> :
                user && userType === "deliveryMan" ? <li className='font-semibold text-lg'><NavLink to="/dashboard/deliveryList">Dashboard</NavLink></li> :
                    user && userType === "user" ? <li className='font-semibold text-lg'><NavLink to="/dashboard/userProfile">Dashboard</NavLink></li> :
                        <li className='font-semibold text-lg'><NavLink to="/login">Dashboard</NavLink></li>
        }


    </>



    const handleLogOut = () => {
        Swal.fire({
            title: "Log out?",
            text: "Are you sure want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {

                logOutUser()
                    .then(() => {
                        navigate("/");
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Logged out successfully!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });

            }
        });
    }





    return <nav className={`fixed z-50  top-0 w-full left-0 mb-20  transition-all duration-200  px-6 ${isScrolled ? "py-3 md:py-4 bg-white   text-black" : "py-4 md:py-6  text-white bg-transparent"} `}>

        <div className='container mx-auto flex justify-between items-center'>
            <div className='flex items-center gap-1'>
                <img className='w-[30px] md:w-[50px]' src={logo} alt="" />
                <p className={`text-lg md:text-2xl font-semibold`}>ShipSwift</p>
            </div>

            <div className='hidden lg:block'>
                <ul className='flex gap-5  uppercase items-center'>
                    {navLinks}


                    {
                        user ? <>
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator ">
                                    <IoIosNotifications className='text-3xl' />
                                    <span className="badge badge-sm indicator-item">{0}</span>
                                </div>
                            </label>

                            <div className="dropdown dropdown-end text-black">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full border-2 border-green-600">
                                        <img src={user?.photoURL || "https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp"} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className='font-bold text-center'>{user?.displayName || "User"}</li>
                                    {
                                        user && userType === "admin" ? <li className='font-semibold mx-auto text-primary my-3 hover:underline text-lg'><Link to="/dashboard/statistics">Dashboard</Link></li> :
                                            user && userType === "deliveryMan" ? <li className='font-semibold mx-auto text-primary my-3 hover:underline text-lg'><Link to="/dashboard/deliveryList">Dashboard</Link></li> :
                                                user && userType === "user" ? <li className='font-semibold mx-auto text-primary my-3 hover:underline text-lg'><Link to="/dashboard/userProfile">Dashboard</Link></li> :
                                                    <li className='font-semibold mx-auto text-primary my-3 hover:underline text-lg'><Link to="/login">Dashboard</Link></li>
                                    }
                                    <button onClick={handleLogOut} className='btn bg-red-600 text-white hover:text-black'>Log out</button>

                                </ul>
                            </div>
                        </> : <div>
                            <Link title="login" className='font-bold text-3xl' to="/login"> <BiSolidUserPlus /></Link>
                        </div>
                    }





                </ul>
            </div>

            <div className=' lg:hidden text-3xl flex items-center  gap-2 '>

                {
                    user ? <>
                        <label tabIndex={0} className="btn btn-ghost btn-circle">


                            <div className="indicator ">
                                <IoIosNotifications className='text-3xl' />
                                <span className="badge badge-sm indicator-item">1</span>
                            </div>
                        </label>

                        <div className="dropdown dropdown-end text-black">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full border-2 border-green-600">
                                    <img src={user?.photoURL || "https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp"} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li className='font-bold text-center'>{user?.displayName || "User"}</li>
                                <Link className='font-semibold text-blue-600 hover:underline text-center  my-3' to="/dashboard">Dashboard</Link>
                                <button onClick={handleLogOut} className='btn bg-red-600 text-white hover:text-black'>Log out</button>

                            </ul>
                        </div>
                    </> : <div>
                        <Link title="login" className='font-bold text-3xl flex items-center mr-3' to="/login"> <BiSolidUserPlus /></Link>
                    </div>
                }

                <button onClick={() => setIsMenuVisible(!isMenuVisible)} className='cursor-pointer text-3xl  '>

                    {
                        isMenuVisible ? <AiOutlineClose /> : <GiHamburgerMenu />
                    }
                </button>
            </div>

            <div className={`absolute  transition-all duration-300 right-0 ${isScrolled ? "top-[80px]" : "top-[60px] md:top-[100px]"} ${isMenuVisible ? "translate-x-0" : " translate-x-full"} bg-[#1B6B93] p-5 w-full h-screen`}>
                <ul className='flex  flex-col gap-3'>
                    {navLinks}
                </ul>
            </div>
        </div>

    </nav>
}

export default Nav