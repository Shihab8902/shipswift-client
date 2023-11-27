import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/axios/useAxiosPublic"
import TopCard from "./TopCard";




const TopDeliveryMan = () => {
    const axiosPublic = useAxiosPublic();

    const [topDeliveryMans, setTopDeliveryMans] = useState([]);

    useEffect(() => {
        axiosPublic.get("/topDeliveryMan")
            .then(res => setTopDeliveryMans(res.data));
    }, []);




    return <div className="my-20 container mx-auto px-5">
        <h3 className="text-center text-4xl font-semibold uppercase">Our top delivery mens</h3>
        <p className="mt-3 text-gray-500 text-center">Enjoy your reliable and easy parcel shipping with our delivery partners.</p>


        {
            topDeliveryMans.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
                {
                    topDeliveryMans?.map(deliveryMan => <TopCard key={deliveryMan._id} deliveryMan={deliveryMan} />)
                }
            </div> :
                <div>
                    <div className='text-center my-20 text-7xl'>
                        <span className="loading loading-spinner text-success w-[80px]"></span>
                    </div>
                </div>
        }


    </div>
}

export default TopDeliveryMan