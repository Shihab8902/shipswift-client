import axios from 'axios'

const axiosPublic = axios.create({
    baseURL: "https://shipswift-shihab8902.vercel.app"
});

const useAxiosPublic = () => {
    return axiosPublic;
}

export default useAxiosPublic