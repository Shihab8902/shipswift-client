import { useForm } from "react-hook-form"
import DashboardSectionTitle from "../../../components/Section titles/DashboardSectionTitle"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/AuthProvider";
import useAxiosSecure from "../../../hooks/axios/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateParcel = () => {

    const { data: booking } = useLoaderData();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { user } = useContext(UserContext);
    const [calculatedPrice, setCalculatedPrice] = useState(booking?.calculatedDeliveryPrice);

    let parcelWeight = watch("parcelWeight");
    parcelWeight = parseInt(parcelWeight);





    useEffect(() => {
        const calculatePrice = () => {
            if (parcelWeight === 1) {
                setCalculatedPrice(50);
            } else if (parcelWeight === 2) {
                setCalculatedPrice(100);
            } else if (parcelWeight > 2) {
                setCalculatedPrice(150);
            } else {
                setCalculatedPrice(0);
            }
        };

        calculatePrice();
    }, [parcelWeight]);


    const axiosSecure = useAxiosSecure();


    const onSubmit = async (data) => {
        const newBooking = {
            ...data,
            calculatedDeliveryPrice: calculatedPrice
        }

        const result = await axiosSecure.put(`/bookings?id=${booking?._id}`, newBooking);
        if (result.data) {
            navigate(-1);
            Swal.fire({
                position: "center",
                icon: "success",
                text: "Your booking has been updated successfully!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }


    return <div>
        <DashboardSectionTitle heading="Update a booking" subHeading="Fill out the form to update your booking information" />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            {/* First row */}
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Your name*</span>
                    </label>
                    <input type="text" defaultValue={user?.displayName} readOnly placeholder="Your name" {...register("name", { required: true })} className="input input-bordered w-full " />
                    {errors.name?.type === "required" && <p className="text-red-600 font-medium">This field is required</p>}
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Your email*</span>
                    </label>
                    <input type="email" defaultValue={user?.email} readOnly placeholder="Your email" {...register("email", { required: true })} className="input input-bordered w-full " />
                    {errors.email?.type === "required" && <p className="text-red-600 font-medium">This field is required</p>}
                </div>
            </div>

            {/* Second row */}
            <div className="flex flex-col md:flex-row items-center gap-6 mt-3">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Your phone number*</span>
                    </label>
                    <input type="text" defaultValue={booking?.phone} placeholder="Your phone number" {...register("phone", { required: true })} className="input input-bordered w-full " />
                    {errors.phone?.type === "required" && <p className="text-red-600 font-medium">This field is required</p>}
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Parcel type *</span>
                    </label>
                    <input type="text" defaultValue={booking?.parcelType} placeholder="Parcel type" {...register("parcelType", { required: true })} className="input input-bordered w-full " />
                    {errors.parcelType?.type === "required" && <p className="text-red-600 font-medium">This field is required</p>}
                </div>
            </div>


            {/* Third row */}
            <div className="flex flex-col md:flex-row items-center gap-6 mt-3">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Parcel weight *</span>
                    </label>
                    <input type="number" defaultValue={booking?.parcelWeight} placeholder="Parcel weight" {...register("parcelWeight", { required: true })} className="input input-bordered w-full " />
                    {errors.parcelWeight?.type === "required" && <p className="text-red-600 font-medium">This field is required</p>}
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Receiver's name *</span>
                    </label>
                    <input type="text" defaultValue={booking?.receiversName} placeholder="Receiver's name" {...register("receiversName", { required: true })} className="input input-bordered w-full " />
                    {errors.receiversName?.type === "required" && <p className="text-red-600 font-medium">This field is required</p>}
                </div>
            </div>

            {/* Fourth row */}
            <div className="flex flex-col md:flex-row items-center gap-6 mt-3">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Receiver's phone number *</span>
                    </label>
                    <input type="text" defaultValue={booking?.receiversPhone} placeholder="Receiver's phone number" {...register("receiversPhone", { required: true })} className="input input-bordered w-full " />
                    {errors.receiversPhone?.type === "required" && <p className="text-red-600 font-medium">This field is required</p>}
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Parcel delivery address *</span>
                    </label>
                    <input type="text" defaultValue={booking?.deliveryAddress} placeholder="Parcel delivery address" {...register("deliveryAddress", { required: true })} className="input input-bordered w-full " />
                    {errors.deliveryAddress?.type === "required" && <p className="text-red-600 font-medium">This field is required</p>}
                </div>
            </div>


            {/* Fifth row */}
            <div className="flex flex-col md:flex-row items-center gap-6 mt-3">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Requested delivery date *</span>
                    </label>
                    <input type="date" defaultValue={booking?.requestedDeliveryDate.toString().split("T")[0]} placeholder="Requested delivery date" {...register("requestedDeliveryDate", { required: true })} className="input input-bordered w-full " />
                    {errors.requestedDeliveryDate?.type === "required" && <p className="text-red-600 font-medium">This field is required</p>}
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Delivery address latitude *</span>
                    </label>
                    <input type="text" defaultValue={booking?.deliveryAddressLatitude} placeholder="Delivery address latitude" {...register("deliveryAddressLatitude", { required: true })} className="input input-bordered w-full " />
                    {errors.deliveryAddressLatitude?.type === "required" && <p className="text-red-600 font-medium">This field is required</p>}
                </div>
            </div>

            {/* Sixth row */}
            <div className="flex flex-col md:flex-row items-center gap-6 mt-3">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Delivery address longitude *</span>
                    </label>
                    <input type="text" defaultValue={booking?.deliveryAddressLongitude} placeholder="Delivery address longitude" {...register("deliveryAddressLongitude", { required: true })} className="input input-bordered w-full " />
                    {errors.deliveryAddressLongitude?.type === "required" && <p className="text-red-600 font-medium">This field is required</p>}
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Calculated delivery price</span>
                    </label>
                    <input type="text" placeholder="Calculated delivery price" value={calculatedPrice} readOnly className="input input-bordered w-full " />

                </div>
            </div>

            <button type="submit" className="btn btn-success w-full my-5 text-white">Update booking</button>

        </form>


    </div>
}

export default UpdateParcel