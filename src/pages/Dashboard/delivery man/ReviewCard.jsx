
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ reviewInfo }) => {
    const { image, name, givingDate, review, feedback } = reviewInfo;
    return (
        <div className='border px-5 pt-10 pb-5'>
            <img className='w-[100px] h-[100px] rounded-full mx-auto' src={image} alt="" />
            <div>
                <h3 className='text-center font-semibold text-xl my-3'>{name}</h3>

                <div className="flex justify-center gap-2 items-center">
                    <ReactStars
                        count={5}
                        value={review}
                        edit={false}
                        half={true}
                        size={24}
                        activeColor="gold"
                    />
                    {review}
                </div>
                <p className="my-3 text-center">{feedback}</p>
                <p className="flex justify-end mt-5 text-xs text-gray-500">Reviewed in: {givingDate?.split('T')[0]}</p>
            </div>
        </div>
    )
}

export default ReviewCard