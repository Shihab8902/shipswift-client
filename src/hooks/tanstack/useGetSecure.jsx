import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure"



const useGetSecure = (queryKey, url) => {

    const axiosSecure = useAxiosSecure();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const result = await axiosSecure.get(url);

            return result.data;
        }
    });


    return { data, isLoading, error, refetch };



}

export default useGetSecure