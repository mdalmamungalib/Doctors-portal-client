import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import { Link } from 'react-router-dom';
import { useTitle } from '../../../Hooks/UseTitle';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);
    useTitle("DBMyAppointment");
    const url = `https://doctors-portal-server-smoky-mu.vercel.app/bookings?email=${user?.email}`;
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
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
    return (
        <div>
            {/* tabile */}
            <div className="overflow-x-auto grid justify-center mt-10">
                <h3 className='text-3xl font-bold pb-8'>My Appointments</h3>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className=''>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) => <tr key={booking?._id}>
                                <th>{i + 1}</th>
                                <td>{booking?.patient}</td>
                                <td>{booking?.treatment}</td>
                                <td>{booking?.appointmentDate}</td>
                                <td>{booking?.slot}</td>
                                <td>${booking?.price}</td>
                                <td>{
                                    booking.price && !booking.paid && <Link
                                        to={`/dashBoard/payment/${booking?._id}`}>
                                        <button className='btn btn-primary btn-sm'>Pay</button>
                                    </Link>
                                }
                                    {
                                        booking?.price && booking?.paid && <>
                                            <span className='text-green-600'>Paid</span>
                                            <p className='font-bold'>{booking?.transactionId}</p>
                                        </>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;