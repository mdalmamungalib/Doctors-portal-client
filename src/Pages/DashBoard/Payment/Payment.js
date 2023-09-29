import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckoutFrom from './CheckoutFrom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Loading from '../../Shared/Loading/Loading';
import { useTitle } from '../../../Hooks/UseTitle';

const Payment = () => {
    useTitle("Payment");
    const booking = useLoaderData();
    const navigation = useNavigation();
    const { treatment, slot, price, appointmentDate, patient } = booking;
    const stripePromise = loadStripe("pk_test_51NmrjxHPZpXZKM21LhevOBg9Oy9Wdg59URW0fhvj2DXdL2ZCJe14kIHEmxZJ3py6nWjDdqbWWjIn6vFzowWAGQYR00chLshRN2");

    if (navigation.state === "loading") {
        return <Loading></Loading>
    }
    return (
        <div className='grid justify-center mt-10'>
            <div className="card w-96 grid justify-center">
                <div className="card-body gap-3">
                    <h2 className="card-title text-[#3CBCA2] text-base font-bold">Hello, {patient}</h2>
                    <h1 className='text-xl font-bold'>Please Pay for {treatment}</h1>
                    <p>Your Appointment: <span className='text-[#F0AA22] text-base font-semibold'>{appointmentDate}</span> at <p>{slot}</p></p>
                    <h1 className='text-xl font-bold'>Please Pay: ${price}</h1>
                    <hr />
                    <div className='mt-5 '>
                        <Elements stripe={stripePromise}>
                            <CheckoutFrom booking={booking}></CheckoutFrom>
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;