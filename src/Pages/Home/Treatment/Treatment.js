import React from 'react';
import treatment from "../../../assets/images/treatment.png"
import PrimaryButton from '../../../Components/PrimaryButton';

const Treatment = () => {
    return (
        <section className='ml-6 mx-5'>
            <div className="hero mt-40 ">
                <div className="hero-content flex-col lg:flex-row gap-28">
                    <img src={treatment} className="max-h-[576px] rounded-lg shadow-2xl" alt='' />
                    <div className='max-w-lg'>
                        <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                        <p className="py-6 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur asperiores blanditiis iste. Est excepturi, libero labore explicabo veniam dolorum tempore facere omnis voluptatibus in, qui adipisci, eos tempora molestiae quam eius culpa accusantium sunt? Vero deserunt qui sit officia possimus iusto aliquam dolor, eligendi ea maxime, quae magnam exercitationem et.</p>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Treatment;