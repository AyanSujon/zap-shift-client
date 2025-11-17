import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser } = useAuth();




    const handleRegistration = (data) => {
        // console.log("After Submit", data);
        registerUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);
            })
            .catch((error) => {
                console.log(error);
            })

    }







    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl my-5">
            <h3 className="text-3xl text-center">Create an Account</h3>
            <p className='text-center'>Register with ZapShift</p>
            <form className='card-body' onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full" placeholder="Email" />
                    {errors.email?.type === 'required' && (<p className='text-red-500'>Email is required.</p>)}


                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/ })} className="input w-full" placeholder="Password" />
                    {errors.password?.type === 'required' && (<p className='text-red-500'>Password is required.</p>)}
                    {errors.password?.type === 'minLength' && (<p className='text-red-500'>Password must be 6 characters or longer.</p>)}
                    {errors.password?.type === 'pattern' && (<p className='text-red-500'>Password must contain at least one uppercase, one lowercase, one number, and one special character.</p>)}

                    <button className="btn bg-primary text-black mt-4">Register</button>
                </fieldset>
                <p>Already have an account? <Link to={'/login'} className='text-primary link-hover'>Login</Link></p>
                
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;


