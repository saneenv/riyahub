import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Navbar2Mob from './Navbar2Mob';

function ViewProfile2() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const candidateID = sessionStorage.getItem('employeeId');

  
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const editcanreg = () => {
    navigate('/editcanreg'); 
  };

  const packagePage = () => {
    navigate('/packages'); 
  };

  // Function to generate logo text from company name
  const generateLogoText = (companyName) => {
    if (!companyName) return 'C';
    const words = companyName.split(' ');
    const logoLetters = words.length > 1 ? words.map(word => word.charAt(0)).join('') : companyName.charAt(0);
    return logoLetters.toUpperCase();
  };

  // Fetch employee data when component mounts
  useEffect(() => {
    fetch(`${apiBaseUrl}/getCandidate/${candidateID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Candidate not found'); // Corrected the error message
        }
        return response.json();
      })
      .then((data) => {
        setEmployeeData(data); // Accessing data directly
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [candidateID, apiBaseUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex flex-col min-h-screen'>
      {isMobile ? <NavbarMob /> : <Navbar />}
      <div className='md:flex hidden'>
        <Navbar2 />
      </div>
      <div className='md:hidden flex flex-col'>
            <Navbar2Mob />
            </div>
      <div className='lg:px-12 px-3 w-full h-auto gap-6 flex flex-col'>
        <div className='w-full mt-6 flex flex-row justify-between'>
          <span className='lg:text-xl text-lg font-[600] font-display underline text-[green] cursor-pointer hover:text-[#174b17]' onClick={editcanreg}>Edit Profile</span>
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-3'>
          <div className='h-[150px] w-[150px] rounded-full border-2 border-[#E22E37] flex items-center justify-center text-[#E22E37]  text-4xl font-[600] font-display'>
            {/* Displaying generated logo */}
            {generateLogoText(employeeData?.Name || 'Name')}
          </div>
          <span className='text-2xl font-[600] font-display'>{employeeData?.Name || 'Name'}</span>
          <span className='text-xl font-[400] font-display'>{employeeData?.Email || ' Email'}</span>
          {/* <div className='flex flex-row gap-3 lg:w-[25%] w-[80%] h-[50px] '>
            <div className='w-[100%] h-full flex justify-center items-center lg:text-lg text-sm font-[600] font-display text-[white] bg-[#E22E37] cursor-pointer hover:text-[black]' onClick={packagePage}>
              Choose a Package
            </div>
           
          </div> */}
        </div>

        <div className='div w-full flex flex-col gap-3'>
        <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
            <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
              
              <span className='text-[#B3B3B3] text-xl font-[500] font-display'>User ID</span>
            </div>
            <div className='lg:w-[70%] w-full text-lg font-[500]  flex px-5 items-center'>
              {employeeData?.CandidateID || 'No mobile number available'}
            </div>
          </div>
          <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
            <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
              
              <span className='text-[#B3B3B3] text-xl font-[500] font-display'>Gender</span>
            </div>
            <div className='lg:w-[70%] w-full text-lg font-[500]  flex px-5 items-center'>
              {employeeData?.Mobile || 'No mobile number available'}
            </div>
          </div>
          
          <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
            <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
              
              <span className='text-[#B3B3B3] text-xl font-[500] font-display'>Mobile Number</span>
            </div>
            <div className='lg:w-[70%] w-full text-lg font-[500] flex px-5 items-center'>
              {employeeData?.Mobile || 'No mobile number available'}
            </div>
          </div>
       
          <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
            <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
              <span className='text-[#B3B3B3] text-xl font-[500] font-display'>District</span>
            </div>
            <div className='lg:w-[70%] w-full text-lg font-[500] flex px-5 items-center'>
              {employeeData?.District || 'No district available'}
            </div>
          </div>
          <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
            <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
              <span className='text-[#B3B3B3] text-xl font-[500] font-display'>Qualification</span>
            </div>
            <div className='lg:w-[70%] w-full text-lg font-[500] flex px-5 items-center'>
              {employeeData?.Degree || 'No address available'}
            </div>
          </div>
          <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
            <div className='lg:w-[30%] w-full  lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
              <span className='text-[#B3B3B3] text-xl font-[500] font-display'>Job Type</span>
            </div>
            <div className='lg:w-[70%] w-full text-lg font-[500] flex px-5 items-center'>
              {employeeData?.JobType || 'No address available'}
            </div>
          </div>
          <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
            <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
              <span className='text-[#B3B3B3] text-xl font-[500] font-display'>Job Preferences</span>
            </div>
            <div className='lg:w-[70%] w-full text-lg font-[500] flex px-5 items-center'>
              {employeeData?.Jobs || 'No address available'}
            </div>
          </div>
          <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
            <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
              <span className='text-[#B3B3B3] text-xl font-[500] font-display'>Preferred Job Locations</span>
            </div>
            <div className='lg:w-[70%] w-full text-lg font-[500] flex px-5 items-center'>
              {employeeData?.Locations || 'No address available'}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-12'>
        <Footer />
      </div>
    </div>
  );
}

export default ViewProfile2;
