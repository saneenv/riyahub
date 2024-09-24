import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';


function JobPost() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className=' flex justify-center items-center bg-[#0D2D3E] py-12'>
                <div className='lg:w-[80%] w-[90%] h-[70%] bg-[white]  flex flex-col items-center  gap-12 py-12 lg:rounded-[20px] rounded-[5px]'>
                    <span className='text-2xl font-[700] font-[display]'>Job Post</span>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-12 px-3 w-full'>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job Title</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job Type</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Select Job</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Gender</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job Qualification</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job Description</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>



                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Minimum Salary</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Maximum Salary</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Work Time Start</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>


                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Work Time End</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Company Category</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Company Name</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>



                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Mobile Number</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Whatsapp Number</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Email</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>



                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Company Location</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Company Address</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Create Password</span>
                            <input type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>





                    </div>

                    <div className='flex flex-col gap-5 w-full px-12 justify-center items-center'>
                        <div className='h-[56px] lg:w-[25%] w-[50%] bg-[#E22E37] rounded-[20px] flex justify-center items-center text-[white] text-xl font-[display] font-[600]'>Job Post</div>
                        <span className='text-base font-[500] font-[dislay]'>Already Register- <span className='text-base font-[700] font-[dislay] text-[#E22E37] cursor-pointer'>Login</span> </span>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default JobPost
