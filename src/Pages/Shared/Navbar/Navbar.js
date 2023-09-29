import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const { user, userLogOut } = useContext(AuthContext);

    const handleLogOutUser = () => {
        userLogOut()
            .then(() => {
                toast.error("User Sing Out Success Fully")
            })
            .catch(error => console.log(error))
    }

    const menuItem = <>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
        <li>
            <Link to="/appointment">Appointment</Link>
        </li>
        <li>
            <Link to="/reviews">Reviews</Link>
        </li>
        <li>
            <Link to="/contactUsFrom">Contact Us</Link>
        </li>
        {user?.uid ?
            <>
                <li>
                    <Link to="/dashBoard">Dash Board</Link>
                </li>
                <li>
                    <Link to="/login">
                        <button onClick={handleLogOutUser}>Sing Out</button>
                    </Link>
                </li>
            </>
            :

            <li>
                <Link to="/login">Login</Link>
            </li>
        }

    </>
    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                            <line y1="1" x2="20" y2="1" stroke="black" stroke-width="2" />
                            <line y1="8" x2="20" y2="8" stroke="black" stroke-width="2" />
                            <line y1="15" x2="20" y2="15" stroke="black" stroke-width="2" />
                        </svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-base font-bold">
                        {menuItem}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">Doctors Portal</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal text-base font-bold">
                    {menuItem}
                </ul>
            </div>
            <label htmlFor="dashboard-drawer" tabIndex={0} className="btn btn-ghost lg:hidden">
                <div className='btn'>
                    <p>Dash Board</p>
                </div>
            </label>
        </div>
    );
};

export default Navbar;