import React, { useContext, useState } from 'react'
import bg from '../../assets/images/register.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { BiPhotoAlbum } from 'react-icons/bi';




const Register = () => {




    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);











    return (
        <div className=' flex h-screen'>



            <div className='flex-1 hidden lg:block'>
                <img src={bg} className='w-full h-full lg:rounded-tl-lg lg:rounded-bl-lg' alt="" />
            </div>


            <div className='md:bg-gray-100 rounded-lg lg:rounded-none p-5 md:p-12 lg:rounded-tr-lg lg:rounded-br-lg  flex-1'>
                <h3 className=' font-bold text-[32px] text-center'>Welcome!</h3>
                <p className='  font-medium text-gray-400 mt-3 text-center'>Enter your details to register your account.</p>

                <form  >
                    <div className='w-full bg-white border flex items-center rounded-lg my-5'>
                        <span className=' text-gray-400 text-xl ml-3'> <AiOutlineUser /></span>
                        <input className='w-full p-3  outline-none font-semibold rounded-lg placeholder:font-medium' type="text" name="name" id="name" placeholder='Enter your name' required />
                    </div>

                    <div className='w-full bg-white border flex items-center rounded-lg my-5'>
                        <span className=' text-gray-400 text-xl ml-3'> <HiOutlineMail /></span>
                        <input className='w-full p-3  outline-none font-semibold rounded-lg placeholder:font-medium' type="email" name="email" id="email" placeholder='Enter email address' required />
                    </div>

                    <div className='w-full bg-white border flex items-center  my-5'>
                        <select className="select select-bordered w-full font-bold text-gray-600 outline-none rounded-lg ">
                            <option disabled selected>Select a user type</option>
                            <option>User</option>
                            <option>Delivery man</option>
                        </select>
                    </div>
                    <div className={`w-full bg-white border flex items-center ${isPasswordError && "border border-red-500"} rounded-lg`}>
                        <span className=' text-gray-400 text-xl ml-3'> <AiOutlineLock /></span>
                        <input className='w-full p-3  outline-none font-semibold rounded-lg placeholder:font-medium' type={isPasswordVisible ? "text" : "password"} name="password" id="password" placeholder='Enter password' required />
                        <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='relative right-3 cursor-pointer text-gray-400 text-xl'>
                            {
                                isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                            }


                        </span>

                    </div>

                    <div title='Enter profile photo' className='w-full bg-white border flex items-center rounded-lg my-5'>
                        <input type="file" accept='image/png, image/jpg, image/jpeg, image/JPEG' className="file-input file-input-bordered file-input-md w-full  outline-none font-semibold rounded-lg " />
                    </div>

                    <div className='my-5'>
                        <input className='bg-green-500 w-full py-3 cursor-pointer text-white font-semibold rounded-lg' type="submit" value="Register" />
                    </div>
                </form>

                <hr className='border-black ' />



                <p className='mt-5 text-center font-semibold text-sm'>Already have an account? <Link to="/login" className='text-green-700 hover:underline'>Login</Link></p>

            </div>


        </div>
    )
}

export default Register