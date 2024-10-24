import React from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import banner from '../images/packages/banner.png'
import tick from '../images/packages/Tick.png'
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
import { useLocation } from 'react-router-dom';

function Packages() {

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const location = useLocation();
  const { job, jobId, location: jobLocation } = location.state || {};

 
  
  const handlePurchase300 = async () => {
    // Retrieve sessionStorage data
    const preferredJob = sessionStorage.getItem('preferredJob') ? sessionStorage.getItem('preferredJob').split(",") : [];
    const preferredLocation = sessionStorage.getItem('preferredLocation') ? sessionStorage.getItem('preferredLocation').split(",") : [];
    const customerName = sessionStorage.getItem('customerName');
    const mobileNumber = sessionStorage.getItem('mobileNumber');
    const whatsappNumber = sessionStorage.getItem('whatsappNumber');
    

    // Create the message bodys
    const message = `
      Hello, I am interested in the 300 plan. 
      Applying Job ID: ${jobId},
      Applying Job: ${job},
      Applying Job Location: ${jobLocation},
      Preferred Job: ${preferredJob.join(', ')}, 
      Preferred Location: ${preferredLocation.join(', ')}, 
      Customer Name: ${customerName}, 
      Mobile Number: ${mobileNumber}, 
      Whatsapp Number: ${whatsappNumber},

    `;
  
    try {
      const response = await fetch(`${apiBaseUrl}/send-whatsapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicate that the request body is JSON
        },
        body: JSON.stringify({
          to: '919207427150', // Pass the phone number as a string
          message: message.trim(), // Pass the constructed message text
        }),
      });
  
      const data = await response.json(); // Parse the JSON response
  
      if (response.ok) {
        alert('Message sent successfully');
      } else {
        // Log the full response to help debug the issue
        
        console.error('Response from server:', data);
        alert(`Your interest has been noted, and our team will contact you shortly.`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message.');
    }
  };

  const handlePurchase500 = async () => {
    // Retrieve sessionStorage data
    const preferredJob = sessionStorage.getItem('preferredJob') ? sessionStorage.getItem('preferredJob').split(",") : [];
    const preferredLocation = sessionStorage.getItem('preferredLocation') ? sessionStorage.getItem('preferredLocation').split(",") : [];
    const customerName = sessionStorage.getItem('customerName');
    const mobileNumber = sessionStorage.getItem('mobileNumber');
    const whatsappNumber = sessionStorage.getItem('whatsappNumber');
    

    // Create the message bodys
    const message = `
      Hello, I am interested in the 500 plan. 
      Applying Job ID: ${jobId},
      Applying Job: ${job},
      Applying Job Location: ${jobLocation},
      Preferred Job: ${preferredJob.join(', ')}, 
      Preferred Location: ${preferredLocation.join(', ')}, 
      Customer Name: ${customerName}, 
      Mobile Number: ${mobileNumber}, 
      Whatsapp Number: ${whatsappNumber}
    `;
  
    try {
      const response = await fetch(`${apiBaseUrl}/send-whatsapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicate that the request body is JSON
        },
        body: JSON.stringify({
          to: '919207427150', // Pass the phone number as a string
          message: message.trim(), // Pass the constructed message text
        }),
      });
  
      const data = await response.json(); // Parse the JSON response
  
      if (response.ok) {
        alert('Message sent successfully');
      } else {
        // Log the full response to help debug the issue
        console.error('Response from server:', data);
        alert(`Your interest has been noted, and our team will contact you shortly.`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message.');
    }
  };


  return (
    <div className='min-h-screen flex flex-col '>
      {isMobile ? <NavbarMob /> : <Navbar />}
      <div className='md:flex hidden'>
        <Navbar2 />
      </div>

      <div className='flex flex-col py-12 w-full lg:px-12 px-3 justify-center items-center gap-12'>
        <span className='text-2xl font-[700] font-[display]'>Choose a plan that’s right for you.</span>
        <div className='grid lg:grid-cols-2 grid-cols-1 h-auto w-full gap-3'>
          <div className='h-[538px] w-full border-2 border-[#E22E37] rounded-[10px] flex flex-col gap-5'>
            <div className='w-full px-12 relative'>
              <img src={banner} alt="banner" />
              <div className='absolute inset-0 flex justify-end flex-col w-[100%] h-[100%] px-12 '>
                <div className='lg:text-2xl text-xl font-[500] font-[display] h-[75%]  lg:w-[16%] md:w-[15%] w-[35%]  flex text-[white] justify-center items-center'>₹ 300</div>
              </div>
            </div>
            <div className='w-full h-auto flex flex-col gap-3'>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Vaccancy</div>
                <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'>Unlimited</div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Validity</div>
                <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'>30 Days</div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Amount</div>
                <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'>₹ 300</div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Online Service</div>
                <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'><img src={tick} alt="tick" /></div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>whatsapp Service</div>
                <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'><img src={tick} alt="tick" /></div>
              </div>

            </div>
            <div className='w-full h-[50px] flex justify-center items-center'>
              <div className='h-full w-[40%] bg-[#E22E37] rounded-[20px] flex justify-center items-center text-[white] text-xl font-[600] font-[display] cursor-pointer' onClick={handlePurchase300}>Purchase Now</div>
            </div>
          </div>
          <div className='h-[538px] w-full border-2 border-[#E22E37] rounded-[10px] flex flex-col gap-5'>
            <div className='w-full px-12 relative'>
              <img src={banner} alt="banner" />
              <div className='absolute inset-0 flex justify-end flex-col w-[100%] h-[100%] px-12 '>
                <div className='lg:text-2xl text-xl font-[500] font-[display] h-[75%] lg:w-[16%] md:w-[15%] w-[35%] flex text-[white] justify-center items-center'>₹ 500</div>
              </div>
            </div>
            <div className='w-full h-auto flex flex-col gap-3'>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Vaccancy</div>
                <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'>Unlimited</div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Validity</div>
                <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'>90 Days</div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Amount</div>
                <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'>₹ 500</div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Online Service</div>
                <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'><img src={tick} alt="tick" /></div>
              </div>
              <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>whatsapp Service</div>
                <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'><img src={tick} alt="tick" /></div>
              </div>

            </div>
            <div className='w-full h-[50px] flex justify-center items-center'>
              <div className='h-full w-[40%] bg-[#E22E37] rounded-[20px] flex justify-center items-center text-[white] text-xl font-[600] font-[display] cursor-pointer' onClick={handlePurchase500}>Purchase Now</div>
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
