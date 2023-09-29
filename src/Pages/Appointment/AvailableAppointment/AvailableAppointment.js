import { format } from 'date-fns';
import React, { useState } from 'react';
import AppointmentOptions from './AppointmentOptions';
import AvailableAppointments from './AvailableAppointments';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

const AvailableAppointment = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, "PP")

    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ["appointmentOptions", date],
        queryFn: () => fetch(`https://doctors-portal-server-smoky-mu.vercel.app/appointmentOptions?date=${date}`)
            .then(res => res.json())
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='mt-10'>
            <div className='text-center text-2xl font-normal'>
                <h4 className=' mb-3 text-[#19D3AE] '>Available Services on {format(selectedDate, "PP")}</h4>
                <p className='text-[#939393]'>Please select a service.</p>
            </div>

            {/* AppointmentOptions */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center lg:mt-24'>
                {
                    appointmentOptions.map(option => <AppointmentOptions
                        key={option._id}
                        appointmentOptions={option}
                    ></AppointmentOptions>)
                }
            </div>
            <div className='lg:mt-28  hidden lg:block'>
                <h2 className='text-center text-xl font-normal text-[#19D3AE]'>Available slots for Teeth Orthodontics.</h2>
            </div>

            {/* Available slots  */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mt-20 mb-56'>
                {
                    appointmentOptions.map(option => <AvailableAppointments
                        key={option._id}
                        appointmentOptions={option}
                        setTreatment={setTreatment}
                    ></AvailableAppointments>)
                }
            </div>
            {treatment &&
                <BookingModal
                    treatment={treatment}
                    selectedDate={selectedDate}
                    setTreatment={setTreatment}
                    refetch={refetch}
                ></BookingModal>}
        </section>
    );
};

export default AvailableAppointment;