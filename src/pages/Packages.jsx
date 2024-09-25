import React from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import banner from '../images/packages/banner.png'
import tick from '../images/packages/Tick.png'
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';

function Packages() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const navigate = useNavigate();
  const HomePage = () => {
   navigate('/home');
 };
  return (
    <div className='min-h-screen flex flex-col '>
      {isMobile ? <NavbarMob /> : <Navbar />}
      <div className='md:flex hidden'>
                <Navbar2 />
            </div>
      <div className='flex flex-row gap-3 lg:px-12 px-3'>
        <span className='text-lg font-[500] font-[display] text-[#828282] cursor-pointer' onClick={HomePage}>Home</span>
        <span className='text-lg font-[500] font-[display]'>{">"}</span>
        <span className='text-lg font-[500] font-[display]'>Packages</span>
      </div>
      <div className='flex flex-col py-12 w-full lg:px-12 px-3 justify-center items-center gap-12'>
        <span className='text-2xl font-[700] font-[display]'>Choose a plan that’s right for you.</span>
        <div className='grid lg:grid-cols-2 grid-cols-1 h-auto w-full gap-3'>
          <div className='h-[538px] w-full border-2 border-[#E22E37] rounded-[10px] flex flex-col gap-5'>
               <div className='w-full px-12 relative'>
                  <img src={banner} alt="banner" /> 
                  <div className='absolute inset-0 flex justify-end flex-col w-[100%] h-[100%] px-12 '>
                    <div className='lg:text-2xl text-xl font-[500] font-[display] h-[75%]  lg:w-[16%] md:w-[15%] w-[35%]  flex text-[white] justify-center items-center'>₹ 250</div>
                  </div>
               </div>
               <div className='w-full h-auto flex flex-col gap-3'>
                   <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                      <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Vaccancy</div>
                      <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'>Unlimited</div>
                   </div>
                   <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                      <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Validity</div>
                      <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'>6 Months</div>
                   </div>
                   <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                      <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Amount</div>
                      <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'>₹ 250</div>
                   </div>
                   <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                      <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Online Service</div>
                      <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'><img src={tick} alt="tick" /></div>
                   </div>
                   <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                      <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Vaccancy</div>
                      <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'><img src={tick} alt="tick" /></div>
                   </div>

               </div>
               <div className='w-full h-[50px] flex justify-center items-center'>
                   <div className='h-full w-[40%] bg-[#E22E37] rounded-[20px] flex justify-center items-center text-[white] text-xl font-[600] font-[display]'>Purchase Now</div>
               </div>
          </div>
          <div className='h-[538px] w-full border-2 border-[#E22E37] rounded-[10px] flex flex-col gap-5'>
               <div className='w-full px-12 relative'>
                  <img src={banner} alt="banner" /> 
                  <div className='absolute inset-0 flex justify-end flex-col w-[100%] h-[100%] px-12 '>
                    <div className='lg:text-2xl text-xl font-[500] font-[display] h-[75%] lg:w-[16%] md:w-[15%] w-[35%] flex text-[white] justify-center items-center'>₹ 250</div>
                  </div>
               </div>
               <div className='w-full h-auto flex flex-col gap-3'>
                   <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                      <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Vaccancy</div>
                      <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'>Unlimited</div>
                   </div>
                   <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                      <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Validity</div>
                      <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'>6 Months</div>
                   </div>
                   <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                      <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Amount</div>
                      <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'>₹ 250</div>
                   </div>
                   <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                      <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Online Service</div>
                      <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'><img src={tick} alt="tick" /></div>
                   </div>
                   <div className='w-full h-[56px] border-2 border-[#E3EAF1] flex flex-row '>
                      <div className='w-[30%] border-r-2 border-[#E3EAF1] lg:px-6 px-3 flex items-center text-xl font-[500] font-[display] text-[#B3B3B3]'>Vaccancy</div>
                      <div className='w-[70%]  lg:px-6 px-3 text-xl font-[500] font-[display] flex items-center'><img src={tick} alt="tick" /></div>
                   </div>

               </div>
               <div className='w-full h-[50px] flex justify-center items-center'>
                   <div className='h-full w-[40%] bg-[#E22E37] rounded-[20px] flex justify-center items-center text-[white] text-xl font-[600] font-[display]'>Purchase Now</div>
               </div>
          </div>
        </div>
      </div>
      <div className='mt-12'>
            <Footer/>
            </div>
    </div>
  )
}

export default Packages
