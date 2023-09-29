import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import { useTitle } from '../../../Hooks/UseTitle';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    useTitle("DB-AddDoctor");
    const navigate = useNavigate();

    const { data: specialties = [], isLoading } = useQuery({
        queryKey: ["specialty"],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-smoky-mu.vercel.app/appointmentSpecialty`);
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
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imageData.data.url
                    };
                    fetch("https://doctors-portal-server-smoky-mu.vercel.app/doctors", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization: `Berar ${localStorage.getItem("accessToken")}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`);
                            navigate("/dashBoard/MangeDoctor")
                        })
                }
            })
    };

    return (
        <div className='grid justify-center mt-12'>
            <h2 className="text-4xl font-bold">Add A Doctor</h2>
            <div className='card w-96 lg:w-[540px] bg-base-100 shadow-xl mt-10 p-10'>
                <form className='grid justify-center' onSubmit={handleSubmit(handleAddDoctor)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
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
                        <label className="label"> <span className="label-text">Upload Photo</span></label>
                        <input type="file" {...register("image", {
                            required: "Photo is Required"
                        })} className="file-input file-input-bordered w-full max-w-xs" />
                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                    </div>

                    <input className='btn btn-accent w-full mt-4' value="Add Doctor" type="submit" />
                </form>
            </div>
        </div>
    );
};


/**
 * Three places to store images
 * 1. Third party image hosting server 
 * 2. File system of your server
 * 3. mongodb (database)
*/

export default AddDoctor;