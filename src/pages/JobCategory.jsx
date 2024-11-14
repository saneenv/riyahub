import React from 'react'
import { useMediaQuery } from 'react-responsive';
import Footer from '../components/Footer'
import Navbar2 from '../components/Navbar2'
import NavbarMob from '../components/NavbarMob'
import Navbar from '../components/Navbar'
import jobs from '../json/jobs.json';
import { useNavigate } from 'react-router-dom';


function JobCategory() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const jobTitles = jobs.states[0].districts;
    const navigate = useNavigate();
    const jobPage = (title) => {
        navigate('/jobs', { state: { jobTitle: title } }); // Pass the title to the next page
    };


    return (
        <div className='min-h-screen flex flex-col'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>


            <div className='lg:px-12 px-3  flex flex-col bg-[#eeebeb]'>
            <div className='grid py-12 lg:grid-cols-4 grid-cols-2 gap-4'>
                    {/* Map through the job titles */}
                    {jobTitles.map((title, index) => (
                        <div key={index} className='w-full h-[170px] flex justify-center items-center flex-col gap-3 bg-[white] rounded-[5px] p-2'>
                            <span className='lg:text-xl text-base font-[600] font-display'>{title}</span>
                            <div className='lg:w-[30%] w-[70%] h-[40px] bg-[#E22E37] rounded-md text-[white] font-[600] lg:text-base text-sm font-display flex justify-center items-center cursor-pointer hover:text-[black]'  onClick={() => jobPage(title)}>
                                View Jobs
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            
                <Footer />
           

        </div>
    )
}

export default JobCategory