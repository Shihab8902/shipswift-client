
import DashboardSectionTitle from "../../../components/Section titles/DashboardSectionTitle";
import useGetSecure from "../../../hooks/tanstack/useGetSecure"
import { TbTruckDelivery } from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";
import useUserType from "../../../hooks/user/useUserType";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/axios/useAxiosPublic";
import useAxiosSecure from "../../../hooks/axios/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const [totalUser, setTotalUser] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const userPerPage = 5;
    const numberOfPages = Math.ceil(totalUser / userPerPage);

    const pages = [...Array(numberOfPages).keys()];

    const { data: users = [], refetch } = useGetSecure(["users"], `/users?skip=${currentPage * userPerPage}&limit=${userPerPage}`);

    useEffect(() => {
        refetch();
    }, [currentPage]);

    useEffect(() => {
        axiosPublic.get("/users/total")
            .then(res => setTotalUser(res.data?.totalUser));
    }, [users, axiosPublic]);



    const handleMakeDeliveryMan = (email, name) => {
        Swal.fire({
            title: "Delivery man?",
            text: `Are you sure want to make ${name} a delivery man?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/admin/users?email=${email}&role=deliveryMan`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                text: `${name} is now assigned as delivery man!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }

                    })
            }
        });
    }


    const handleMakeAdmin = (email, name) => {
        Swal.fire({
            title: "Admin?",
            text: `Are you sure want to make ${name} an admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/admin/users?email=${email}&role=admin`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                text: `${name} is now assigned as admin!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }

                    })
            }
        });
    }



    return <div>
        <DashboardSectionTitle heading="All users" subHeading="View and  manage all the users" />


        {
            users.length > 0 ? <div className="overflow-x-auto">
                <table className="table table-xs mt-10">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Booked parcel</th>
                            <th>Total spend</th>
                            <th>Make delivery man</th>
                            <th>Make admin</th>
                        </tr>
                    </thead>


                    <tbody>
                        {
                            users?.map(user => {
                                return <tr className="my-5 " key={user.user._id}>
                                    <td className="text-left">{user.user.name}</td>
                                    <td>{user.user.phone || "unknown"}</td>
                                    <td >{user.numberOfParcelBooked}</td>
                                    <td >{user.totalPrice}</td>
                                    <td ><button onClick={() => handleMakeDeliveryMan(user.user.email, user.user.name)} disabled={user.user.role === "admin" || user.user.role === "deliveryMan"} className=" btn text-green-600 bg-transparent ">{<TbTruckDelivery className="text-xl " />}</button></td>
                                    <td ><button onClick={() => handleMakeAdmin(user.user.email, user.user.name)} disabled={user.user.role === "admin"} className=" btn text-green-600 bg-transparent ">{<GrUserAdmin className="text-xl " />}</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div> : <div className='text-center my-20 text-7xl'>
                <span className="loading loading-spinner text-success w-[80px]"></span>
            </div>
        }

        <div className="text-center mt-10">

            <button className="border border-gray-500 px-3 py-2 font-medium rounded-tl-md rounded-bl-md" onClick={() => {
                if (currentPage > 0) {
                    setCurrentPage(currentPage - 1);
                }
            }}>Prev</button>


            {
                pages?.map(page => <button
                    key={page}
                    className={`border py-2 px-3 font-medium border-gray-500   ${currentPage === page ? "bg-gray-500 text-white" : undefined}`}
                    onClick={() => {
                        setCurrentPage(page);
                    }}
                >{page}</button>)
            }


            <button className="border border-gray-500 px-3 py-2 font-medium rounded-tr-md rounded-br-md" onClick={() => {
                if (currentPage < pages.length - 1) {
                    setCurrentPage(currentPage + 1)
                }
            }}>Next</button>
        </div>
    </div>
}

export default AllUsers