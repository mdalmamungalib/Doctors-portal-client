import React from 'react';
import PrimaryButton from '../../../Components/PrimaryButton';

const AvailableAppointments = ({ appointmentOptions, setTreatment }) => {
    const { slots, name, price } = appointmentOptions;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
                <h2 className="text-xl font-semibold text-[#19D3AE]">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : "Try Another Day"}</p>
                <p>{slots.length} {slots.length > 1 ? "Spaces" : "Space"} Available</p>
                <p><small>price: ${price}</small></p>
                <div className="card-actions mt-11">
                    <label
                    disabled={slots.length === 0}
                    onClick={() => setTreatment(appointmentOptions)}
                    htmlFor="booking-modal" style={{ background: "linear-gradient(90deg, #19D3AE 0%, #0FCFEC 100%)" }} className="btn btn-primary text-white">Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AvailableAppointments;