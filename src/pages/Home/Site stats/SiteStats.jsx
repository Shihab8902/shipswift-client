import CountUp from 'react-countup';
import useGetPublic from "../../../hooks/tanstack/useGetPublic";


const SiteStats = () => {

    const { data: bookingCalc } = useGetPublic(["stats"], `/admin/bookingCount`);
    const { data: usersCount } = useGetPublic(["usersCount"], `/users/total`);



    return <div className="container mx-auto flex-wrap px-5 py-10 bg-[#f9f9ed] flex justify-evenly">


        <div className="text-center">
            <h3 className="text-7xl text-green-500 font-medium">
                <CountUp duration={5} end={bookingCalc?.total} />
            </h3>
            <p className="my-2 font-semibold text-xl text-gray-500">Parcel Booked</p>
        </div>

        <div className="text-center">
            <h3 className="text-7xl text-green-500 font-medium">
                <CountUp duration={5} end={bookingCalc?.delivered} />
            </h3>
            <p className="my-2 font-semibold text-xl text-gray-500">Parcel Delivered</p>
        </div>

        <div className="text-center">
            <h3 className="text-7xl text-green-500 font-medium">
                <CountUp duration={5} end={usersCount?.totalUser} />
            </h3>
            <p className="my-2 font-semibold text-xl text-gray-500">Happy Customer</p>
        </div>


    </div>
}

export default SiteStats