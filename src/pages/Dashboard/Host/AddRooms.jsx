import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
// import useMutation from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRooms = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const { user } = useAuth();
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState('Upload image')
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    //Date range handler
    const handleDates = item => {
        setDates(item.selection)
    }


    const { mutateAsync } = useMutation({
        mutationFn: async roomData => {
            const { data } = await axiosSecure.post('/room', roomData)
            return data
        },
        onSuccess: () => {
            toast.success('Room Added Successfully!!')
            navigate('/dashboard/my-listings')
            setLoading(false)
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const form = e.target
        const location = form.location.value
        const category = form.category.value
        const title = form.title.value
        const to = dates.endDate
        const from = dates.startDate
        const price = form.price.value
        const guests = form.total_guest.value
        const bathrooms = form.bathrooms.value
        const description = form.description.value
        const bedrooms = form.bedrooms.value
        const image = form.image.files[0]
        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email
        }
        try {
            const image_url = await imageUpload(image)
            const roomData = {
                location,
                category,
                title,
                to,
                from,
                price,
                guests,
                bathrooms,
                description,
                bedrooms,
                host,
                image: image_url
            }
            // console.table(roomData)

            // Post request to server
            await mutateAsync(roomData)
        }
        catch (err) {
            console.log(err);
            toast.error(err.message)
            setLoading(false)
        }
    }

    // handle image change
    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }

    return (
        <div>
            <Helmet>Add Room | Dashboard</Helmet>
            {/* From */}
            <AddRoomForm
                dates={dates}
                handleDates={handleDates}
                handleSubmit={handleSubmit}
                setImagePreview={setImagePreview}
                imagePreview={imagePreview}
                handleImage={handleImage}
                imageText={imageText}
                loading={loading}
            ></AddRoomForm>
        </div>
    );
};

export default AddRooms;