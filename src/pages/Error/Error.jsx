import { useNavigate } from "react-router-dom"
import bg from '../../assets/images/404.png'


const Error = () => {

    const navigate = useNavigate();


    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 overflow-hidden">
            <div className="text-center">
                <img
                    src={bg}
                    alt="404 Not Found"
                    className="max-w-full mx-auto mb-4"
                />
                <h1 className="text-3xl font-bold text-red-500 mb-2">404 - Not Found</h1>
                <p className="text-gray-600 mb-4">The page you are looking for might be under construction.</p>
                <button onClick={(() => navigate("/"))} className="btn btn-primary">Go Home</button>
            </div>
        </div>
    )
}

export default Error