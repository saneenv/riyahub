import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer'
import Navbar2 from '../components/Navbar2'
import NavbarMob from '../components/NavbarMob'
import Navbar from '../components/Navbar'
import { useMediaQuery } from 'react-responsive';
import vector from '../images/home/Vector.png'
import { useNavigate } from 'react-router-dom';

function Jobs() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const location = useLocation();
    const jobTitle = location.state?.jobTitle;
    console.log(jobTitle);
    const [jobPosts, setJobPosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); 
    const navigate = useNavigate();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    // Fetch job posts from API
    useEffect(() => {
        const fetchJobPosts = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/getjobpostsbyjob/${jobTitle}`);
                
                if (response.status === 404) {
                    // Set error message when no jobs are found
                    setErrorMessage('No job posts found for the specified job title');
                } else {
                    const data = await response.json();
                    const enabledJobPosts = data.filter(job => job.enable === 'on');
               
                    setJobPosts(enabledJobPosts);
                }
            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };

        fetchJobPosts();
    }, [jobTitle, apiBaseUrl]); // Add jobTitle and apiBaseUrl as dependencies

    // Navigate to details page with job_id passed as state
    const details = (jobId) => {
        navigate('/details', { state: { jobId } }); // Pass job_id as state
    };

    function formatJobTitle(title) {
        const lowercaseWords = ["at", "in", "of", "for", "to", "and", "on", "by", "with"];
        return title
            .split(" ")
            .map((word, index) => 
                lowercaseWords.includes(word.toLowerCase()) && index !== 0
                    ? word.toLowerCase()
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
    }

    return (
        <div className='min-h-screen flex flex-col'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>

            <div className='flex flex-col w-full lg:px-12 px-3 h-auto lg:py-12 py-5 bg-[#FFFFFF] min-h-screen'>
                <div className='grid lg:grid-cols-3 grid-cols-1 w-full gap-3'>
                    {errorMessage ? (
                        // Display error message if no jobs found
                        <div className='text-2xl text-red-500 font-[700] font-display w-full justify-center items-center'>
                            {errorMessage}
                        </div>
                    ) : (
                        // Map through jobPosts if jobs are found
                        jobPosts.map((job) => (
                            <div
                                key={job.job_id}
                                className='lg:h-[292px] h-[320px] border-2 border-[#C5C5C5] w-full rounded-[10px] flex flex-col overflow-hidden'
                            >
                                <div className='w-full h-[30%] bg-[white]  p-2 gap-2 flex border-b-2 border-[#C5C5C5] justify-center items-center flex-col'>
                                    <span className=' text-lg font-[700] font-display'>{formatJobTitle(job.job_title)}</span>
                                    <div className='flex flex-row gap-2 items-center justify-center '>
                                        <img src={vector} alt="loc" />
                                        <span className='text-base font-[500] font-display '>{job.location}</span>
                                    </div>
                                </div>
                                <div className='w-full h-[70%] flex flex-row bg-[white]'>
                                    <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                        <div className='flex items-center justify-between w-full'>
                                            <span className='text-base font-display font-[600]'>JOB ID</span>
                                            <span className='text-base font-display font-[600]'>:</span>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-base font-display font-[600]'>COMPANY TYPE</span>
                                            <span className='text-base font-display font-[600]'>:</span>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-base font-display font-[600]'>JOB TYPE</span>
                                            <span className='text-base font-display font-[600]'>:</span>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-base font-display font-[600]'>GENDER</span>
                                            <span className='text-base font-display font-[600]'>:</span>
                                        </div>
                                        <div className='flex items-center justify-center w-[80%] h-[38px] bg-[black] rounded-[10px] text-base font-[600] font-display text-[white] cursor-pointer hover:bg-[#E22E37]' onClick={() => details(job.job_id)}>
                                            Apply Now
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-2'>
                                        <div className='flex items-center justify-between w-full'>
                                            <span className='text-base font-display font-[500]'>{job.manualJobID && job.manualJobID !== "0" ? job.manualJobID : job.job_id}</span>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-base font-display font-[500]'>{job.company_type}</span>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-base font-display font-[500]'>{job.job_type}</span>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-base font-display font-[500]'>{job.gender_type}</span>
                                        </div>
                                        <div className='flex items-center justify-center w-[80%] h-[38px] bg-[black] rounded-[10px] text-base font-[600] font-display text-[white] cursor-pointer hover:bg-[#E22E37]' onClick={() => details(job.job_id)}>
                                            Job Details
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Jobs;
