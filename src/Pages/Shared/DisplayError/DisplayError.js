import React, { useContext } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const DisplayError = () => {
    const { userLogOut } = useContext(AuthContext);
    const error = useRouteError();
    const handleLogOutUser = () => {
        userLogOut()
            .then(() => {
                toast.error("User Sing Out Success Fully")
            })
            .catch(error => console.log(error))
    };
    return (
        <div>
            <h1 className='text-red-600'>Oops something went wrong !!!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <p>Please <Link to="/login">
                <button className='btn btn-sm btn-error' onClick={handleLogOutUser}>Sing Out</button>
            </Link></p>
        </div>
    );
};

export default DisplayError;