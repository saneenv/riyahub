import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar5() {

    const navigate = useNavigate();

    const selectedPlan = sessionStorage.getItem('selectedPlan');
    console.log("fdgdfghhbhjvbhjvbhjbvhjbk:", selectedPlan);



    // const home = () => {
    //     navigate('/home'); 
    //   };

    const matchjob = () => {
        navigate('/matchingjobs');
    };

    const canapplied = () => {
        navigate('/canapplied');
    };

    const viewProfile = () => {
        navigate('/viewcandidate');
    };

    const packages = () => {
        navigate('/packages');
    };

    return (
        <div className='h-[48px] w-full bg-[white] flex flex-row gap-12 justify-center items-center'>
            <span className='text-base font-[600] font-display text-[#D22D3A] cursor-pointer hover:text-black' onClick={matchjob}>Matching Jobs</span>
            <span className='text-base font-[600] font-display text-[#D22D3A] cursor-pointer hover:text-black' onClick={canapplied}>Applied Jobs</span>
            {(selectedPlan === 'null' || selectedPlan === '') && (

                <span className='text-base font-[600] font-display text-[#D22D3A] cursor-pointer hover:text-black' onClick={packages}>Packages</span>
            )}

            <span className='text-base font-[600] font-display text-[#D22D3A] cursor-pointer hover:text-black' onClick={viewProfile}>View Profile</span>
        </div>
    )
}

export default Navbar5
