import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    const location = useLocation();

    if (loading) {
        return <div className='text-center my-20 text-7xl'>
            <span className="loading loading-spinner text-success w-[80px]"></span>
        </div>
    }


    if (user) {
        return children;
    }



    return <Navigate state={location?.pathname} to="/login"></Navigate>
}

export default PrivateRoute