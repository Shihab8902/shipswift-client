import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useContext, useEffect, useState } from 'react'

import useAxiosSecure from '../../../hooks/axios/useAxiosSecure';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/AuthProvider';

const CheckoutForm = ({ paymentInfo }) => {
    const { totalPrice, paymentId } = paymentInfo;

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionID, setTransactionID] = useState('');



    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (totalPrice) {
            axiosSecure.post("/create-payment-intent", { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        const { paymentIntent, error: confirmationError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "anonymous",
                    email: user?.email || "anonymous"
                }
            }
        });

        if (paymentIntent?.status === "succeeded") {
            setTransactionID(paymentIntent.id);
            const paymentInfo = {
                email: user?.email,
                name: user?.displayName,
                paymentId,
                amount: totalPrice,
                status: "paid"
            }


            const result = await axiosSecure.post("/payments", paymentInfo);
            if (result.data?.status === "paid") {

                navigate('/dashboard/paymentSuccess');

            }

        } else {
            setError(confirmationError.message)
        }








    }




    return (
        <form onSubmit={handleSubmit} className='flex flex-col justify-center  '>
            <h3 className='text-center uppercase text-4xl my-10'>Make Payment</h3>
            <CardElement className=' py-4 mx-10 px-5 border-2 rounded' />
            <p className='text-center my-3 text-red-500'>{error}</p>
            {
                transactionID && <p className='text-center my-3 text-green-500'>{"Payment succeed with transaction id: " + transactionID}</p>
            }
            <div className='text-center mt-6'>
                <button className='btn btn-primary text-white w-[400px]' type='submit' disabled={!stripe || !clientSecret}>Pay</button>
            </div>

        </form>
    )
}

export default CheckoutForm