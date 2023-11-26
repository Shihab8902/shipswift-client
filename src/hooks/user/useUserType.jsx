import { useContext } from "react"
import { UserContext } from "../../context/AuthProvider"
import useGetSecure from "../tanstack/useGetSecure";


const useUserType = () => {
    const { user } = useContext(UserContext);

    const { data: currentUser, isLoading } = useGetSecure(["user", user?.email], `/user?email=${user?.email}`);

    const userType = currentUser?.role;

    return { userType, isLoading };


}

export default useUserType