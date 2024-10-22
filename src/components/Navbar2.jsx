import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar2() {
  const navigate= useNavigate();
  const home = () => {
    navigate('/home');
  };
  const contactus = () => {
    navigate('/contact');
  };

  const findjob = () => {
    navigate('/searchedjobs');
  };

  const jobcategories = () => {
    navigate('/jobcategories');
  };
  return (
    <div className='h-[48px] w-full bg-[#D22D3A] flex flex-row gap-12 justify-center items-center'>
      <span className='text-sm font-[600] font-[display] text-[white] cursor-pointer' onClick={home}>Home</span>
      <span className='text-sm font-[600] font-[display] text-[white] cursor-pointer' onClick={jobcategories}>Job By Categories</span>
      <span className='text-sm font-[600] font-[display] text-[white] cursor-pointer' onClick={findjob}>Find Jobs</span>
      <span className='text-sm font-[600] font-[display] text-[white]'>Job By District</span>
      <span className='text-sm font-[600] font-[display] text-[white]'>Services</span>
      <span className='text-sm font-[600] font-[display] text-[white] cursor-pointer' onClick={contactus}>Contact Us</span>
    </div>
  )
}

export default Navbar2
