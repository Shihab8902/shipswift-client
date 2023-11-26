import { useNavigate } from "react-router-dom";

import Confetti from 'react-confetti'


const PaymentSuccess = () => {

    const navigate = useNavigate();


    return (
        <div>

            <Confetti
                width={window.innerWidth || 500}
                height={window.innerHeight || 500}
            />



            <div className="flex items-center justify-center h-screen bg-green-200">
                <div className="bg-white p-8 rounded shadow-lg text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-16 w-16 text-green-500 mx-auto"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <h2 className="text-2xl font-semibold mb-4">Payment Successful!</h2>
                    <p className="text-gray-600">
                        Thank you for your payment. Your transaction was successful.
                    </p>
                    <button onClick={() => navigate("/dashboard/myParcels")} className="mt-6 bg-blue-500 text-white font-semibold px-4 py-2 rounded">
                        Go to list
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
