import React, { useContext, useEffect, useState } from 'react'
import './nav.css'
import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../../assets/images/logo.png';





const Nav = () => {



    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);



    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [])

    const navLinks = <>
        <li className='font-semibold text-lg'><NavLink to="/">Home</NavLink></li>
        <li className='font-semibold text-lg'><NavLink to="/dashboard">Dashboard</NavLink></li>


    </>








    return <nav className={`fixed z-50  top-0 w-full left-0 mb-20  transition-all duration-200  px-6 ${isScrolled ? "py-3 md:py-4 bg-white   text-black" : "py-4 md:py-6  text-white bg-transparent"} `}>

        <div className='container mx-auto flex justify-between items-center'>
            <div className='flex items-center gap-1'>
                <img className='w-[50px]' src={logo} alt="" />
                <p className={`text-2xl font-semibold`}>ShipSwift</p>
            </div>

            <div className='hidden lg:block'>
                <ul className='flex gap-5  uppercase items-center'>
                    {navLinks}


                    {/* {
                        user ? <>
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div onClick={() => navigate("/dashboard/cart", { replace: true })} className="indicator ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item">{item.length}</span>
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
                                    <li className='font-bold text-center lowercase my-3'>{user?.email || "Unknown"}</li>
                                    <button onClick={handleLogOut} className='btn bg-red-600 text-white hover:text-black'>Log out</button>

                                </ul>
                            </div>
                        </> : <div>
                            <Link title="login" className='font-bold text-3xl' to="/login"> <BiSolidUserPlus /></Link>
                        </div>
                    } */}





                </ul>
            </div>

            <div className=' lg:hidden text-3xl flex items-center gap-2 '>

                {/* {
                    user ? <>
                        <label tabIndex={0} className="btn btn-ghost btn-circle">


                            <div onClick={() => navigate("/dashboard/cart", { replace: true })} className="indicator ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
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
                                <li className='font-bold text-center lowercase my-3'>{user?.email || "Unknown"}</li>
                                <button onClick={handleLogOut} className='btn bg-red-600 text-white hover:text-black'>Log out</button>

                            </ul>
                        </div>
                    </> : <div>
                        <Link title="login" className='font-bold text-3xl mr-3' to="/login"> <BiSolidUserPlus /></Link>
                    </div>
                } */}

                <button onClick={() => setIsMenuVisible(!isMenuVisible)} className='cursor-pointer text-3xl '>

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