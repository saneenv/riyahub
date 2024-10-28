import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar2 from '../components/Navbar2'
import NavbarMob from '../components/NavbarMob'
import Navbar from '../components/Navbar'
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';



function JobId() {
    const [jobId, setJobId] = useState('');
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const navigate = useNavigate();

    const details = () => {
        if (!jobId) {
            alert('Please enter a Job ID');
            return;
        }
        navigate('/details', { state: { jobId } }); // Pass jobId in state
    };

    return (
        <div className='min-h-screen flex flex-col'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='lg:px-12 px-3  lg:py-12 py-3 flex  bg-[#eeebeb] justify-center items-center min-h-screen'>
                <div className='lg:w-[40%] w-[90%] h-[300px] rounded-[10px] bg-[white] flex flex-col p-8 gap-8'>
                    <span className='flex justify-center items-start w-full text-xl font-[600] font-[display]'>Job ID Search</span>
                    <div className='flex flex-col w-full'>
                        <span className='w-full text-left text-lg font-[400] font-[display]'>Job ID*</span>
                        <input
                            type="number"
                            placeholder='Enter Job ID'
                            className='h-[50px] border-2 border-[#d4d3d3] rounded-[5px] px-3'
                            value={jobId}
                            onChange={(e) => setJobId(e.target.value)} 
                        />
                    </div>
                    <div className='flex flex-col w-full h-[50px] rounded-[5px] bg-[#0D2D3E]  justify-center items-center text-[white] font-[600] font-[display] text-lg cursor-pointer' onClick={details}>
                        Submit
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default JobId