import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar2Mob() {
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
  const jobnames = () => {
    navigate('/jobnames');
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
    <div className="w-full bg-[black] p-4">
      <div className="grid grid-cols-3 gap-3 text-center">
        <span
          className="text-xs font-[600] font-display text-white py-2 rounded-lg bg-[#B91C1C] hover:text-black  cursor-pointer"
          onClick={home}
        >
          Home
        </span>
        <span
          className="text-xs font-[600] font-display text-white py-2 rounded-lg bg-[#B91C1C] hover:text-black  cursor-pointer"
          onClick={findjob}
        >
          Find Jobs
        </span>
        {(customerType === 'admin' || customerType === 'mainAdmin') && (
          <span
            className="text-xs font-[600] font-display text-white py-2 rounded-lg bg-[#B91C1C] hover:text-black  cursor-pointer"
            onClick={jobcategories}
          >
            Job Categories
          </span>
        )}
        <span
          className="text-xs font-[600] font-display text-white py-2 rounded-lg bg-[#B91C1C] hover:text-black cursor-pointer"
          onClick={jobnames}
        >
          Job Names
        </span>
        <span
          className="text-xs font-[600] font-display text-white py-2 rounded-lg bg-[#B91C1C] hover:text-black  cursor-pointer"
          onClick={jobidpage}
        >
          Job ID
        </span>
        {(customerType === 'admin' || customerType === 'mainAdmin') && (
          <span
            className="text-xs font-[600] font-display text-white py-2 rounded-lg bg-[#B91C1C] hover:text-black  cursor-pointer"
            onClick={martial}
          >
            Martial Status
          </span>
        )}
        {(customerType === 'admin' || customerType === 'mainAdmin') && (
          <span
            className="text-xs font-[600] font-display text-white py-2 rounded-lg bg-[#B91C1C] hover:text-black  cursor-pointer"
            onClick={whatsappPage}
          >
            WhatsApp
          </span>
        )}
        <span
          className="text-xs font-[600] font-display text-white py-2 rounded-lg bg-[#B91C1C] hover:text-black  cursor-pointer"
          onClick={sevicespage}
        >
          Services
        </span>
        <span
          className="text-xs font-[600] font-display text-white py-2 rounded-lg bg-[#B91C1C] hover:text-black  cursor-pointer"
          onClick={contactus}
        >
          Contact Us
        </span>
      </div>
    </div>
  );
}

export default Navbar2Mob;
