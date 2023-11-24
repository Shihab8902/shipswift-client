
import useGetPublic from "../../../hooks/tanstack/useGetPublic"
import { AiOutlineSafety } from "react-icons/ai";
import { BsSpeedometer2 } from "react-icons/bs";
import { MdOutlineTrackChanges } from "react-icons/md";
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Aos from "aos";

const Features = () => {

    const { data: features = [] } = useGetPublic(["features"], "/features");


    // initialize aos
    useEffect(() => {
        Aos.init({
            duration: 600
        })
    }, [])

    return <div data-aos="fade-up" className="my-20 p-5 container mx-auto">
        {
            features.length > 0 ? <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">



                <div>
                    <p className=" text-7xl text-green-600"><AiOutlineSafety /></p>
                    <h4 className="text-2xl font-semibold">{features?.[0].title}</h4>
                    <p className="text-gray-500  mt-5 text-justify leading-7">{features?.[0].description}</p>
                </div>

                <div>
                    <p className=" text-7xl text-green-600"><BsSpeedometer2 /></p>
                    <h4 className="text-2xl font-semibold">{features?.[1].title}</h4>
                    <p className="text-gray-500  mt-5 text-justify leading-7">{features?.[1].description}</p>
                </div>

                <div>
                    <p className=" text-7xl text-green-600"><MdOutlineTrackChanges /></p>
                    <h4 className="text-2xl font-semibold">{features?.[2].title}</h4>
                    <p className="text-gray-500  mt-5 text-justify leading-7">{features?.[2].description}</p>
                </div>











            </div> : ""
        }
    </div>


}

export default Features