import React from 'react';
import Banner from '../Banner/Banner';
import OurService from '../OurService/OurService';
import Info from '../Info/Info';
import Treatment from '../Treatment/Treatment';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Testimonial from '../Testimonial/Testimonial';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <Info></Info>
            <OurService></OurService>
            <Treatment></Treatment>
            <MakeAppointment></MakeAppointment>
            <Testimonial></Testimonial>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;