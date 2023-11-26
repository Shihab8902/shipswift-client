import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm';
import { useLocation } from 'react-router-dom';

const Payment = () => {

    const location = useLocation();


    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm paymentInfo={location?.state} />
        </Elements>
    )
}

export default Payment