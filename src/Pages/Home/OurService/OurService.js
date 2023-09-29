import React from 'react';
import cavity from '../../../assets/images/cavity.png'
import fluoride from '../../../assets/images/fluoride.png'
import whitening from '../../../assets/images/whitening.png'

const OurService = () => {
    return (
        <div className='mx-5'>
            <div className='mt-20'>
                <h1 className="text-center text-[#19D3AE] text-2xl font-bold ">Our Service</h1><br/>
                <p className='text-center text-4xl'>Services We Provide</p>
            </div>
            <div className='grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-20'>
                <div className='grid justify-items-center content-center max-w-md h-80 rounded-3xl bg-[#eff0f6] shadow-lg shadow-[3px 4px 10px 2px rgba(0, 0, 0, 0.05)]'>
                    <figure>
                        <img src={fluoride} alt="" />
                    </figure>
                    <div className='text-center px-11 mt-7'>
                        <h1 className='text-xl mb-3'>Cavity Filling</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, eaque!</p>
                    </div>
                </div>
                <div className='grid justify-items-center content-center max-w-md h-80 rounded-3xl bg-[#eff0f6] shadow-lg shadow-[3px 4px 10px 2px rgba(0, 0, 0, 0.05)]'>
                    <figure>
                        <img src={cavity} alt="" />
                    </figure>
                    <div className='text-center px-11 mt-7'>
                        <h1 className='text-xl mb-3'>Teeth Whitening</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, eaque!</p>
                    </div>
                </div>
                <div className='grid justify-items-center content-center max-w-md h-80 rounded-3xl bg-[#eff0f6] shadow-lg shadow-[3px 4px 10px 2px rgba(0, 0, 0, 0.05)]'>
                    <figure>
                        <img src={whitening} alt="" />
                    </figure>
                    <div className='text-center px-11 mt-7'>
                        <h1 className='text-xl mb-3'>Fluoride Treatment</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, eaque!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurService;