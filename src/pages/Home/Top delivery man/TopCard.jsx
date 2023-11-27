import Aos from "aos";
import { useEffect } from "react";
import ReactStars from "react-rating-stars-component";

const TopCard = ({ deliveryMan }) => {

    useEffect(() => {
        Aos.init({
            duration: 1000
        });
    }, [])


    const { image, name, parcelDelivered, totalReview, totalReviewer } = deliveryMan;

    const averageReview = totalReview !== 0 ? totalReview / totalReviewer : 0
    return <div data-aos="flip-right" className='border p-5'>
        <img className='w-[60px] h-[60px] mx-auto rounded-full' src={image} alt="" />
        <h3 className='text-center font-semibold text-2xl mt-3'>{name}</h3>
        <div className="flex justify-center">
            <ReactStars
                count={5}
                edit={false}
                size={24}
                value={averageReview}
                activeColor="#ffd700"
            />
        </div>
        <p className="text-center text-xs">Parcel delivered: {parcelDelivered}</p>

    </div>
}

export default TopCard