import React from 'react';
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
    const {userName, user_photoURL, review: testimonial,  } = review;




    return (
        <div className='my-10 '>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-sm">
                {/* Quote Icon */}
                <FaQuoteLeft className="text-teal-300 text-3xl mb-3" />

                {/* Text */}
                <p className=" mb-6">
                    {testimonial}
                </p>

                {/* Line */}
                <div className="border-t border-dashed border-gray-300 mb-4"></div>

                {/* Profile */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-900 rounded-full ">
                        <img className='overflow-hidden rounded-full' src={user_photoURL} alt="User Photo" />
                    </div>
                    <div>
                        <h3 className="text-teal-900 font-semibold">{userName}</h3>
                        <p className="text-gray-500 text-sm">Senior Product Designer</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;