import CountUp from 'react-countup';
import useGetPublic from "../../../hooks/tanstack/useGetPublic";
import { useEffect, useRef, useState } from 'react';




const SiteStats = () => {

    const { data: bookingCalc } = useGetPublic(["stats"], `/admin/bookingCount`);
    const { data: usersCount } = useGetPublic(["usersCount"], `/users/total`);

    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef(null);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, []);




    return <div ref={targetRef} className="container mx-auto flex-wrap px-5 py-10 bg-[#f9f9ed] flex justify-evenly">


        <div className="text-center">

            <h3 className="text-7xl text-green-500 font-medium">
                {isVisible && <CountUp start={0} end={bookingCalc?.total} duration={5} />}
            </h3>
            <p className="my-2 font-semibold text-xl text-gray-500">Parcel Booked</p>
        </div>

        <div className="text-center">
            <h3 className="text-7xl text-green-500 font-medium">
                {isVisible && <CountUp start={0} end={bookingCalc?.delivered} duration={5} />}

            </h3>
            <p className="my-2 font-semibold text-xl text-gray-500">Parcel Delivered</p>
        </div>

        <div className="text-center">
            <h3 className="text-7xl text-green-500 font-medium">
                {isVisible && <CountUp start={0} end={usersCount?.totalUser} duration={5} />}
            </h3>
            <p className="my-2 font-semibold text-xl text-gray-500">Happy Customer</p>
        </div>


    </div>
}

export default SiteStats