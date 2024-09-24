import React,{useEffect} from 'react'
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import NavbarMob from '../components/NavbarMob';
import loc from '../images/details/loc.png'
import dinner from '../images/details/Dinner.png'
import rs from '../images/details/rs.png'
import phone from '../images/details/phone.png'
import lan from '../images/details/lan.png'
import wa from '../images/details/whatsapp.png'
import mail from '../images/details/mailpng.png'
import fb from '../images/details/Facebook.png'
import insta from '../images/details/insta.png'
import x from '../images/details/x.png'
import telegram from '../images/details/telegram.png'
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';


function Details() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const navigate = useNavigate();
    const Packages = () => {
        navigate('/packages');
    };
    const HomePage = () => {
        navigate('/home');
      };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='min-h-screen flex flex-col '>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='flex flex-row gap-3 lg:px-12 px-3'>
                <span className='text-lg font-[500] font-[display] text-[#828282] cursor-pointer' onClick={HomePage}>Home</span>
                <span className='text-lg font-[500] font-[display]'>{">"}</span>
                <span className='text-lg font-[500] font-[display]'>Details</span>
            </div>
            <div className='flex flex-col gap-8 lg:px-12 px-3 mt-12 pb-12'>

                <div className='flex flex-row justify-between w-full'>
                    <div className='h-[38px] lg:w-[10%] w-[40%] bg-[#3B3D3B] rounded-[10px] flex justify-center items-center text-base font-[600] font-[display] text-[white] cursor-pointer'>Back to Jobs</div>
                    <div className='h-[38px] lg:w-[10%] w-[40%] bg-[#339030] rounded-[10px] flex justify-center items-center text-base font-[600] font-[display] text-[white] cursor-pointer' onClick={Packages}>Apply Now</div>
                </div>

                <div className='w-full flex flex-col gap-4'>
                    <span className='text-2xl font-[700] font-[display] text-left'>Resort Manager</span>
                    <span className='text-xl font-[400] font-[display] text-left'>Job Opening at Hill way Resort</span>
                    <div className='flex flex-col w-full h-auto gap-2'>
                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={loc} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Location</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                900 Kandi Resort
                            </div>
                        </div>

                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={loc} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>District</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                Wayanad
                            </div>
                        </div>

                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={loc} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>State</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                Kerala
                            </div>
                        </div>

                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={dinner} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Food & Accomodation</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                yes
                            </div>
                        </div>

                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={rs} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Salary</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                ₹ 20,000/-
                            </div>
                        </div>

                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={phone} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Manager Number</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                +91 9988774455
                            </div>
                        </div>

                        <div className='flex  lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={lan} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Office Number</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                0495 987456
                            </div>
                        </div>
                    </div>
                </div>
                <ul className='border-2 border-[#E3EAF1]'></ul>
                <div className='flex flex-col w-full gap-4'>
                    <span className='text-2xl font-[700] font-[display] text-left'>Job Descscription</span>
                    <span className='text-xl font-[500] font-[display] text-left'>As a resort manager, your job will include managing all
                        aspects of a resort, including lodging, food and beverage management, human resources,
                        housekeeping, attractions, and guest services. You'll be in charge of employees,
                        finances, customer service, promotions, and quality control. Resort managers
                        often have to work nights and weekends,
                        putting in long hours to ensure the success of their
                        establishment. However, your hours may vary greatly during high and low travel seasons.</span>
                </div>
                <span className='text-2xl font-[700] font-[display] text-left'>Requirements</span>

                <div className='flex flex-col w-full h-auto gap-2'>
                    <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                        <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>

                            <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Required Gender</span>
                        </div>
                        <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                            Male
                        </div>
                    </div>

                    <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                        <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>

                            <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Qualification</span>
                        </div>
                        <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                            Same Field Experience Required
                        </div>
                    </div>
                </div>
                <span className='text-2xl font-[700] font-[display] text-left'>Job Descriptions</span>
                <div className='flex flex-col w-full h-auto gap-2'>
                    <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                        <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>

                            <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Experience Required</span>
                        </div>
                        <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                        1-2 Year Experience
                        </div>
                    </div>

                   
                </div>

            </div>
            <div className='grid lg:grid-cols-6 grid-cols-3 w-full lg:px-12 px-3 gap-12 mt-12 pb-8'>
                <div className='h-[56px] w-full bg-[#52CE60] rounde-[10px] flex justify-center items-center rounded-[10px]'>
                    <img src={wa} alt="wa" />
                </div>
                <div className='h-[56px] w-full bg-[#DCE6EA] rounde-[10px] flex justify-center items-center rounded-[10px]'>
                <img src={mail} alt="wa" />
                </div>
               
                <div className='h-[56px] w-full bg-[#1877F2] rounde-[10px] flex justify-center items-center rounded-[10px]'>
                <img src={fb} alt="wa" />
                </div>
                <div className='h-[56px] w-full bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]  rounde-[10px] flex justify-center items-center rounded-[10px]'>
                <img src={insta} alt="wa" />
                </div>
                <div className='h-[56px] w-full bg-[#000000] rounde-[10px] flex justify-center items-center rounded-[10px]'>
                <img src={x} alt="wa" />
                </div>
                <div className='h-[56px] w-full bg-[#239CD7] rounde-[10px] flex justify-center items-center rounded-[10px]'>
                <img src={telegram} alt="wa" />
                </div>
            </div>
            <div className='mt-12'>
            <Footer/>
            </div>
        </div>
    )
}

export default Details
