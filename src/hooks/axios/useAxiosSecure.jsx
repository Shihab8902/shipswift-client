import axios from 'axios'
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/AuthProvider';


export const axiosSecure = axios.create({
    baseURL: "https://shipswift-shihab8902.vercel.app"
})

const useAxiosSecure = () => {

    const { logOutUser } = useContext(UserContext);
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("access-token");
        config.headers.authorization = `bearer ${token}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            logOutUser();
            navigate("/login");
        }
    })


    return axiosSecure;
}

export default useAxiosSecure