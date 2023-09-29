import React from 'react';
import './About.css';
import { useTitle } from '../../../Hooks/UseTitle';

const About = () => {
  useTitle("About")
  return (
    <div className="container mt-">
      <div className="mission">
        <h2>Our Mission</h2>
        <p>At Doctor Portal, our mission is clear: to empower individuals to take control of their health and well-being. We believe that access to quality healthcare should be seamless, and we're committed to delivering innovative solutions that enhance your healthcare journey.</p>
      </div>
      <div className="team-image">
        <img src="https://t4.ftcdn.net/jpg/00/68/85/39/240_F_68853921_P5xTDmjlLF0jecPgrHbPWUJvSnflDcrS.jpg" alt="Doctor Portal Team" />
      </div>
      <div className="patient-centered">
        <h2>Patient-Centered Care</h2>
        <p>At Doctor Portal, you are at the center of everything we do. We understand that your health is deeply personal, and we treat it as such. Our approach is built on compassion, communication, and collaboration. We encourage you to be an active participant in your healthcare decisions, and we're here to provide the support and guidance you need.</p>
      </div>
      <div className="innovation">
        <h2>Innovation and Technology</h2>
        <p>We leverage the latest advancements in technology to simplify and enhance your healthcare experience. From telemedicine consultations to secure health records management, we're committed to providing you with state-of-the-art tools that put your health in your hands.</p>
      </div>
      <div className="community">
        <h2>Community Engagement</h2>
        <p>Doctor Portal is more than a healthcare platform; we are an integral part of the communities we serve. We are passionate about promoting health awareness, education, and accessibility. Through local health initiatives and partnerships, we actively contribute to the well-being of our community.</p>
      </div>
      <p>Thank you for choosing Doctor Portal as your healthcare partner. We look forward to accompanying you on your journey to a healthier and happier life.</p>
    </div>
  );
};

export default About;
