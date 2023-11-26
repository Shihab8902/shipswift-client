import { useContext, useState } from 'react'
import bg from '../../assets/images/register.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLock } from 'react-icons/ai';

import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { FaPhoneAlt } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { UserContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/axios/useAxiosPublic';
import { updateProfile } from 'firebase/auth';



const Register = () => {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createUser } = useContext(UserContext);
    const axiosPublic = useAxiosPublic();

    const [isRegistering, setIsRegistering] = useState(false);

    const onSubmit = (data) => {
        setIsRegistering(true);
        createUser(data?.email, data?.password)
            .then(async (res) => {
                if (res.user) {
                    const hostingAPIKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
                    const imageData = { image: data.photo[0] };
                    const result = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${hostingAPIKey}`, imageData, {
                        headers: {
                            "content-Type": "multipart/form-data"
                        }
                    });

                    if (result.data.success) {
                        const photoURL = result.data.data.display_url;

                        updateProfile(res.user, {
                            displayName: data.name,
                            photoURL: photoURL,
                            role: data.role,
                            phone: data.phone
                        })
                            .then(() => {

                                const user = {
                                    name: data.name,
                                    email: data.email,
                                    role: data.role,
                                    image: photoURL,
                                    phone: data.phone
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
                                        setIsRegistering(false);
                                    })

                            })
                    }

                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error"
                })
                setIsRegistering(false);
            })

    };







    return (
        <div className=' flex min-h-screen container mx-auto' >



            <div className='flex-1 hidden lg:block'>
                <img src={bg} className='w-full h-full lg:rounded-tl-lg lg:rounded-bl-lg' alt="" />
            </div>


            <div className='md:bg-gray-100 rounded-lg lg:rounded-none p-5 md:p-12 lg:rounded-tr-lg lg:rounded-br-lg  flex-1'>
                <h3 className=' font-bold text-[32px] text-center'>Welcome!</h3>
                <p className='  font-medium text-gray-400 mt-3 text-center'>Enter your details to register your account.</p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='w-full bg-white border flex items-center relative rounded-lg my-5'>
                        <span className=' text-gray-400 text-xl ml-3'> <AiOutlineUser /></span>
                        <input className='w-full p-3  outline-none font-semibold rounded-lg placeholder:font-medium' type="text" {...register("name", { required: true })} name="name" id="name" placeholder='Enter your name' />
                        {errors.name?.type === "required" && <p className='text-red-500 font-semibold text-sm absolute left-2 -bottom-5'>Name field is required</p>}
                    </div>



                    <div className='w-full bg-white border flex items-center relative rounded-lg my-5'>
                        <span className=' text-gray-400 text-xl ml-3'> <HiOutlineMail /></span>
                        <input className='w-full p-3  outline-none font-semibold rounded-lg placeholder:font-medium' type="email" {...register("email", { required: true })} name="email" id="email" placeholder='Enter email address' />
                        {errors.email?.type === "required" && <p className='text-red-500 font-semibold text-sm absolute left-2 -bottom-5'>Email field is required</p>}
                    </div>

                    <div className='w-full bg-white border flex items-center relative rounded-lg my-5'>
                        <span className=' text-gray-400 text-xl ml-3'> <FaPhoneAlt /></span>
                        <input className='w-full p-3  outline-none font-semibold rounded-lg placeholder:font-medium' type="number" {...register("phone", { required: true })} name="phone" id="phone" placeholder='Enter contact number' />
                        {errors.phone?.type === "required" && <p className='text-red-500 font-semibold text-sm absolute left-2 -bottom-5'>Email field is required</p>}
                    </div>

                    <div className='w-full bg-white border flex items-center relative  my-5'>
                        <select {...register("role", { required: true })} defaultValue='' className="select select-bordered w-full font-bold text-gray-600 outline-none rounded-lg ">
                            <option disabled value='' >Select a user type</option>
                            <option value="user">User</option>
                            <option value="deliveryMan">Delivery man</option>
                        </select>
                        {errors.role?.type === "required" && <p className='text-red-500 font-semibold text-sm absolute left-2 -bottom-5'>Select user field is required</p>}
                    </div>
                    <div className={`w-full bg-white border relative flex items-center  rounded-lg`}>
                        <span className=' text-gray-400 text-xl ml-3'> <AiOutlineLock /></span>
                        <input className='w-full p-3  outline-none font-semibold rounded-lg placeholder:font-medium' type={isPasswordVisible ? "text" : "password"} {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*[A-Z]).+$/ })} name="password" id="password" placeholder='Enter password' />
                        <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='relative right-3 cursor-pointer text-gray-400 text-xl'>
                            {
                                isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                            }


                        </span>
                        {errors.password?.type === "minLength" && <p className='text-red-500 font-semibold text-sm absolute left-2 -bottom-5'>Password must be at least 6 character</p>}
                        {errors.password?.type === "required" && <p className='text-red-500 font-semibold text-sm absolute left-2 -bottom-5'>Password field is required</p>}
                        {errors.password?.type === "pattern" && <p className='text-red-500 font-semibold text-sm absolute left-2 -bottom-5'>Password should contain uppercase letter and special character</p>}
                    </div>

                    <div title='Enter profile photo' className='w-full bg-white border flex items-center rounded-lg my-5 relative'>
                        <input type="file" {...register("photo", { required: true })} accept="image/*" className="file-input file-input-bordered file-input-md w-full  outline-none font-semibold rounded-lg " />
                        {errors.photo?.type === "required" && <p role="alert" className='text-red-500 font-semibold text-sm absolute left-2 -bottom-5'>Profile photo field is required</p>}
                    </div>

                    <div className='my-5'>
                        <input disabled={isRegistering} className='bg-green-500  w-full py-3 cursor-pointer text-white  font-semibold rounded-lg' type="submit" value={isRegistering ? "Registering...." : "Register"} />
                    </div>
                </form>

                <hr className='border-black ' />



                <p className='mt-5 text-center font-semibold text-sm'>Already have an account? <Link to="/login" className='text-green-700 hover:underline'>Login</Link></p>

            </div>


        </div>
    )
}

export default Register