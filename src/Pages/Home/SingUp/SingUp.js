import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import { GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../../Hooks/useToken';
import { useTitle } from '../../../Hooks/UseTitle';

const SingUp = () => {
    const { createUser, updateUser, googleLogin } = useContext(AuthContext);
    const [singUpError, setSingUpError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [createdUserEmail, setCreatedUserEmail] = useState("");

    const from = location.state?.from?.pathname || "/";

    const [token] = useToken(createdUserEmail);
    if (token) {
        navigate(from, { replace: true });
    }
    useTitle("SingUp");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSingUp = data => {
        console.log(data)
        setSingUpError("");
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast.success("Create User Success Fully");
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data?.name, data?.email, data?.photoURL);
                    })
                    .catch(error => console.log(error))
                console.log(user);

            })
            .catch(error => {
                console.log(error);
                setSingUpError(error.message)
            })
    };

    const handleGoogleLogin = () => {
        googleLogin(provider)
            .then(result => {
                const user = result.user;
                saveUser(user?.displayName, user?.email, user?.photoURL)
                console.log(user);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const saveUser = (name, email, photoURL) => {
        const user = { name, email, photoURL };
        fetch("https://doctors-portal-server-smoky-mu.vercel.app/users", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log("save user", data);
                setCreatedUserEmail(email);
            })
    };

    return (
        <div className='min-h-[480px] flex justify-center items-center mb-80 mt-[236px]'>
            <div className=' w-96 card rounded-2xl shadow-xl p-7'>
                <h1 className='text-2xl font-normal text-center mb-14'>Sign Up</h1>
                <form onSubmit={handleSubmit(handleSingUp)}>
                    <div className="form-control w-full  ">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input {...register("name", { required: "Name is required" })} type="text" className="input input-bordered w-full" />
                        {errors.name && <p className='text-red-600 mt-1' role="alert">{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full mt-2">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: "Email Address is required" })} type="email" className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-600 mt-1' role="alert">{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full mt-2">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password",
                            {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be 6 digit" },
                                // pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$/, message: "Password mast have uppercase number and special character" }
                            })} type="password" className="input input-bordered w-full" />
                        {
                            singUpError && <p className='text-red-600'>{singUpError}</p>
                        }
                        {errors.password && <p className='text-red-600 mt-1' role="alert">{errors.password.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' type="submit" />

                    <p className='text-center mt-3'>You have a account? <Link to="/login" className='text-[#19D3AE]'>Login</Link></p>
                    <div className="divider">OR</div>
                </form>
                <button onClick={handleGoogleLogin} className='btn w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SingUp;