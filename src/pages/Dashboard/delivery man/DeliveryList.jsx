import { useContext, useState } from "react"
import DashboardSectionTitle from "../../../components/Section titles/DashboardSectionTitle"
import useGetSecure from "../../../hooks/tanstack/useGetSecure"
import { UserContext } from "../../../context/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../hooks/axios/useAxiosSecure"
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Swal from "sweetalert2"

const DeliveryList = () => {
    const { user } = useContext(UserContext);


    const { data: currentUser } = useGetSecure(["currentUser"], `/user?email=${user?.email}`);

    const axiosSecure = useAxiosSecure();

    console.log(currentUser);

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ["deliveryManBooking", user?.email],
        enabled: currentUser?.role === "deliveryMan",
        queryFn: async () => {
            const result = await axiosSecure.get(`/delivery/booking?id=${currentUser?._id}`);
            return result.data;
        }
    });


    const handleOpenModal = (latitude, longitude) => {
        setLatitude(parseFloat(latitude));
        setLongitude(parseFloat(longitude));
        document.getElementById('my_modal_2').showModal()
    }

    const position = [latitude, longitude];




    const handleBookingCancel = (id) => {
        Swal.fire({
            title: "Cancel?",
            text: "Are you sure want to cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedData = {
                    status: "cancelled"
                }

                axiosSecure.put(`/bookings?id=${id}`, updatedData)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                text: "The booking has been cancelled.",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });
    }


    const handleBookingDeliver = (id) => {
        Swal.fire({
            title: "Delivered?",
            text: "Are you sure want to mark the booking as delivered?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedData = {
                    status: "delivered"
                }


                axiosSecure.put(`/bookings?id=${id}`, updatedData)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            axiosSecure.put(`/delivery/users?id=${currentUser?._id}`, { parcelDelivered: currentUser?.parcelDelivered + 1 })
                                .then(res => {
                                    if (res.data.modifiedCount > 0) {
                                        refetch();
                                        Swal.fire({
                                            position: "center",
                                            icon: "success",
                                            text: "The booking has been delivered.",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                    }
                                })

                        }
                    })



            }
        });
    }




    return <div className="container mx-auto">
        <DashboardSectionTitle heading="My Delivery List" subHeading="View and manage my delivery list" />


        <dialog id="my_modal_2" className="modal">
            <div className="modal-box min-w-[1080px] h-96">


                <MapContainer center={position} zoom={2} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <Marker position={position}>

                    </Marker>
                </MapContainer>



            </div>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>



        {
            bookings?.length > 0 ?

                <div>

                    <table className="table table-xs mt-10 ">
                        <thead>
                            <tr>
                                <th>Booked user name</th>
                                <th>Rec. name</th>
                                <th>Booked user phone</th>
                                <th>Req. delivery date</th>
                                <th>Appx.delivery date</th>
                                <th>Rec. phone</th>
                                <th>Rec. address</th>
                                <th>View Location</th>
                                <th>Cancel</th>
                                <th>Delivered</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                bookings?.map(booking => {
                                    return <tr key={booking._id}>
                                        <td>{booking?.name}</td>
                                        <td>{booking?.receiversName}</td>
                                        <td>{booking?.phone}</td>
                                        <td>{booking?.requestedDeliveryDate?.split('T')[0]}</td>
                                        <td>{booking?.approximateDeliveryDate?.split('T')[0]}</td>
                                        <td>{booking?.receiversPhone}</td>
                                        <td className="w-[50px]">{booking?.deliveryAddress}</td>
                                        <td><button onClick={() => handleOpenModal(booking.deliveryAddressLatitude, booking.deliveryAddressLongitude)} className="btn text-primary text-xl"><FaLocationDot /></button></td>
                                        <td><button disabled={booking.status === "cancelled" || booking.status === "delivered"} onClick={() => handleBookingCancel(booking._id)} className="btn text-red-500 text-xl"><MdOutlineCancel /></button></td>
                                        <td><button disabled={booking.status === "delivered" || booking.status === "cancelled"} onClick={() => handleBookingDeliver(booking._id)} className="btn text-green-500 text-xl"><IoCheckmarkDoneSharp /></button></td>
                                    </tr>
                                })
                            }
                        </tbody>





                    </table>


                </div>



                : <div className='text-center my-20 text-7xl'>
                    <span className="loading loading-spinner text-success w-[80px]"></span>
                </div>
        }







    </div>
}

export default DeliveryList