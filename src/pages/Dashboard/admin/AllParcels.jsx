import { useState } from "react";
import DashboardSectionTitle from "../../../components/Section titles/DashboardSectionTitle"
import useGetSecure from "../../../hooks/tanstack/useGetSecure"

import { MdManageHistory } from "react-icons/md";
import useAxiosSecure from "../../../hooks/axios/useAxiosSecure";
import Swal from "sweetalert2";

const AllParcels = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { data: bookings = [], refetch } = useGetSecure(["bookings"], `/bookings?startDate=${startDate}&endDate=${endDate}`);
    const { data: deliveryMans = [] } = useGetSecure(["deliveryMans"], "/deliveryMans");

    const [selectedParcel, setSelectedParcel] = useState('');
    const [deliveryMan, setDeliveryMan] = useState('');
    const [appxDeliveryDate, setAppxDeliveryDate] = useState('');



    const axiosSecure = useAxiosSecure();





    const handleModalOpen = (id) => {
        setSelectedParcel(id);
        document.getElementById('my_modal_3').showModal()
    }







    const handleDeliveryManAssign = () => {
        const updatedData = {
            status: "on the way",
            approximateDeliveryDate: appxDeliveryDate,
            deliveryManId: deliveryMan
        }

        axiosSecure.put(`/bookings?id=${selectedParcel}`, updatedData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        text: "The booking has been modified successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    const handleSearch = () => {
        refetch();
    }




    return <div>
        <DashboardSectionTitle heading="All Parcels" subHeading="View and manage all parcels" />



        <div className="container mx-auto mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Start Date</span>
                    </label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">End Date</span>
                    </label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>


            <button
                className="btn btn-primary mt-4 w-full"
                onClick={handleSearch}
                disabled={!startDate || !endDate}
            >
                Search bookings
            </button>
        </div>









        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <select defaultValue={""} onChange={(e) => setDeliveryMan(e.target.value)} className="w-full border-2 outline-none my-3 py-3 px-5 rounded-lg cursor-pointer">
                    <option disabled value="">Select a delivery man</option>
                    {
                        deliveryMans?.map(deliveryMan => {
                            return <option key={deliveryMan._id} value={deliveryMan._id}>{deliveryMan._id}</option>
                        })
                    }
                </select>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Approximate delivery date</span>
                    </label>
                    <input onChange={(e) => setAppxDeliveryDate(e.target.value)} type="date" className="input input-bordered w-full cursor-pointer" />
                </div>

                <form method="dialog">
                    <button onClick={handleDeliveryManAssign} className="btn btn-primary w-full mt-5">Assign</button>
                </form>


            </div>
        </dialog>

        <div className="overflow-x-auto">

            <table className="table table-xs mt-10">
                <thead>
                    <tr>
                        <th>Customer name</th>
                        <th>Customer image</th>
                        <th>Booking Date</th>
                        <th>Req. Delivery Date</th>
                        <th>Cost</th>
                        <th>Status</th>
                        <th>Manage</th>
                    </tr>
                </thead>





                <tbody>
                    {
                        bookings?.map(booking => {
                            return <tr className="my-5 " key={booking._id}>
                                <td >{booking.name}</td>
                                <td>
                                    <img className="w-[50px] h-[50px] rounded-lg" src={booking.image} alt="" />
                                </td>
                                <td>{booking.bookingDate?.split("T")[0]}</td>
                                <td>{booking.requestedDeliveryDate?.split("T")[0]}</td>
                                <td>{booking.calculatedDeliveryPrice}</td>
                                <td className="text-primary">{booking.status}</td>
                                <td>
                                    <button onClick={() => handleModalOpen(booking._id)} disabled={booking.status === "delivered" || booking.status === "cancelled"} className="text-3xl btn text-green-600"><MdManageHistory /></button>
                                </td>

                            </tr>
                        })
                    }
                </tbody>
            </table>

        </div>
    </div >
}

export default AllParcels