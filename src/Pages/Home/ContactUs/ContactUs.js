import React from 'react';
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../Components/PrimaryButton';

const ContactUs = () => {
    return (
        <section className='mt-36'>
            <div className='min-h-[640px]'
                style={{ backgroundImage: `url(${appointment})` }}
            >
                <div className='grid justify-items-center content-center pt-28'>
                    <div className='text-center'>
                        <h2 className='text-lg font-bold text-[#19D3AE]'>Contact Us</h2>
                        <h4 className='text-4xl font-normal text-white'>Stay connected with us</h4>
                    </div>
                    <form className='mt-10 grid grid-cols-1 gap-5'>
                        <input type="text" placeholder="Email Address" className="input input-bordered mx-w-[450px]" />
                        <input type="text" placeholder="Subject" className="input input-bordered mx-w-[450px] " />
                        <textarea className="textarea textarea-bordered h-36 lg:w-[450px] sm:w-[220px]" placeholder="Your Message"></textarea>
                        <PrimaryButton>Submit</PrimaryButton>
                    </form>

                    
                </div>
            </div>
        </section>
    );
};

export default ContactUs;