
import { useContext } from 'react'
import DashboardSectionTitle from '../../../components/Section titles/DashboardSectionTitle'
import useGetSecure from '../../../hooks/tanstack/useGetSecure'
import { UserContext } from '../../../context/AuthProvider'
import ReviewCard from './ReviewCard'

const MyReviews = () => {
    const { user } = useContext(UserContext);

    const { data: reviews = [] } = useGetSecure(["reviews", user?.email], `/review?email=${user?.email}`)
    console.log(reviews);


    return <div>
        <DashboardSectionTitle heading="My Reviews" subHeading={''} />

        {
            reviews.length > 0 ? <div className='grid lg:grid-cols-3 gap-6 mt-10'>
                {
                    reviews?.map(review => <ReviewCard key={review._id} reviewInfo={review} />)
                }
            </div> :
                <div className='my-20 text-center font-semibold text-4xl text-gray-500'>
                    <h3>You have no review yet!</h3>
                </div>
        }




    </div>
}

export default MyReviews