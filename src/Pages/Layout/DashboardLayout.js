import React, { useContext } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/UseAdmin';
import { useTitle } from '../../Hooks/UseTitle';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    console.log("user email",user?.email)
    const [isAdmin] = useAdmin(user?.email);
    useTitle("DashBoard")
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><Link to="/dashBoard">My Appointment</Link></li>
                        <li><Link to="/dashBoard/review">Add Review</Link></li>
                        {
                            isAdmin && (
                                <>
                                    <li><Link to="/dashBoard/allUsers">All Users</Link></li>
                                    <li><Link to="/dashBoard/addDoctor">Add Doctor</Link></li>
                                    <li><Link to="/dashBoard/MangeDoctor">Manage Doctor</Link></li>
                                    <li><Link to="/dashBoard/MangeReviews">Manage Reviews</Link></li>
                                </>
                            )
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;