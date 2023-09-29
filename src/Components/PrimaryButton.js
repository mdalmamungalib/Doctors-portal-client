import React from 'react';

const PrimaryButton = ({ children }) => {
    return (
        <button style={{ background: "linear-gradient(90deg, #19D3AE 0%, #0FCFEC 100%)" }} className="btn btn-primary text-white">{children}</button>
    );
};

export default PrimaryButton;