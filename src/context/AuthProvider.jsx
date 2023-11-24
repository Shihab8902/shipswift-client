import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/axios/useAxiosPublic";

export const UserContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const axiosPublic = useAxiosPublic();

    //Create a user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //Login a user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    //Login user with google
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }



    //Log out user
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }





    //Observe a user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {

            if (currentUser) {
                const userInfo = { email: currentUser?.email };
                axiosPublic.post("/jwt", userInfo)
                    .then(res => {
                        localStorage.setItem("access-token", res.data?.token);
                        setLoading(false);
                    })

            }
            else {
                localStorage.removeItem("access-token");
                setLoading(false);
            }
            setUser(currentUser);


        });

        return () => {
            return unSubscribe();
        }
    }, []);


    console.log(user);


    const userInfo = {
        user,
        loading,
        createUser,
        logOutUser,
        loginUser,
        signInWithGoogle
    }

    return <UserContext.Provider value={userInfo}>
        {children}
    </UserContext.Provider>
}

export default AuthProvider