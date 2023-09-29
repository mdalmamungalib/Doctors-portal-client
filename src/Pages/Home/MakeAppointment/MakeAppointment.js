import React from 'react';
import doctor from '../../../assets/images/doctor-small.png';
import appointment from '../../../assets/images/appointment.png';
import PrimaryButton from '../../../Components/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section className='mt-40' style={{
            backgroundImage: `url(${appointment})`
        }}>
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctor} className="-mt-32  hidden lg:block lg:w-1/2" alt='' />
                    <div className='py-10 px-5'>
                        <h4 className='text-[#19D3AE] mb-5 text-lg font-bold'>Appointment</h4>
                        <h1 className="text-3xl font-bold text-white">Make an appointment Today</h1>
                        <p className="py-6 text-white">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates aut fuga, et molestias placeat delectus consequatur officiis dolore asperiores, modi soluta. Assumenda laborum voluptate impedit fugit! Ducimus laudantium suscipit et dolores, cumque autem aspernatur expedita atque mollitia explicabo numquam nulla, voluptatibus quidem? Hic dignissimos quisquam consequatur quasi, fugit sequi sapiente.</p>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;