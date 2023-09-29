import React from 'react';
import quote from '../../../assets/icons/quote.svg';
import Review from './Review';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

const Testimonial = () => {
    const {data: reviews = [], isLoading} = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await fetch("https://doctors-portal-server-smoky-mu.vercel.app/review", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json();
            return data;

        }
    })

    console.log(reviews)

    if (isLoading) {
        return <Loading></Loading>
    };
    return (
        <section className='mt-14 mx-5'>
            <div className='flex justify-between'>
                <div className='mt-5'>
                    <h2 className='text-xl text-[#19D3AE] font-bold'>Testimonial</h2>
                    <h4 className='text-4xl font-normal'>What Our Patients Says</h4>
                </div>
                <div>
                    <figure>
                        <img className='w-24 lg:w-48' src={quote} alt="" />
                    </figure>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 justify-items-center mt-36 px-5'>
                {
                    reviews.slice(0, 3).map(review => <Review
                        key={review._id}
                        review={review}
                    ></Review>)
                }
            </div>
        </section>
    );
};

export default Testimonial;