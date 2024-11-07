import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'
// import abroad from '../images/mainPage/abroad.png'
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
    const employeeId = sessionStorage.getItem('employeeId');
    const companyName = sessionStorage.getItem('customerName');
    console.log("company name:", companyName);

    const customerType = sessionStorage.getItem('customerType');
    console.log("customer Type:", customerType);

    const selectedPlan = sessionStorage.getItem('selectedPlan');
    console.log("selectedPlan:", selectedPlan);

    
    const District = sessionStorage.getItem('District');
    console.log("District:", District);

    const mobileNumber = sessionStorage.getItem('mobileNumber');
    const whatsappNumber = sessionStorage.getItem('whatsappNumber');
    const Email = sessionStorage.getItem('Email');


    const [visibleJobs, setVisibleJobs] = useState(9);

    // Function to load more jobs
    const loadMoreJobs = () => {
        setVisibleJobs(prevVisibleJobs => prevVisibleJobs + 9);
    };


    const [jobPosts, setJobPosts] = useState([]);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    console.log(employeeId, "employeeId");

    const navigate = useNavigate();
    // const HomePage = () => {
    //     navigate('/home');
    // };

    const empreg2 = () => {
        navigate('/empreg');
    };

    const regchoose = () => {
        navigate('/regchoose');
    };
    const canreg2 = () => {
        navigate('/canreg');
    };

    // Fetch job posts when component mounts
    useEffect(() => {
        fetch(`${apiBaseUrl}/getjobposts`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setJobPosts(data); // Store job posts in state
            })
            .catch(error => {
                console.error('Error fetching job posts:', error);
            });
    }, [apiBaseUrl]);

    // Navigate to details page with job_id passed as state
    const details = (jobId) => {
        navigate('/details', { state: { jobId } }); // Pass job_id as state
    };

