import React from 'react';

const AppointmentOptions = ({ appointmentOptions }) => {
    const { name } = appointmentOptions;
    return (
            <div className="card w-96 bg-base-100 shadow-xl hidden lg:block">
                <div className="card-body text-center text-xl font-semibold text-[#19D3AE]">
                    <h1>{name}</h1>
                </div>
            </div>
    );
};

export default AppointmentOptions;