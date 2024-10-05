import React from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import call from '../images/contactus/call.png'
import email from '../images/contactus/email.png'
import location from '../images/contactus/location.png'
import twitter from '../images/contactus/twitter.png'
import insta from '../images/contactus/insta.png'
import arrow from '../images/contactus/arrow.png'

function ContactUs() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


  return (
    <div className='min-h-screen flex flex-col'>
      {isMobile ? <NavbarMob /> : <Navbar />}
      <div className='md:flex hidden'>
        <Navbar2 />
      </div>

      <div className='px-12 w-full gap-12 mt-6 flex flex-col '>
        <div className='w-full gap-3 flex flex-col'>
          <span className='text-4xl font-[700] font-[display] text-[#E22E37]'>Contact Us</span>
          <span className='text-lg font-[500] font-[display]'>Any question or remarks? Just write us a message!</span>
        </div>
        <div className='w-full flex flex-row gap-3 h-[600px]'>
          <div className='w-[40%] h-full  bg-[#E22E37] p-12  flex flex-col items-start text-left rounded-[10px] justify-between'>
            <div className='flex flex-col gap-6'>
              <span className='text-3xl font-[600] font-[display]  text-white'>Contact Information</span>
              <span className='text-lg font-[400] font-[display]  text-[#C9C9C9]'>Say something to start a live chat!</span>
            </div>

            <div className='flex flex-col gap-6'>
              <div className='flex flex-row gap-3'>

                <img src={call} alt="call" />
                <span className='text-base font-[400] font-[display] text-[white]'>+91 9988774455</span>
              </div>
              <div className='flex flex-row gap-3'>

                <img src={email} alt="call" />
                <span className='text-base font-[400] font-[display] text-[white]'>Riyahubjobs@gmail.com</span>
              </div>
              <div className='flex flex-row gap-3'>

                <img src={location} alt="call" />
                <span className='text-base font-[400] font-[display] text-[white]'>jdsbvhsbvsbvzvbjdbvjhhdbnhvnjvnjvnjdakjvjhhvdjfbvjhbbvjbkndfbh</span>
              </div>
            </div>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-row gap-3'>

                <div className='w-[30px] h-[30px] rounded-full bg-[white] flex justify-center items-center'>
                 <img src={twitter} alt="twitter" />
                </div>
                <div className='w-[30px] h-[30px] rounded-full bg-[white] flex justify-center items-center'>
                  <img src={insta} alt="insta" />
                </div>
               
              </div>
            
            </div>
          </div>
          <div className='w-[60%]  h-full  p-12  flex flex-col items-start text-left rounded-[10px] gap-12'>
             <div className='w-full flex flex-row gap-3'>
                <div className='flex flex-col w-[50%] gap-6'>
                   <span className='text-sm font-[500] font-[display]'>First Name</span>
                   <input type="text" className='w-full border-b-2 border-[#8D8D8D] focus:outline-none focus:ring-0' />
                </div>
                <div className='flex flex-col w-[50%] gap-6'>
                   <span className='text-sm font-[500] font-[display]'>Last Name</span>
                   <input type="text" className='w-full border-b-2 border-[#8D8D8D] focus:outline-none focus:ring-0' />
                </div>
             </div>
             <div className='w-full flex flex-row gap-3'>
                <div className='flex flex-col w-[50%] gap-6'>
                   <span className='text-sm font-[500] font-[display]'>Email</span>
                   <input type="text" className='w-full border-b-2 border-[#8D8D8D] focus:outline-none focus:ring-0' />
                </div>
                <div className='flex flex-col w-[50%] gap-6'>
                   <span className='text-sm font-[500] font-[display]'>Phone Number</span>
                   <input type="text" className='w-full border-b-2 border-[#8D8D8D] focus:outline-none focus:ring-0' />
                </div>
             </div>
             <div className='w-full flex flex-row gap-3'>
                <div className='flex flex-col w-[100%] gap-6'>
                   <span className='text-sm font-[500] font-[display]'>Message</span>
                   <input placeholder='write your message' type="text" className='w-full border-b-2 border-[#8D8D8D] focus:outline-none focus:ring-0' />
                </div>
             
             </div>
             <div className='w-full flex flex-col'>
              <div className='flex w-full justify-end items-end'>
              <div className='h-[50px] w-[20%] bg-[#E22E37] rounded-[10px] flex flex-end text-[white] justify-center items-center text-base font-[500] font-[display]'>Send Message</div>
              </div>
              <div className='flex w-full h-[120px]  justify-center items-center'>
                   <div className='h-full w-[40%] '>
                    <img src={arrow} alt="arrow" className='w-full h-full' />
                   </div>
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

export default ContactUs
