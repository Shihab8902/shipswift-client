import { useContext, useEffect, useState } from "react"
import DashboardSectionTitle from "../../../components/Section titles/DashboardSectionTitle"
import useGetSecure from "../../../hooks/tanstack/useGetSecure"
import { UserContext } from "../../../context/AuthProvider"
import { FaEdit } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { AiTwotoneDollar } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

const MyParcels = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { data } = useGetSecure(["bookings", user?.email], `/booking?email=${user.email}`);
    const [renderBookings, setRenderBookings] = useState([]);

    useEffect(() => {
        setRenderBookings(data);
    }, [data]);

    const { data: payments } = useGetSecure(["payments", user?.email], `/payments?email=${user?.email}`);




    const handleFilter = (e) => {
        const value = e.target.value;
        if (value === "all") {
            setRenderBookings(data);
        } else {
            const filtered = data.filter(item => item?.status === e.target.value);
            setRenderBookings(filtered);
        }


    }



    return <div>
        <DashboardSectionTitle heading="My Parcels" subHeading="Keep track all of your parcels at once" />

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


                    <table className="table table-xs mt-10">

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
                                        <td><button onClick={(() => navigate(`/dashboard/updateBooking/${booking._id}`))} disabled={!booking.status === "pending"} className=" btn text-green-600 bg-transparent ">{<FaEdit className="text-xl " />}</button></td>
                                        <td><button disabled={booking.status === "delivered"} className=" btn text-orange-600 bg-transparent ">{<GiStarsStack className="text-xl " />}</button></td>
                                        <td>{
                                            payments?.find(payment => payment.paymentId === booking._id) ? <p className="font-medium text-green-700">Paid</p> : <Link to="/dashboard/payment" state={{ totalPrice: booking?.calculatedDeliveryPrice, paymentId: booking?._id }}><button className=" btn text-blue-600 bg-transparent ">{<AiTwotoneDollar className="text-xl " />}</button></Link>
                                        }</td>
                                        <td><button className=" btn text-red-600 bg-transparent ">{<GiCancel className="text-xl " />}</button></td>
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