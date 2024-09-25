import React from 'react'
import { useMediaQuery } from 'react-responsive';
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'
import abroad from '../images/mainPage/abroad.png'
import india from '../images/mainPage/india.png'
import NavbarMob from '../components/NavbarMob';
import { useNavigate } from 'react-router-dom';


function Main() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const navigate = useNavigate();
    const HomePage = () => {
        navigate('/home'); 
      };

    return (
        <div className='min-h-screen flex flex-col'>
             {isMobile ? <NavbarMob /> : <Navbar />}
           <div className='md:flex hidden'>
           <Navbar2 />
           </div> 
            <div className='w-full lg:h-[500px] md:h-[900px] h-[700px] bg-[#0D2D3E] flex flex-col pb-3'>
                <div className='w-full h-[20%] flex justify-center items-center  px-12 text-[white] lg:text-4xl md:text-3xl sm:text-2xl text-xl font-[600] font-[display]'>
                    Welcome to Riya Hub Jobs - Best Job Portal in Kerala
                </div>
                <div className='w-full h-[80%] flex justify-center items-center lg:px-12 px-3  lg:flex-row flex-col gap-5'>
                    <div onClick={HomePage} className='lg:w-[50%] w-[100%] lg:h-[340px] md:h-[300px] h-[260px] rounded-[10px] bg-[white] flex flex-row justify-center items-center cursor-pointer'>
                        <div className='w-[60%] h-[80%]  flex flex-col gap-4 lg:px-12 px-3 justify-start items-start'>
                            <span className='lg:text-3xl md:text-2xl text-xl  font-[700] font-[display]'>Jobs in Abroad</span>
                            <div className='h-[42px] lg:w-[30%] w-[50%] bg-[#E22E37] rounded-[5px] flex justify-center items-center lg:text-sm text-xs font-[600] font-[display] text-[white] cursor-pointer'>Register Now</div>
                        </div>
                        <div className='w-[40%] h-full flex justify-center items-end'>
                            <img src={abroad} alt="abroad" />
                        </div>
                    </div>
                    <div onClick={HomePage} className='lg:w-[50%] w-[100%] lg:h-[340px] md:h-[300px] h-[260px] rounded-[10px] bg-[#E22E37] flex flex-row justify-center items-center cursor-pointer'>
                        <div className='w-[60%] h-[80%]  flex flex-col gap-4 lg:px-12 px-3 justify-start items-start'>
                            <span className='lg:text-3xl md:text-2xl text-xl font-[700] font-[display] text-[white]'>Jobs in India</span>
                            <div className='h-[42px] lg:w-[30%] w-[50%] bg-[white] rounded-[5px] flex justify-center items-center lg:text-sm text-xs font-[600] font-[display] cursor-pointer'>Register Now</div>
                        </div>
                        <div className='w-[40%] h-full flex justify-center items-end'>
                            <img src={india} alt="abroad" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Main
