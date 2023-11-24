import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: "http://localhost:9000"
})

const useAxiosSecure = () => {

    //Interceptor here

    return axiosSecure;
}

export default useAxiosSecure