import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Review = ({ review }) => {
    const { name, specialty, photoURL, image, opinion } = review;

    return (
        <div className="card shadow-xl">
            <div className="card-body">
                <p>{opinion.slice(0, 150)}...</p>
                <div className='card-actions justify-start mt-12'>
                    <div className="avatar mr-5">
                        <div className="w-16 rounded-full ring ring-[#19D3AE] ring-offset-base-100 ring-offset-2">
                            {
                                image ? (<img src={image} alt='' />) : (<img src={photoURL} alt='' />)
                            }
                        </div>
                    </div>
                    <div>
                        <h2 className='text-xl font-semibold'>{name}</h2>
                        <p>{specialty}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
