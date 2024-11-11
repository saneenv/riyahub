import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar2() {

  const navigate = useNavigate();

  const customerType = sessionStorage.getItem('customerType');
  console.log("customer Type:", customerType);

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

  const jobidpage = () => {
    navigate('/jobid');
  };

  const martial = () => {
    navigate('/martialstatus');
  };

  const sevicespage = () => {
    navigate('/services');
  };

  const whatsappPage = () => {
    navigate('/whatsapp');
  };


  return (
    <div className='h-[48px] w-full bg-[#D22D3A] flex flex-row gap-12 justify-center items-center'>
      <span className='text-base font-[600] font-display text-[white] cursor-pointer hover:text-black' onClick={home}>Home</span>
      <span className='text-base font-[600] font-display text-[white] cursor-pointer hover:text-black' onClick={findjob}>Find Jobs</span>
      <span className='text-base font-[600] font-display text-[white] cursor-pointer hover:text-black' onClick={jobcategories}>Job By Categories</span>

      <span className='text-base font-[600] font-display text-[white] cursor-pointer hover:text-black' onClick={jobidpage}>Job ID Search</span>
      {customerType === 'admin' && (
        <span className='text-base font-[600] font-display text-[white] cursor-pointer hover:text-black' onClick={martial}>Martial Status</span>
      )}
         {customerType === 'admin' && (
        <span className='text-base font-[600] font-display text-[white] cursor-pointer hover:text-black' onClick={whatsappPage}>To Whatsapp</span>
      )}
      <span className='text-base font-[600] font-display text-[white] cursor-pointer hover:text-black' onClick={sevicespage}>Services</span>
      <span className='text-base font-[600] font-display text-[white] cursor-pointer hover:text-black' onClick={contactus}>Contact Us</span>
    </div>
  )
}

export default Navbar2
