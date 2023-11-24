import { useContext, useState } from 'react'
import bg from '../../assets/images/login.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { UserContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2';

import useAxiosPublic from '../../hooks/axios/useAxiosPublic';



const Login = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { loginUser, signInWithGoogle } = useContext(UserContext);

    const axiosPublic = useAxiosPublic();


    const onSubmit = (data) => {
        loginUser(data?.email, data?.password)
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Your account has been logged in successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/");
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                })
            });
    }



    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                if (result.user) {

                    const user = {
                        name: result.user.displayName,
                        email: result.user.email,
                        role: "user",
                        image: result.user.photoURL
                    };

                    axiosPublic.post("/users", user)
                        .then(() => {

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                text: "Your account has been registered successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate("/");
                        })


                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                })
            })
    }






    return <div className='container mx-auto '>

        <div className=' flex h-screen '>


            <div className='flex-1 hidden relative lg:block'>
                <button onClick={() => navigate("/")} title='Go back' className="btn btn-circle btn-outline absolute top-5 left-5">
                    <IoIosArrowRoundBack className='text-4xl text-white' />
                </button>
                <img src={bg} className='w-full h-full lg:rounded-tl-lg lg:rounded-bl-lg' alt="image not found" />
            </div>


            <div className='md:bg-gray-100 rounded-lg lg:rounded-none p-5 md:p-12 lg:rounded-tr-lg lg:rounded-br-lg  flex-1'>
                <h3 className=' font-bold text-[32px] text-center'>Welcome back!</h3>
                <p className='  font-medium text-gray-400 mt-3 text-center'>Enter your details to login to your account.</p>

                <button onClick={() => navigate("/")} title='Go back' className="lg:hidden   absolute top-1 md:top-5 left-1 md:left-5">
                    <IoIosArrowRoundBack className='text-4xl' />
                </button>


                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-full bg-white border flex items-center rounded-lg my-5 relative'>
                        <span className=' text-gray-400 text-xl ml-3'> <HiOutlineMail /></span>
                        <input className='w-full p-3  outline-none font-semibold rounded-lg placeholder:font-medium' type="email" {...register("email", { required: true })} name="email" id="email" placeholder='Enter email address' />
                        {errors.email?.type === "required" && <p className='text-red-500 font-semibold text-sm absolute left-2 -bottom-5'>Email field is required</p>}
                    </div>

                    <div className='w-full bg-white border flex items-center rounded-lg relative'>
                        <span className=' text-gray-400 text-xl ml-3'> <AiOutlineLock /></span>
                        <input className='w-full p-3  outline-none font-semibold rounded-lg placeholder:font-medium' type={isPasswordVisible ? "text" : "password"}  {...register("password", { required: true })} name="password" id="password" placeholder='Enter password' />
                        <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='relative right-3 cursor-pointer text-gray-400 text-xl'>
                            {
                                isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                            }
                        </span>

                        {errors.password?.type === "required" && <p className='text-red-500 font-semibold text-sm absolute left-2 -bottom-5'>Password field is required</p>}

                    </div>

                    <div className='my-5'>
                        <input className='bg-green-500 w-full py-3 cursor-pointer text-white font-semibold rounded-lg' type="submit" value="Login" />
                    </div>
                </form>

                <hr className='border-black ' />

                <div className='flex justify-center mt-5'>
                    <button onClick={handleGoogleSignIn} className='flex items-center font-semibold gap-1 border bg-gray-200 rounded-lg py-2 px-3'><FcGoogle className='text-lg' /> Continue with Google</button>
                </div>

                <p className='mt-5 text-center font-semibold text-sm'>Don't have an account? <Link state={location.state} to="/register" className='text-green-700 hover:underline'>Register</Link></p>

            </div>
        </div>
    </div>
}

export default Login