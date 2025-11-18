import React from 'react';
import { useForm } from 'react-hook-form';

const SendParcel = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSendParcel = (data) => {
        console.log(data);


    }

    return (
        <div>
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
                            <input type="text" {...register('senderName')} className="input w-full mb-4" placeholder="Sender Name" />

                            {/*  Address */}
                            <label className="label">Address</label>
                            <input type="text" {...register('senderAddress')} className="input w-full mb-4" placeholder="Address" />


                            {/* Sender Phone No */}
                            <label className="label">Sender Phone No</label>
                            <input type="text" {...register('senderPhoneNo')} className="input w-full mb-4" placeholder="Sender Phone No" />

                            {/* Your District */}
                            <label className="label">Your District</label>
                            <input type="text" {...register('yourDistrict')} className="input w-full mb-4" placeholder="Select your District" />

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

                            {/* Your District */}
                            <label className="label">Receiver District</label>
                            <input type="text" {...register('receiverDistrict')} className="input w-full mb-4" placeholder="Select your District" />

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