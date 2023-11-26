import { useContext } from 'react'

import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/AuthProvider';
import useUserType from '../user/useUserType';

const AdminRoute = ({ children }) => {
    const { userType, isLoading: isAdminLoading } = useUserType();
    const { user, loading } = useContext(UserContext);
    const admin = userType === "admin";

    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className='text-center my-20 text-7xl'>
            <span className="loading loading-spinner text-success w-[80px]"></span>
        </div>
    }


    if (user && admin) {
        return children;
    }



    return <Navigate state={location?.pathname} to="/"></Navigate>



}

export default AdminRoute