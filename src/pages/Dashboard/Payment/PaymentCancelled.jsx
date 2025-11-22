import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className="text4xl">Payment Candelled. Please try again</h2>
            <Link to={"/dashboard/my-parcels"}>
                <button className='btn btn-primary text-black'>Try Again</button>
            </Link>
        </div>
    );
};

export default PaymentCancelled;