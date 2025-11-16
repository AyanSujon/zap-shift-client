import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import bannerImg1 from '../../../assets/banner/banner1.png'
import bannerImg2 from '../../../assets/banner/banner2.png'
import bannerImg3 from '../../../assets/banner/banner3.png'
import { MdOutlineArrowOutward } from 'react-icons/md';
import { Link } from 'react-router';


const Banner = () => {
    return (
        <Carousel
        autoPlay={true}
        infiniteLoop={true}
        
        >
            <div className='relative'>
                <img src={bannerImg1} />
                <div className='flex gap-1 items-center font-bold absolute left-22 bottom-20'>
                    <Link to={"/"} className="btn rounded-full bg-primary">Track Your Parcel</Link>
                    <span className='flex items-center justify-center rounded-full bg-[#1F1F1F] p-2 text-primary'><MdOutlineArrowOutward /></span>
                    <Link to={"/"} className="btn rounded-full">Be A Rider</Link>
                </div>
            </div>
            <div>
                <img src={bannerImg2} />
            </div>
            <div>
                <img src={bannerImg3} />
            </div>
        </Carousel>
    );
};

export default Banner;