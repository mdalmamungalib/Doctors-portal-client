import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { useTitle } from '../../../Hooks/UseTitle';

const ReviewFrom = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [preview, setPreview] = useState("")
    const { user } = useContext(AuthContext);
    const { displayName, email, photoURL } = user;

    const navigate = useNavigate();
    useTitle("DBReviewFrom")

    const { data: specialties = [], isLoading } = useQuery({
        queryKey: ["specialty"],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-smoky-mu.vercel.app/appointmentSpecialty`, {
                method: "POST",
                headers: {
                    authorizationToken: `Berar ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    };


    const handleAddDoctor = data => {
        console.log(data)
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=ea377c236c2ece01332f63dce96763d1`;
        console.log(url)
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const review = {
                        name: displayName,
                        email: email,
                        specialty: data.specialty,
                        opinion: data.opinion,
                        image: imageData.data.url,
                        photoURL: photoURL
                    };
                    console.log(review)
                    fetch("https://doctors-portal-server-smoky-mu.vercel.app/review", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization: `Berar ${localStorage.getItem("accessToken")}`
                        },
                        body: JSON.stringify(review)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${displayName} is review added successfully`);
                            navigate("/dashBoard/MangeReviews");
                        })
                }
            })
    };

    const handleImageChange = image => {
        setPreview(window.URL.createObjectURL(image));
    }

    return (
        <div className='grid justify-center mt-12'>
            <h2 className="text-4xl font-bold">Add A Review</h2>
            <div className='card w-96 lg:w-[540px] bg-base-100 shadow-xl mt-10 p-10'>
                <div className="avatar grid justify-center">
                    <div className="w-24 rounded-full">
                    {
                        preview ? (<img src={preview} alt='' />) : (<img src="https://t4.ftcdn.net/jpg/05/97/47/95/240_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg" alt='' />)
                    }
                    </div>
                </div>
                <form className='grid justify-center' onSubmit={handleSubmit(handleAddDoctor)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" value={displayName} disabled {...register("name")} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" value={email} disabled {...register("email")} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Specialty</span></label>
                        <select
                            {...register("specialty", {
                                required: "specialty is Required"
                            })}
                            className="select select-bordered w-full max-w-xs">
                            {
                                specialties.map(specialty => <option key={specialty?._id} value={specialty?.name}>{specialty?.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Opinion</span></label>
                        <textarea
                            {...register("opinion", {
                                required: "your opinion"
                            })}
                            className="textarea textarea-bordered" placeholder="Opinion"></textarea>
                        {errors.opinion && <p className='text-red-500'>{errors.opinion.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Upload Photo</span></label>
                        <input type="file" {...register("image", {
                            required: "Photo is Required"
                        })}
                            onChange={event => {
                                handleImageChange(event.target.files[0]);
                            }}
                            className="file-input file-input-bordered w-full max-w-xs" />
                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                    </div>

                    <input className='btn btn-accent w-full mt-4' value="Add Doctor" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default ReviewFrom;