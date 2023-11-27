import { useContext, useEffect, useState } from "react"
import DashboardSectionTitle from "../../../components/Section titles/DashboardSectionTitle"
import useGetSecure from "../../../hooks/tanstack/useGetSecure"
import { UserContext } from "../../../context/AuthProvider"
import { FaEdit } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { AiTwotoneDollar } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/axios/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";

const MyParcels = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { data, refetch } = useGetSecure(["bookings", user?.email], `/booking?email=${user.email}`);
    const [renderBookings, setRenderBookings] = useState([]);
    const [deliveryMan, setDeliveryMan] = useState('');

    useEffect(() => {
        setRenderBookings(data);
    }, [data]);

    const { data: payments } = useGetSecure(["payments", user?.email], `/payments?email=${user?.email}`);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();





    const handleFilter = (e) => {
        const value = e.target.value;
        if (value === "all") {
            setRenderBookings(data);
        } else {
            const filtered = data.filter(item => item?.status === e.target.value);
            setRenderBookings(filtered);
        }


    }

    const axiosSecure = useAxiosSecure();



    const handleBookingCancel = id => {

        Swal.fire({
            title: "Cancel?",
            text: "Are you sure want to cancel the booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.put(`/bookings?id=${id}`, { status: "cancelled" })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                text: "The booking have been cancelled!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });

            }
        });

    }


    const onSubmit = (data) => {
        if (data) {
            //get current delivery man
            axiosSecure.get(`/deliveryMan?id=${data.deliveryManId}`)
                .then(res => {
                    if (res.data) {
                        axiosSecure.post("/review", { ...data, deliveryManEmail: res.data?.email })
                            .then(result => {
                                if (result.data) {
                                    const newUserState = {
                                        totalReview: res.data?.totalReview + parseFloat(data.review),
                                        totalReviewer: res.data?.totalReviewer + 1
                                    }

                                    axiosSecure.put(`/delivery/users?id=${data.deliveryManId}`, newUserState)
                                        .then(updateResult => {
                                            if (updateResult.data.modifiedCount > 0) {
                                                reset();
                                                Swal.fire({
                                                    position: "center",
                                                    icon: "success",
                                                    text: "Thanks for your feedback!",
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                });
                                            }
                                        })
                                }
                            })
                    }
                })
        }
    }




    return <div>

        <Helmet>
            <title>ShipSwift - My parcels</title>
        </Helmet>


        <DashboardSectionTitle heading="My Parcels" subHeading="Keep track all of your parcels at once" />





        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" value={user?.displayName} readOnly {...register("name", { required: true })} className="input input-bordered w-full cursor-pointer" />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="text" value={user?.photoURL} readOnly {...register("image", { required: true })} className="input input-bordered w-full cursor-pointer" />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">DeliveryMan ID</span>
                        </label>
                        <input type="text" value={deliveryMan} readOnly {...register("deliveryManId", { required: true })} className="input input-bordered w-full cursor-pointer" />
                        {errors.deliveryManId?.type === "required" && <p className='text-red-500 font-semibold text-sm'>This field is required</p>}
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Rating (out of 5)</span>
                        </label>
                        <input type="number" step="any" {...register("review", { required: true, max: 5, min: 1 })} className="input input-bordered w-full cursor-pointer" placeholder="Enter review" />
                        {errors.review?.type === "required" && <p className='text-red-500 font-semibold text-sm'>This field is required</p>}
                        {errors.review?.type === "min" && <p className='text-red-500 font-semibold text-sm'>The lowest review is 1</p>}
                        {errors.review?.type === "max" && <p className='text-red-500 font-semibold text-sm'>The highest review is 5</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text-alt">Feedback</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" {...register("feedback")} placeholder="Feedback(optional)"></textarea>

                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-5">Submit</button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>




        <div >

            {
                data?.length > 0 ? <div className="overflow-x-auto">

                    <div className="flex w-full justify-end">
                        <select onChange={handleFilter} defaultValue="" className="cursor-pointer outline-none px-5 py-2 bg-gray-50 rounded-md">
                            <option value="" disabled>Filter by</option>
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="on the way">On the way</option>
                            <option value="delivered">Delivered</option>
                            <option value="returned">Returned</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>


                    <table className="table table-xs mt-10 overflow-hidden">

                        <thead>
                            <tr>
                                <th>Parcel type</th>
                                <th>Req. delivery date</th>
                                <th>Appx. delivery date</th>
                                <th>Booking date</th>
                                <th>Delivery man id</th>
                                <th>Update</th>
                                <th>Review</th>
                                <th>Pay now</th>
                                <th>Cancel</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                renderBookings?.map(booking => {
                                    return <tr className="my-5 text-center" key={booking._id}>
                                        <td >{booking.parcelType}</td>
                                        <td>{booking.requestedDeliveryDate?.toString().split("T")[0]}</td>
                                        <td>{booking.approximateDeliveryDate?.toString().split("T")[0] || "-"}</td>
                                        <td>{booking.bookingDate?.toString().split("T")[0]}</td>
                                        <td>{booking.deliveryManId || "-"}</td>
                                        <td><button onClick={(() => navigate(`/dashboard/updateBooking/${booking._id}`))} disabled={booking.status !== "pending"} className=" btn text-green-600 bg-transparent ">{<FaEdit className="text-xl " />}</button></td>
                                        <td><button onClick={() => {
                                            setDeliveryMan(booking.deliveryManId)
                                            document.getElementById('my_modal_2').showModal()
                                        }} disabled={booking.status !== "delivered"} className=" btn text-orange-600 bg-transparent ">{<GiStarsStack className="text-xl " />}</button></td>
                                        <td>{
                                            payments?.find(payment => payment.paymentId === booking._id) ? <p className="font-medium text-green-700">Paid</p> : <Link to="/dashboard/payment" state={{ totalPrice: booking?.calculatedDeliveryPrice, paymentId: booking?._id }}><button className=" btn text-blue-600 bg-transparent ">{<AiTwotoneDollar className="text-xl " />}</button></Link>
                                        }</td>
                                        <td><button disabled={booking.status !== "pending"} onClick={() => handleBookingCancel(booking._id)} className=" btn text-red-600 bg-transparent ">{<GiCancel className="text-xl " />}</button></td>
                                        <td className={`font-medium text-blue-500`}>{booking.status}</td>
                                    </tr>
                                })
                            }
                        </tbody>

                    </table>
                </div>
                    :

                    <div className="my-20 text-center font-semibold text-3xl text-gray-500">
                        <h3>You have no booking yet.</h3>
                    </div>
            }

        </div>


    </div >
}

export default MyParcels