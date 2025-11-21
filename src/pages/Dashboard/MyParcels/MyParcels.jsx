import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcels = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {} = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })
    return (
        <div>
             <h2>All of My Parcels</h2>
        </div>
    );
};

export default MyParcels;