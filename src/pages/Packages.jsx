import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import banner from '../images/packages/banner.png'
import tick from '../images/packages/Tick.png'
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
import { useLocation } from 'react-router-dom';
import Navbar2Mob from '../components/Navbar2Mob';

function Packages() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const location = useLocation();
  const { job, jobId, location: jobLocation } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePurchase300 = async () => {
    setIsLoading(true);
    const preferredJob = sessionStorage.getItem('preferredJob') ? sessionStorage.getItem('preferredJob').split(",") : [];
    const preferredLocation = sessionStorage.getItem('preferredLocation') ? sessionStorage.getItem('preferredLocation').split(",") : [];
    const customerName = sessionStorage.getItem('customerName');
    const mobileNumber = sessionStorage.getItem('mobileNumber');
    const whatsappNumber = sessionStorage.getItem('whatsappNumber');
    const employeeId = sessionStorage.getItem('employeeId');

    if (!customerName || !mobileNumber || !whatsappNumber) {
      alert("Please log in first");
      setIsLoading(false);
      return;
    }

    const message = `Hello, I am interested in the *300* plan. 
    Candidate ID: *${employeeId}*,
    Applying Job ID: *${jobId}*, 
    Applying Job: *${job}*, 
    Applying Job Location: *${jobLocation}*, 
    Preferred Job: *${preferredJob.join(', ')}*, 
    Preferred Location: *${preferredLocation.join(', ')}*, 
    Customer Name: *${customerName}*, 
    Mobile Number: ${mobileNumber}, 
    Whatsapp Number: ${whatsappNumber}`;

    try {
      const response = await fetch(`${apiBaseUrl}/send-whatsapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: '919544500746',
          message: message.trim(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Message sent successfully');
      } else {
        console.error('Response from server:', data);
        alert(`Your interest has been noted, and our team will contact you shortly.`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase500 = async () => {
    setIsLoading2(true);
    const preferredJob = sessionStorage.getItem('preferredJob') ? sessionStorage.getItem('preferredJob').split(",") : [];
    const preferredLocation = sessionStorage.getItem('preferredLocation') ? sessionStorage.getItem('preferredLocation').split(",") : [];
    const customerName = sessionStorage.getItem('customerName');
    const mobileNumber = sessionStorage.getItem('mobileNumber');
    const whatsappNumber = sessionStorage.getItem('whatsappNumber');
    const employeeId = sessionStorage.getItem('employeeId');

    if (!customerName || !mobileNumber || !whatsappNumber) {
      alert("Please log in first");
      setIsLoading2(false);
      return;
    }

    const message = `Hello, I am interested in the *500* plan. 
    Candidate ID: *${employeeId}*,
    Applying Job ID: *${jobId}*, 
    Applying Job: *${job}*, 
    Applying Job Location: *${jobLocation}*, 
    Preferred Job: *${preferredJob.join(', ')}*, 
    Preferred Location: *${preferredLocation.join(', ')}*, 
    Customer Name: *${customerName}*, 
    Mobile Number: ${mobileNumber}, 
    Whatsapp Number: ${whatsappNumber}`;

    try {
      const response = await fetch(`${apiBaseUrl}/send-whatsapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: '919544500746',
          message: message.trim(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Message sent successfully');
      } else {
        console.error('Response from server:', data);
        alert(`Your interest has been noted, and our team will contact you shortly.`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message.');
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col '>
      {isMobile ? <NavbarMob /> : <Navbar />}
      <div className='md:flex hidden'>
        <Navbar2 />
      </div>
      <div className='md:hidden flex flex-col'>
        <Navbar2Mob />
      </div>

      <div className='flex flex-col py-12 w-full lg:px-12 px-3 justify-center items-center gap-12'>
        <span className='lg:text-2xl text-xl font-[600] font-display'>Choose a plan that's right for you.</span>
        <div className='grid lg:grid-cols-2 grid-cols-1 h-auto w-full gap-3'>
          {/* ₹300 Plan */}
          <div className='h-[538px] w-full border-2 border-[#E22E37] rounded-[10px] flex flex-col gap-5'>
            <div className='w-full px-12 relative'>
              <img src={banner} alt="banner" />
              <div className='absolute inset-0 flex justify-end flex-col w-[100%] h-[100%] px-12 '>
                <div className='lg:text-2xl text-xl font-[500] font-display h-[75%] lg:w-[16%] md:w-[15%] w-[35%] flex text-[white] justify-center items-center'>₹ 300</div>
              </div>
            </div>
            <div className='w-full h-auto flex flex-col gap-3'>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[35%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-lg font-[500] font-display text-[#B3B3B3]'>Vaccancy</div>
                <div className='w-[65%] lg:px-6 px-3 text-lg font-[500] font-display flex items-center'>Unlimited</div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[35%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-lg font-[500] font-display text-[#B3B3B3]'>Validity</div>
                <div className='w-[65%] lg:px-6 px-3 text-lg font-[500] font-display flex items-center'>30 Days</div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[35%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-lg font-[500] font-display text-[#B3B3B3]'>Amount</div>
                <div className='w-[65%] lg:px-6 px-3 text-lg font-[500] font-display flex items-center'>₹ 300</div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[35%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-lg font-[500] font-display text-[#B3B3B3]'>Online Service</div>
                <div className='w-[65%] lg:px-6 px-3 text-lg font-[500] font-display flex items-center'><img src={tick} alt="tick" /></div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[35%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-lg font-[500] font-display text-[#B3B3B3]'>whatsapp Service</div>
                <div className='w-[65%] lg:px-6 px-3 text-lg font-[500] font-display flex items-center'><img src={tick} alt="tick" /></div>
              </div>
            </div>
            <div className='w-full h-[50px] flex justify-center items-center'>
              <div className={`h-full w-[40%] ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E22E37]'} rounded-[20px] flex justify-center items-center text-[white] lg:text-xl text-base font-[600] font-display cursor-pointer hover:bg-[black]`} onClick={handlePurchase300}>
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
                ) : (
                  'Purchase Now'
                )}
              </div>
            </div>
          </div>

          {/* ₹500 Plan */}
          <div className='h-[538px] w-full border-2 border-[#E22E37] rounded-[10px] flex flex-col gap-5'>
            <div className='w-full px-12 relative'>
              <img src={banner} alt="banner" />
              <div className='absolute inset-0 flex justify-end flex-col w-[100%] h-[100%] px-12 '>
                <div className='lg:text-2xl text-xl font-[500] font-display h-[75%] lg:w-[16%] md:w-[15%] w-[35%] flex text-[white] justify-center items-center'>₹ 500</div>
              </div>
            </div>
            <div className='w-full h-auto flex flex-col gap-3'>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[35%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-lg font-[500] font-display text-[#B3B3B3]'>Vaccancy</div>
                <div className='w-[65%] lg:px-6 px-3 text-lg font-[500] font-display flex items-center'>Unlimited</div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[35%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-lg font-[500] font-display text-[#B3B3B3]'>Validity</div>
                <div className='w-[65%] lg:px-6 px-3 text-lg font-[500] font-display flex items-center'>90 Days</div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[35%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-lg font-[500] font-display text-[#B3B3B3]'>Amount</div>
                <div className='w-[65%] lg:px-6 px-3 text-lg font-[500] font-display flex items-center'>₹ 500</div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[35%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-lg font-[500] font-display text-[#B3B3B3]'>Online Service</div>
                <div className='w-[65%] lg:px-6 px-3 text-lg font-[500] font-display flex items-center'><img src={tick} alt="tick" /></div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[35%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-lg font-[500] font-display text-[#B3B3B3]'>whatsapp Service</div>
                <div className='w-[65%] lg:px-6 px-3 text-lg font-[500] font-display flex items-center'><img src={tick} alt="tick" /></div>
              </div>
            </div>
            <div className='w-full h-[50px] flex justify-center items-center'>
              <div className={`h-full w-[40%] ${isLoading2 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E22E37]'} rounded-[20px] flex justify-center items-center text-[white] lg:text-xl text-base font-[600] font-display cursor-pointer hover:bg-[black]`} onClick={handlePurchase500}>
                {isLoading2 ? (
                  <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
                ) : (
                  'Purchase Now'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-12'>
        <Footer />
      </div>
    </div>
  )
}

export default Packages