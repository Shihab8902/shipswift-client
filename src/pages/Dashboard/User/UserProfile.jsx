import { useContext, useState } from "react"
import { UserContext } from "../../../context/AuthProvider"
import useAxiosSecure from "../../../hooks/axios/useAxiosSecure";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/axios/useAxiosPublic";



const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [newImage, setNewImage] = useState(null);
    const [imageLink, setImageLink] = useState(null);

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleImageChange = e => {
        const file = e.target.files[0];
        setImageLink(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setNewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleUploadImage = async () => {
        const hostingAPIKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
        const imageData = { image: imageLink };
        const result = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${hostingAPIKey}`, imageData, {
            headers: {
                "content-Type": "multipart/form-data"
            }
        });

        if (result.data.success) {
            const photoURL = result.data.data.display_url;
            updateProfile(user, {
                photoURL: photoURL,

            })
                .then(() => {
                    axiosSecure.put(`/users?email=${user?.email}`, { image: photoURL })
                        .then(() => {

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                text: "Your account has been registered successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate("/");

                        })

                })
        }


    }

    return <div>

        <div className="flex justify-center ">
            <div className="text-center bg-gray-100 py-10 px-14 rounded-lg">
                <img className="w-[200px] mx-auto h-[200px] rounded-full" src={newImage || user?.photoURL} alt="" />
                <input onChange={handleImageChange} type="file" accept="image/*" className="file-input my-3 file-input-bordered file-input-primary w-full max-w-xs" />
                <h3 className="my-3 text-xl font-semibold">{user?.displayName}</h3>
                <p className="font-medium text-gray-500 mb-5">{user?.email}</p>
                {
                    imageLink && <button onClick={handleUploadImage} className="btn btn-primary">Update image</button>
                }
            </div>
        </div>


    </div >
}

export default UserProfile