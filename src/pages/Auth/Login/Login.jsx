import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {

    const { register, handleSubmit,  formState: { errors } } = useForm();

    const handleLogin = (data) => {
        console.log("After Submit: ", data);
    }



    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                <fieldset className="fieldset">
                    {/* Eamil Field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', {required: true})} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && (<p className='text-red-500'>Eamil is required.</p>)
                    }

                    {/* password Field */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/})} className="input" placeholder="Password" />
                    {errors.password?.type === 'required' && (<p className='text-red-500'>Password is required.</p>)}
                    {errors.password?.type === 'minLength' && (<p className='text-red-500'>Password must be 6 characters or longer.</p>)}
                    {errors.password?.type === 'pattern' && (<p className='text-red-500'>Password must contain at least one uppercase, one lowercase, one number, and one special character.</p>)}
                    
                   
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
            </form>
        </div>
    );
};

export default Login;