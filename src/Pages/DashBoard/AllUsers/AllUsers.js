import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import { useTitle } from '../../../Hooks/UseTitle';

const AllUsers = () => {
    useTitle("DB-AllUsers");

    const { data: allUsers = [], isLoading, refetch } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await fetch("https://doctors-portal-server-smoky-mu.vercel.app/allUsers", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json();
            return data;

        }
    });
    


    if (isLoading) {
        return <Loading></Loading>
    };

    const handleMakeAdmin = id => {
        fetch(`https://doctors-portal-server-smoky-mu.vercel.app/allUsers/admin/${id}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.modifiedCount > 0) {
                    toast.success("Make admin success fully");
                    refetch();
                }
            })
    };

    const handleDeleteUser = id => {
        fetch(`https://doctors-portal-server-smoky-mu.vercel.app/deleteUser/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.error(` is deleted`);
                    refetch();
                }
            })
    };
    return (
        <div>
            {/* table */}
            <div className="overflow-x-auto lg:ml-10">
                <h1 className='text-3xl font-bold pb-8'>All Users</h1>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allUsers.map((user, i) =>
                                <tr key={user?._id}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                {user?.photoURL ? (
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={user?.photoURL} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                ) : (
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNa8QCSDzzexFjhnpHPmHLRZQzXFPStVORDg&usqp=CAU" alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold">{user?.name}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user?.email}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                    </td>
                                    <th>
                                        {user?.role !== "admin" && <button onClick={() => handleMakeAdmin(user?._id)} className="btn btn-accent">Make Admin</button>}
                                    </th>
                                    <th>
                                        <button onClick={() => handleDeleteUser(user._id)} className="btn btn-accent">Remover User</button>
                                    </th>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;