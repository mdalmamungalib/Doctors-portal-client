import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import { GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../Hooks/useToken';
import { useTitle } from '../../Hooks/UseTitle';

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { loginUser, googleLogin } = useContext(AuthContext);
    const [loginUserEmail, setLoginUserEmail] = useState("");
    const [token] = useToken(loginUserEmail);

    const location = useLocation();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const from = location.state?.from?.pathname || "/";

    useTitle("Login")
    if (token) {
        return navigate(from, { replace: true });
    }

    const handleLogin = data => {
        setLoginError("");
        loginUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast.success("User Login Success Fully");
                console.log(user);
                setLoginUserEmail(data?.email);
                console.log(data?.email)
            })
            .catch(error => {
                console.log(error);
                setLoginError(error.message);
            })
    };

    const handleGoogleLogin = () => {
        googleLogin(provider)
            .then(result => {
                const user = result.user;
                setLoginUserEmail(user?.email)
                console.log(user);
                console.log(user?.email)
            })
            .catch(error => {
                console.log(error);
                setLoginError(error.message)
            })
    }
    return (
        <div className='min-h-[480px] flex justify-center items-center mb-80 mt-[236px]'>
            <div className=' w-96 card rounded-2xl shadow-xl p-7'>
                <h1 className='text-2xl font-normal text-center mb-14'>Login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: "Email Address is required" })} className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-600 mt-1' role="alert">{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters or longer" }
                        })} className="input input-bordered w-full" />
                        {/* error field */}
                        <div>
                            {
                                loginError && <p className='text-red-600'>{loginError}</p>
                            }
                        </div>
                        <label className="label">
                            <span className="label-text text-[10px] font-normal">Forgot Password ?</span>
                        </label>
                        {errors.password && <p className='text-red-600 mt-1' role="alert">{errors.password.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' type="submit" />
                    <p className='text-center mt-3'>New to Doctors Portal? <Link to="/singUp" className='text-[#19D3AE]'>Create new account</Link></p>
                    <div className="divider">OR</div>

                </form>
                <button onClick={handleGoogleLogin} className='btn w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;