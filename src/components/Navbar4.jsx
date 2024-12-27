import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar4() {

    const navigate = useNavigate();

       const jobpost = () => {
        navigate('/jobpost');
    };

    const postedjob = () => {
        navigate('/postedjob');
    };

    const viewProfile3 = () => {
        navigate('/viewprofile');
    };



    const appliedCandidates = () => {
        navigate('/appliedcan');
    };



   



    return (
        <div className='h-[48px] w-full bg-[white] flex flex-row gap-12 justify-center items-center'>
            <span className='text-base font-[600] font-display text-[#D22D3A] cursor-pointer hover:text-black' onClick={jobpost}>Post Job</span>
            <span className='text-base font-[600] font-display text-[#D22D3A] cursor-pointer hover:text-black' onClick={postedjob}>View Posted Jobs</span>
            <span className='text-base font-[600] font-display text-[#D22D3A] cursor-pointer hover:text-black' onClick={appliedCandidates}>Applied Candidates</span>
            <span className='text-base font-[600] font-display text-[#D22D3A] cursor-pointer hover:text-black' onClick={viewProfile3}>View Profile</span>
        </div>
    )
}

export default Navbar4
