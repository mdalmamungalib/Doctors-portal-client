import React from 'react';
import chair from '../../../assets/images/chair.png';
import bg from '../../../assets/images/bg.png';
import PrimaryButton from '../../../Components/PrimaryButton';

const Banner = () => {
    return (
        <section className='mx-5 '>
            <div style={{
                backgroundImage: `url(${bg})`,maxWidth: "1363px", minHeight: "838px"}
            } className="hero pt-52  flex items-stretch pl-14 pr-9 ">
                <div className="hero-content flex-col lg:flex-row-reverse px-5 items-stretch">
                   
                    <img src={chair} className="lg:w-[594px] lg:h-[355px]  rounded-lg shadow-2xl" alt='' />
                    
                    <div className='lg:mt-16'>
                        <h1 className="text-4xl font-bold">Your New Smile Starts Here</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;