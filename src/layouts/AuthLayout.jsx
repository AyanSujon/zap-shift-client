import React from 'react';
import Logo from '../components/Logo/Logo';
import { Link, Outlet } from 'react-router';
import authImage from '../assets/authImage.png'

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto min-h-screen border p-5'>
            <Link to={'/'}>
                <Logo></Logo>
            </Link>
            <div className='flex items-center h-full'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1 '>
                    <img src={authImage} alt=" Auth Image" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;