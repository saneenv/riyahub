import React,{useState} from 'react'
import { useMediaQuery } from 'react-responsive';
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'
import abroad from '../images/mainPage/abroad.png'
import india from '../images/mainPage/india.png'
import girl from '../images/home/girl.png'
import NavbarMob from '../components/NavbarMob';
import vector from '../images/home/Vector.png'
import bulb from '../images/home/bulb.png'
import girloffice from '../images/home/girloffice.png'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';


function Home() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  
    const navigate = useNavigate();
    const HomePage = () => {
        navigate('/home');
    };
    const details = () => {
        navigate('/details'); 
      };
      const empreg2 = () => {
        navigate('/empreg'); 
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
                    <div  className='lg:w-[50%] w-[100%] lg:h-[340px] md:h-[300px] h-[260px] rounded-[10px] bg-[white] flex flex-row justify-center items-center cursor-pointer'>
                        <div className='w-[60%] h-[80%]  flex flex-col gap-4 lg:px-12 px-3 justify-start items-start'>
                            <span className='lg:text-3xl md:text-2xl text-xl  font-[700] font-[display]'>I am a Candidate</span>
                            <span className='text-base   font-[600] font-[display]'>I Want a Job</span>
                            <div className='h-[42px] lg:w-[30%] w-[50%] bg-[#E22E37] rounded-[5px] flex justify-center items-center lg:text-sm text-xs font-[600] font-[display] text-[white] cursor-pointer'>Register Now</div>
                        </div>
                        <div className='w-[40%] h-full flex justify-center items-end'>
                            <img src={girl} alt="girl" />
                        </div>
                    </div>
                    <div  className='lg:w-[50%] w-[100%] lg:h-[340px] md:h-[300px] h-[260px] rounded-[10px] bg-[#E22E37] flex flex-row justify-center items-center ' >
                        <div className='w-[60%] h-[80%]  flex flex-col gap-4 lg:px-12 px-3 justify-start items-start'>
                            <span className='lg:text-3xl md:text-2xl text-xl font-[700] font-[display] text-[white]'>I am an Employer</span>
                            <span className='text-base font-[600] font-[display] text-[white]'>I Want to Hire</span>
                            <div className='h-[42px] lg:w-[30%] w-[50%] bg-[white] rounded-[5px] flex justify-center items-center lg:text-sm text-xs font-[600] font-[display] cursor-pointer' onClick={empreg2}>Register Now</div>
                        </div>
                        <div className='w-[40%] h-full flex justify-center items-end'>
                            <img src={india} alt="abroad" />
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex flex-col w-full lg:px-12 px-3 h-auto gap-12 mt-12 justify-center items-center pb-12 bg-[#FFFFFF]'>
                <span className='text-3xl font-[600] font-[display]'>Latest Jobs</span>
                <div className='grid lg:grid-cols-3 grid-cols-1 w-full gap-3'>
                    <div className='h-[292px] border-2 border-[#C5C5C5] w-full rounded-[10px] flex flex-col overflow-hidden'>
                        <div className='w-full h-[30%] bg-[#E22E37] px-5 flex items-center justify-between'>
                            <span className='text-[white] text-xl font-[700] font-[display]'>Resort Manager</span>
                            <div className='flex flex-row gap-2 items-center justify-center border-2 border-[white] p-1 rounded-[40px]'>
                                <img src={vector} alt="loc" />
                                <span className='text-base font-[500] font-[display] text-[white]'>Kozhikode</span>
                            </div>

                        </div>
                        <div className='w-full h-[70%]  flex flex-row'>
                            <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-base font-[display] font-[500]'>JOB ID</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>COMPANY DETAILS</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>JOB TYPE</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>GENDER</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-center w-[80%] h-[38px] bg-[#0D2D3E] rounded-[10px] text-lg font-[600] font-[display] text-[white] cursor-pointer' onClick={details}>
                                    Apply Now

                                </div>

                            </div>
                            <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-base font-[display] font-[500]'>1284453</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Resort</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Full Time</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Male</span>

                                </div>
                                <div className='flex items-center justify-center w-[80%] h-[38px] bg-[#0D2D3E] rounded-[10px] text-lg font-[600] font-[display] text-[white] cursor-pointer' onClick={details}>
                                    Job Details

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='h-[292px] border-2 border-[#C5C5C5] w-full rounded-[10px] flex flex-col overflow-hidden'>
                        <div className='w-full h-[30%] bg-[#E22E37] px-5 flex items-center justify-between'>
                            <span className='text-[white] text-xl font-[700] font-[display]'>Resort Manager</span>
                            <div className='flex flex-row gap-2 items-center justify-center border-2 border-[white] p-1 rounded-[40px]'>
                                <img src={vector} alt="loc" />
                                <span className='text-base font-[500] font-[display] text-[white]'>Kozhikode</span>
                            </div>

                        </div>
                        <div className='w-full h-[70%]  flex flex-row'>
                            <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-base font-[display] font-[500]'>JOB ID</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>COMPANY DETAILS</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>JOB TYPE</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>GENDER</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-center w-[80%] h-[38px] bg-[#0D2D3E] rounded-[10px] text-lg font-[600] font-[display] text-[white]'>
                                    Apply Now

                                </div>

                            </div>
                            <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-base font-[display] font-[500]'>1284453</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Resort</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Full Time</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Male</span>

                                </div>
                                <div className='flex items-center justify-center w-[80%] h-[38px] bg-[#0D2D3E] rounded-[10px] text-lg font-[600] font-[display] text-[white]'>
                                    Job Details

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='h-[292px] border-2 border-[#C5C5C5] w-full rounded-[10px] flex flex-col overflow-hidden'>
                        <div className='w-full h-[30%] bg-[#E22E37] px-5 flex items-center justify-between'>
                            <span className='text-[white] text-xl font-[700] font-[display]'>Resort Manager</span>
                            <div className='flex flex-row gap-2 items-center justify-center border-2 border-[white] p-1 rounded-[40px]'>
                                <img src={vector} alt="loc" />
                                <span className='text-base font-[500] font-[display] text-[white]'>Kozhikode</span>
                            </div>

                        </div>
                        <div className='w-full h-[70%]  flex flex-row'>
                            <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-base font-[display] font-[500]'>JOB ID</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>COMPANY DETAILS</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>JOB TYPE</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>GENDER</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-center w-[80%] h-[38px] bg-[#0D2D3E] rounded-[10px] text-lg font-[600] font-[display] text-[white]'>
                                    Apply Now

                                </div>

                            </div>
                            <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-base font-[display] font-[500]'>1284453</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Resort</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Full Time</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Male</span>

                                </div>
                                <div className='flex items-center justify-center w-[80%] h-[38px] bg-[#0D2D3E] rounded-[10px] text-lg font-[600] font-[display] text-[white]'>
                                    Job Details

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='h-[292px] border-2 border-[#C5C5C5] w-full rounded-[10px] flex flex-col overflow-hidden'>
                        <div className='w-full h-[30%] bg-[#E22E37] px-5 flex items-center justify-between'>
                            <span className='text-[white] text-xl font-[700] font-[display]'>Resort Manager</span>
                            <div className='flex flex-row gap-2 items-center justify-center border-2 border-[white] p-1 rounded-[40px]'>
                                <img src={vector} alt="loc" />
                                <span className='text-base font-[500] font-[display] text-[white]'>Kozhikode</span>
                            </div>

                        </div>
                        <div className='w-full h-[70%]  flex flex-row'>
                            <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-base font-[display] font-[500]'>JOB ID</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>COMPANY DETAILS</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>JOB TYPE</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>GENDER</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-center w-[80%] h-[38px] bg-[#0D2D3E] rounded-[10px] text-lg font-[600] font-[display] text-[white]'>
                                    Apply Now

                                </div>

                            </div>
                            <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-base font-[display] font-[500]'>1284453</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Resort</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Full Time</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Male</span>

                                </div>
                                <div className='flex items-center justify-center w-[80%] h-[38px] bg-[#0D2D3E] rounded-[10px] text-lg font-[600] font-[display] text-[white]'>
                                    Job Details

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='h-[292px] border-2 border-[#C5C5C5] w-full rounded-[10px] flex flex-col overflow-hidden'>
                        <div className='w-full h-[30%] bg-[#E22E37] px-5 flex items-center justify-between'>
                            <span className='text-[white] text-xl font-[700] font-[display]'>Resort Manager</span>
                            <div className='flex flex-row gap-2 items-center justify-center border-2 border-[white] p-1 rounded-[40px]'>
                                <img src={vector} alt="loc" />
                                <span className='text-base font-[500] font-[display] text-[white]'>Kozhikode</span>
                            </div>

                        </div>
                        <div className='w-full h-[70%]  flex flex-row'>
                            <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-base font-[display] font-[500]'>JOB ID</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>COMPANY DETAILS</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>JOB TYPE</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>GENDER</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-center w-[80%] h-[38px] bg-[#0D2D3E] rounded-[10px] text-lg font-[600] font-[display] text-[white]'>
                                    Apply Now

                                </div>

                            </div>
                            <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-base font-[display] font-[500]'>1284453</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Resort</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Full Time</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Male</span>

                                </div>
                                <div className='flex items-center justify-center w-[80%] h-[38px] bg-[#0D2D3E] rounded-[10px] text-lg font-[600] font-[display] text-[white]'>
                                    Job Details

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='h-[292px] border-2 border-[#C5C5C5] w-full rounded-[10px] flex flex-col overflow-hidden'>
                        <div className='w-full h-[30%] bg-[#E22E37] px-5 flex items-center justify-between'>
                            <span className='text-[white] text-xl font-[700] font-[display]'>Resort Manager</span>
                            <div className='flex flex-row gap-2 items-center justify-center border-2 border-[white] p-1 rounded-[40px]'>
                                <img src={vector} alt="loc" />
                                <span className='text-base font-[500] font-[display] text-[white]'>Kozhikode</span>
                            </div>

                        </div>
                        <div className='w-full h-[70%]  flex flex-row'>
                            <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-base font-[display] font-[500]'>JOB ID</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>COMPANY DETAILS</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>JOB TYPE</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>GENDER</span>
                                    <span className='text-base font-[display] font-[500]'>:</span>
                                </div>
                                <div className='flex items-center justify-center w-[80%] h-[38px] bg-[#0D2D3E] rounded-[10px] text-lg font-[600] font-[display] text-[white]'>
                                    Apply Now

                                </div>

                            </div>
                            <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-base font-[display] font-[500]'>1284453</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Resort</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Full Time</span>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-base font-[display] font-[500]'>Male</span>

                                </div>
                                <div className='flex items-center justify-center w-[80%] h-[38px] bg-[#0D2D3E] rounded-[10px] text-lg font-[600] font-[display] text-[white]'>
                                    Job Details

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-[355px] bg-[#E22E37] mt-12 flex flex-row'>
                    <div className='lg:w-[50%] w-[100%] lg:items-start items-center lg:justify-start justify-center lg:pl-12 lg:pr-[15%] pl-3 pr-[3%]  flex flex-col lg:text-left text-center  lg:gap-3 gap-6'>
                        <img src={bulb} alt="bulb" className='lg:flex hidden' />
                        <span className='text-4xl font-[700] font-[display] text-[white]'>Discover your ideal career opportunity today.</span>
                        <span className='text-sm font-[300] font-[display] text-white'>Unlock your potential with tailored job listings that
                            match your skills and aspirations. Start exploring opportunities that
                            bring you closer to your career goals.</span>
                            <div className='w-[30%] bg-[white] h-[40px] rounded-[5px] justify-center items-center flex text-base font-[700] font-[display]'>Register Now</div>
                    </div>
                    <div className='w-[50%]   lg:flex hidden justify-center items-end'>
                        <img src={girloffice} alt="girloffice" />
                    </div>
                </div>
            </div>
            <div className='mt-12'>
            <Footer/>
            </div>
           
        </div>
    )
}

export default Home
