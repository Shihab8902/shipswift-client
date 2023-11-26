import DashboardSectionTitle from "../../../components/Section titles/DashboardSectionTitle"
import useGetSecure from "../../../hooks/tanstack/useGetSecure"


const AllDeliveryMan = () => {

    const { data: deliveryMans = [] } = useGetSecure(["deliveryMans"], `/deliveryMans`);

    console.log(deliveryMans);


    return <div>
        <DashboardSectionTitle heading="All Delivery Man" subHeading="View and manage all delivery man" />




        <div className="overflow-x-auto">

            <table className="table table-lg mt-10">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Delivered parcel</th>
                        <th>Average review</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        deliveryMans?.map(deliveryMan => {

                            const averageReview = deliveryMan.totalReview !== 0 ? deliveryMan.totalReview / deliveryMan.totalReviewer : 0

                            return <tr className="my-5 " key={deliveryMan._id}>
                                <td>{deliveryMan.name}</td>
                                <td>{deliveryMan.phone}</td>
                                <td>{deliveryMan.parcelDelivered}</td>
                                <td>{averageReview}</td>

                            </tr>
                        })
                    }
                </tbody>

            </table>

        </div>




    </div>
}

export default AllDeliveryMan