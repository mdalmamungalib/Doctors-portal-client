import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import { useTitle } from '../../../Hooks/UseTitle';

const ManageReviews = () => {
    useTitle("DB-ManageReviews");
    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await fetch("https://doctors-portal-server-smoky-mu.vercel.app/review", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Berar ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });
    console.log("reviewData", reviews)

    if (isLoading) {
        return <Loading></Loading>
    };

    const handleDeleteReviews = reviews => {
        fetch(`https://doctors-portal-server-smoky-mu.vercel.app/deleteReviews/${reviews?._id}`, {
            method: "DELETE",
            headers: {
                authorization: `Berar ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success(`${reviews?.name} deleted successfully`);
                    refetch();
                };
            })
    }
    return (
        <div>
            <div className="overflow-x-auto grid justify-center mt-10">
                <h1 className='text-3xl font-bold pb-8'>Mange Reviews: {reviews.length}</h1>
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
                        reviews.map((review, i) => <tbody key={review?._id} className=''>
                            <tr>
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={review?.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div>{review?.name}</div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    {review?.specialty}
                                </td>
                                <th>
                                    <label htmlFor="confirmation-modal" className="btn btn-error btn-xs" onClick={() => handleDeleteReviews(review)}>Delete</label>
                                </th>
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
        </div>
    );
};

export default ManageReviews;