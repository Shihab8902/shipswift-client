import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../axios/useAxiosPublic";



const useGetDataPublic = (queryKey, url) => {
    const axiosPublic = useAxiosPublic();

    const { data, isLoading, error } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const res = await axiosPublic.get(url);
            return res.data;
        }
    });



    return {
        data,
        isLoading,
        error,
    };
};

export default useGetDataPublic;