// Updated Packages2 function to take job details as a parameter
const Packages2 = async (job) => {

    if (!customerType) {
        alert("Please login first"); // Alert if not logged in
        return; // Exit the function
    }


    if (selectedPlan === '300' || selectedPlan === '500' || selectedPlan === '600' || selectedPlan === '800' ) {
        try {
            // Prepare data with job details to send to the backend
            const payload = {
                employeeId: job.employee_id,
                customerName: companyName,
                jobId: job.job_id,
                whatsappNumber: whatsappNumber,
                mobileNumber: mobileNumber,
                Email: Email
            };

            // Send data to backend
            const response = await fetch(`${apiBaseUrl}/savePackageSelection`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log('Data saved successfully');
                alert('Applied successfully'); // Success alert
            } else {
                console.error('Failed to save data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        navigate('/packages', { state: { job: job.job, jobId: job.job_id, location: job.location } });
    }
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
            <div className='w-full lg:h-[500px] md:h-[900px] h-[700px] bg-[black] flex flex-col pb-3'>
                <div className='w-full h-[20%] flex justify-center items-center  px-12 text-[white] lg:text-3xl md:text-3xl sm:text-2xl text-xl font-[600] font-display'>
                    Welcome to Riya Hub Jobs - Best Job Portal in Kerala
                </div>
                <div className='w-full h-[80%] flex justify-center items-center lg:px-12 px-3  lg:flex-row flex-col gap-5'>
                    <div className='lg:w-[50%] w-[100%] lg:h-[340px] md:h-[300px] h-[260px] rounded-[10px] bg-[white] flex flex-row justify-center items-center cursor-pointer'>
                        <div className='w-[60%] h-[80%]  flex flex-col gap-4 lg:px-12 px-3 justify-start items-start'>
                            <span className='lg:text-2xl md:text-2xl text-xl  font-[700] font-display'>I am a Candidate</span>
                            <span className='text-base   font-[700] font-display'>I Want a Job</span>
                            <div className='h-[42px] lg:w-[50%] w-[50%] bg-[#E22E37] rounded-[5px] flex justify-center items-center lg:text-base text-xs font-[600] font-display text-[white] cursor-pointer hover:bg-black hover:text-white' onClick={canreg2}>Free Register</div>
                        </div>
                        <div className='w-[40%] h-full flex justify-center items-end'>
                            <img src={girl} alt="girl" />
                        </div>
                    </div>
                    <div className='lg:w-[50%] w-[100%] lg:h-[340px] md:h-[300px] h-[260px] rounded-[10px] bg-[#E22E37] flex flex-row justify-center items-center ' >
                        <div className='w-[60%] h-[80%]  flex flex-col gap-4 lg:px-12 px-3 justify-start items-start'>
                            <span className='lg:text-2xl md:text-2xl text-xl font-[700] font-display text-[white]'>I am an Employer</span>
                            <span className='text-base   font-[700] font-display text-[white]'>I Want to Hire</span>
                            <div className='h-[42px] lg:w-[50%] w-[50%] bg-[white] rounded-[5px] flex justify-center items-center lg:text-base text-xs font-[600] font-display cursor-pointer hover:bg-black hover:text-white' onClick={empreg2}>Free Job Post</div>
                        </div>
                        <div className='w-[40%] h-full flex justify-center items-end'>
                            <img src={india} alt="abroad" />
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex flex-col w-full lg:px-12 px-3 h-auto gap-12 mt-12 justify-center items-center pb-12 bg-[#FFFFFF]'>
                <span className='text-4xl font-[600] font-display'>Latest Jobs</span>
                <div className='grid lg:grid-cols-3 grid-cols-1 w-full gap-3'>
                    {jobPosts.slice(0, visibleJobs).map((job, index) => (
                        <div
                            key={index}
                            className='h-[292px] border-2 border-[#C5C5C5] w-full rounded-[10px] flex flex-col overflow-hidden'
                        >
                            <div className='w-full h-[30%] bg-[white] border-b-2 border-[#C5C5C5]  p-2 gap-2 flex justify-center items-center flex-col'>
                                <span className=' text-lg font-[650] font-display'>{formatJobTitle(job.job_title)}</span>
                                <div className='flex flex-row gap-2 items-center justify-center  '>
                                    <img className='text-[black]' src={vector} alt="loc" />
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
                                    <div className='flex items-center justify-center w-[80%] h-[38px] bg-[black] rounded-[10px] text-base font-[600] font-display text-[white] cursor-pointer hover:bg-[#E22E37] ' onClick={() => Packages2(job)}>
                                        Apply Now
                                    </div>
                                </div>
                                <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-2'>
                                    <div className='flex items-center justify-between w-full'>
                                        <span className='text-base font-display font-[500]'>{job.job_id}</span>
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
                    ))}
                </div>
                {/* Show "View More" button if there are more jobs to load */}
                {visibleJobs < jobPosts.length && (
                    <div className='flex justify-center mt-4'>
                        <button
                            className='bg-[black] text-white px-4 py-2 rounded-md text-lg font-semibold hover:bg-[#E22E37]'
                            onClick={loadMoreJobs}
                        >
                            View More
                        </button>
                    </div>
                )}
                <div className='w-full h-[355px] bg-[#E22E37] mt-12 flex flex-row'>
                    <div className='lg:w-[60%] w-[100%] lg:items-start items-center lg:justify-start justify-center lg:pl-12 lg:pr-[15%] pl-3 pr-[3%]  flex flex-col lg:text-left text-center  lg:gap-3 gap-6'>
                        <img src={bulb} alt="bulb" className='lg:flex hidden' />
                        <span className='text-3xl font-[700] font-display text-[white]'>Discover your ideal career opportunity today.</span>
                        <span className='text-base font-[300] font-display text-white'>Unlock your potential with tailored job listings that
                            match your skills and aspirations. Start exploring opportunities that
                            bring you closer to your career goals.</span>
                        <div className='lg:w-[30%] w-[50%] bg-[white] h-[40px] rounded-[5px] justify-center items-center flex text-base font-[700] font-display cursor-pointer hover:bg-black hover:text-white' onClick={regchoose}>Register Now</div>
                    </div>
                    <div className='w-[40%]   lg:flex hidden justify-center items-end'>
                        <img src={girloffice} alt="girloffice" />
                    </div>
                </div>
            </div>
            <div className='mt-12'>
                <Footer />
            </div>

        </div>
    )
}

export default Home
