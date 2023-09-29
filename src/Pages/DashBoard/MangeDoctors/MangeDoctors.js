import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';
import { useTitle } from '../../../Hooks/UseTitle';

const MangeDoctors = () => {
    useTitle("DB-ManageDoctors");
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            try {
                const res = await fetch("https://doctors-portal-server-smoky-mu.vercel.app/doctors", {
                    headers: {
                        authorization: `Berar ${localStorage.getItem("accessToken")}`
                    }
                })
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error)
            }
        }
    });

    const handleDelete = doctors => {
        fetch(`https://doctors-portal-server-smoky-mu.vercel.app/doctors/${doctors._id}`, {
            method: "DELETE",
            headers: {
                authorization: `Berar ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.error(`${doctors?.name} is deleted`);
                    refetch();
                }
            })
    };

    if (isLoading) {
        return <Loading></Loading>
    };
    return (
        <div>
            <div className="overflow-x-auto grid justify-center mt-10">
                <h1 className='text-3xl font-bold pb-8'>Mange Doctors: {doctors.length}</h1>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className=''>
                            <th></th>
                            <th>AVATAR</th>
                            <th>NAME</th>
                            <th>SPECIALITY</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    {
                        doctors.map((doctor, i) => <tbody key={doctor?._id} className=''>
                            <tr>
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={doctor?.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div>{doctor?.name}</div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    {doctor?.specialty}
                                </td>
                                <th>
                                    <label htmlFor="confirmation-modal" className="btn btn-error btn-xs" onClick={() => setDeletingDoctor(doctor)}>Delete</label>
                                </th>
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure you went to delete`}
                    message={`If you delete ${deletingDoctor?.name}. It cannot be undone.`}
                    handleDelete={handleDelete}
                    deleteButton="Delete"
                    deletingDoctor={deletingDoctor}
                >

                </ConfirmationModal>
            }
        </div>

    );
};

export default MangeDoctors;