import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import call from '../images/viewprofile/call.png';
import wa from '../images/viewprofile/Whatsapp.png';
import { useNavigate } from 'react-router-dom';

function ViewProfile() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const employeeId = sessionStorage.getItem('employeeId');
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const editempreg = () => {
    navigate('/editempreg'); 
  };

  const postjob = () => {
    navigate('/jobpost'); 
  };

  const postedjobs = () => {
    navigate('/postedjob'); 
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (!confirmDelete) return;
  
    try {
      // First, delete all job posts related to the employee
      const jobPostResponse = await fetch(`${apiBaseUrl}/jobposts/${employeeId}`, {
        method: 'DELETE',
      });
  
      if (!jobPostResponse.ok) {
        const jobPostErrorData = await jobPostResponse.json();
        alert(jobPostErrorData.message || 'Error deleting job posts');
        return;
      }
  
      alert('All job posts for this employee have been deleted'); // Show success message for job posts deletion
  
      // Then, proceed to delete the employee profile
      const employeeResponse = await fetch(`${apiBaseUrl}/employee/delete/${employeeId}`, {
        method: 'DELETE',
      });
  
      if (!employeeResponse.ok) {
        const employeeErrorData = await employeeResponse.json();
        alert(employeeErrorData.message || 'Error deleting employee');
        return;
      }
  
      const employeeData = await employeeResponse.json();
      alert(employeeData.message || 'Employee profile deleted successfully'); // Show success message for profile deletion
  
      // Clean up session and navigate away after successful deletion
      sessionStorage.removeItem('employeeId');
      sessionStorage.removeItem('jobId');
      sessionStorage.removeItem('customerName');
      navigate('/login'); // Redirect to the login page or another appropriate page
  
    } catch (error) {
      console.error('Error deleting profile or job posts:', error);
      alert('An error occurred while deleting the profile or job posts.');
    }
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
    fetch(`${apiBaseUrl}/employee/${employeeId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Employee not found');
        }
        return response.json();
      })
      .then((data) => {
        setEmployeeData(data.employee);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [employeeId]);

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
      <div className='lg:px-12 px-3 w-full h-auto gap-6 flex flex-col'>
        <div className='w-full mt-6 flex flex-row justify-between'>
          <span className='lg:text-xl text-lg font-[600] font-display underline text-[green] cursor-pointer hover:text-[#174b17] ' onClick={editempreg}>Edit Profile</span>
          <span className='lg:text-xl text-lg font-[600] font-display underline text-[#E22E37] cursor-pointer hover:text-[#fe4d4d]' onClick={handleDeleteProfile}>Delete Profile</span>
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-3'>
          <div className='h-[150px] w-[150px] rounded-full border-2 border-[#E22E37] flex items-center justify-center text-[#E22E37]  text-4xl font-[600] font-display'>
            {/* Displaying generated logo */}
            {generateLogoText(employeeData?.company_name || 'Company Name')}
          </div>
          <span className='text-2xl font-[600] font-display'>{employeeData?.company_name || 'Company Name'}</span>
          <span className='text-xl font-[400] font-display'>{employeeData?.email || 'Employee Email'}</span>
          <div className='flex flex-row gap-3 lg:w-[25%] w-[80%] h-[50px] '>
            <div className='w-[50%] h-full flex justify-center items-center lg:text-base text-sm font-[600] font-display text-[white] bg-[#E22E37] cursor-pointer hover:text-[black]' onClick={postjob}>
              POST NEW JOB
            </div>
            <div className='w-[50%] h-full border-2 border-[#AEAEAE] flex justify-center items-center lg:text-base text-sm font-[600] font-display cursor-pointer hover:text-[#E22E37]' onClick={postedjobs}>
              VIEW ALL JOB
            </div>
          </div>
        </div>

        <div className='div w-full flex flex-col gap-3'>
          <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
            <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
              <img src={call} alt="call" />
              <span className='text-[#B3B3B3] text-xl font-[500] font-display'>Mobile Number</span>
            </div>
            <div className='lg:w-[70%] w-full text-lg font-[500]  flex px-5 items-center'>
              {employeeData?.mobile_number || 'No mobile number available'}
            </div>
          </div>
          <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
            <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
              <img src={wa} alt="Whatsapp" />
              <span className='text-[#B3B3B3] text-xl font-[500] font-display'>Whatsapp Number</span>
            </div>
            <div className='lg:w-[70%]  w-full text-lg font-[500] flex px-5 items-center'>
              {employeeData?.whatsapp_number || 'No Whatsapp number available'}
            </div>
          </div>
          <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
            <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
              <span className='text-[#B3B3B3] text-xl font-[500] font-display'>Company District</span>
            </div>
            <div className='lg:w-[70%] w-full text-lg font-[500] flex px-5 items-center'>
              {employeeData?.company_district || 'No district available'}
            </div>
          </div>
          <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
            <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
              <span className='text-[#B3B3B3] text-xl font-[500] font-display'>Address</span>
            </div>
            <div className='lg:w-[70%] w-full text-lg font-[500] flex px-5 items-center'>
              {employeeData?.address || 'No address available'}
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

export default ViewProfile;
