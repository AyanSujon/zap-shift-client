
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {

    const { register,
        handleSubmit,
        control,
        // formState: { errors } 
    } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData();
    // console.log(serviceCenters);
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    // console.log(regions);
    // for this worning for (watch()) explore useMemo and useCallback 
    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' });




    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }











    const handleSendParcel = (data) => {
        console.log(data);
        const isDocument = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);
        // console.log(sameDistrict);
        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;

        } else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            } else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        console.log(cost);



        Swal.fire({
            title: "Agree with the cost?",
            text: `You will be charged ${cost} taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I Agree!"
        }).then((result) => {
            if (result.isConfirmed) {

                // save the parcel info to the database 
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log("After Savings Parcel: ", res.data)
                    })

                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });

    }

    return (
        <div className='py-5'>
            <h2 className="text-5xl font-bold">Send A Parcel</h2>
            <form onSubmit={handleSubmit(handleSendParcel)} className='mt-12 p-4 text-black'>
                {/* Document */}
                <div>
                    <label className="label mr-4"><input type="radio" {...register("parcelType")} value={"document"} className="radio" defaultChecked />Document</label>
                    <label className="label"><input type="radio" {...register("parcelType")} value={"non-document"} className="radio" />Non-Document</label>
                </div>

                {/* parcel info: name, weight */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>

                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />

                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />

                    </fieldset>
                </div>

                {/* two Column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* sender info */}
                    <div>
                        <h4 className="text 2xl font-semibold">Sender Details</h4>
                        <fieldset className="fieldset ">
                            {/* Sender Name */}
                            <label className="label">Sender Name</label>
                            <input type="text" {...register('senderName')} 
                            defaultValue={user?.displayName}
                            className="input w-full mb-4" placeholder="Sender Name" />

                            {/* Sender Email */}
                            <label className="label">Sender Email</label>
                            <input type="email" {...register('senderEmail')} 
                            defaultValue={user?.email}
                            className="input w-full mb-4" placeholder="Sender Name" />



                            {/*  Address */}
                            <label className="label">Sender Address</label>
                            <input type="text" {...register('senderAddress')} className="input w-full mb-4" placeholder="Address" />


                            {/* Sender Phone No */}
                            <label className="label">Sender Phone No</label>
                            <input type="text" {...register('senderPhoneNo')} className="input w-full mb-4" placeholder="Sender Phone No" />

                            {/* Sender region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender Regions</legend>
                                <select {...register('senderRegion')} defaultValue="Pick a Region" className="select  w-full">
                                    <option disabled={true}>Pick a Region</option>
                                    {
                                        regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }

                                </select>
                            </fieldset>


                            {/* Sender District */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender District</legend>
                                <select {...register('senderDistrict')} defaultValue="Pick a District" className="select  w-full">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtsByRegion(senderRegion).map((r, i) => <option key={i} value={r} className='text-black'>{r}</option>)
                                    }

                                </select>
                            </fieldset>









                            <label className="label">Pickup Instruction</label>
                            <textarea {...register('pickupInstruction')} className="textarea h-24 w-full mb-4" placeholder="Pickup Instruction"></textarea>
                        </fieldset>
                    </div>

                    {/* Reciver info */}
                    <div>
                        <h4 className="text 2xl font-semibold">Receiver Details</h4>
                        <fieldset className="fieldset ">
                            {/* Receiver Name */}
                            <label className="label">Receiver Name</label>
                            <input type="text" {...register('receiverName')} className="input w-full mb-4" placeholder="Sender Name" />

                            {/*  Receiver Address */}
                            <label className="label">Receiver Address</label>
                            <input type="text" {...register('receiverAddress')} className="input w-full mb-4" placeholder="Address" />


                            {/* Receiver Phone No */}
                            <label className="label">Receiver Phone No</label>
                            <input type="text" {...register('receiverPhoneNo')} className="input w-full mb-4" placeholder="Receiver Contact No" />


                            {/* Receiver region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver Regions</legend>
                                <select {...register('receiverRegion')} defaultValue="Pick a Region" className="select  w-full">
                                    <option disabled={true}>Pick a Region</option>
                                    {
                                        regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }

                                </select>
                            </fieldset>





                            {/* Receiver District */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver District</legend>
                                <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select  w-full">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtsByRegion(receiverRegion).map((d, i) => <option key={i} value={d} className='text-black'>{d}</option>)
                                    }

                                </select>
                            </fieldset>





                            <label className="label">Delivery Instruction</label>
                            <textarea {...register('deliveryInstruction')} className="textarea h-24 w-full mb-4" placeholder="Delivery Instruction"></textarea>
                        </fieldset>
                    </div>
                </div>
                <input type="submit" className='btn btn-primary text-black' value="Send Parcel" />
            </form>
        </div>
    );
};

export default SendParcel;