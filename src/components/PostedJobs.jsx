import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Navbar2 from './Navbar2';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import vector from '../images/home/Vector.png';
import { useNavigate } from 'react-router-dom';


function PostedJobs() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [jobPosts, setJobPosts] = useState([]);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const employeeId = sessionStorage.getItem('employeeId');
    console.log(employeeId, "dd");
    const navigate = useNavigate();

    const editjobpost= (jobId) => {
        sessionStorage.setItem('jobId', jobId);
        navigate('/editjobpost'); 

      };

 

    useEffect(() => {
        const employeeId = sessionStorage.getItem('employeeId');
        console.log("Employee ID from sessionStorage:", employeeId); // Log the retrieved employeeId
    
        fetch(`${apiBaseUrl}/getjobposts`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched Job Posts:", data); // Log the fetched data
                const filteredJobs = data.filter(job => {
                    console.log("Job Employee ID:", job.employee_id, "Session Employee ID:", employeeId); // Log both IDs
                    return job.employee_id === Number(employeeId); // Compare after converting to number
                });
                console.log("Filtered Job Posts:", filteredJobs); // Log the filtered jobs
                setJobPosts(filteredJobs); // Store filtered job posts in state
            })
            .catch(error => {
                console.error('Error fetching job posts:', error);
            });
    }, [apiBaseUrl]);
    
    

    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='flex flex-col w-full lg:px-12 px-3 h-auto gap-12 mt-12 justify-center items-center pb-12 bg-[#FFFFFF]'>
                <span className='text-3xl font-[600] font-[display]'>View Posted Jobs</span>
                <div className='grid lg:grid-cols-3 grid-cols-1 w-full gap-3'>
                    {jobPosts.map((job) => (
                        <div className='h-[292px] border-2 border-[#C5C5C5] w-full rounded-[10px] flex flex-col overflow-hidden' key={job.job_id}>
                            <div className='w-full h-[30%] bg-[#E22E37] lg:px-5 px-1 flex items-center justify-between'>
                                <span className='text-[white] text-xl font-[700] font-[display]'>{job.job_title}</span>
                                <div className='flex flex-row gap-2 items-center justify-center border-2 border-[white] p-1 rounded-[40px]'>
                                    <img src={vector} alt="loc" />
                                    <span className='text-base font-[500] font-[display] text-[white]'>{job.location}</span>
                                </div>
                            </div>
                            <div className='w-full h-[70%] flex flex-row'>
                                <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                    <div className='flex items-center justify-between w-full'>
                                        <span className='text-base font-[display] font-[500]'>JOB ID</span>
                                        <span className='text-base font-[display] font-[500]'>:</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-base font-[display] font-[500]'>COMPANY TYPE</span>
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
                                    <div className='flex items-center justify-center w-[80%] h-[38px] bg-[green] rounded-[10px] text-lg font-[600] font-[display] text-[white] cursor-pointer' onClick={() => editjobpost(job.job_id)} >
                                        Edit
                                    </div>
                                </div>
                                <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                    <div className='flex items-center justify-between w-full'>
                                        <span className='text-base font-[display] font-[500]'>{job.job_id}</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-base font-[display] font-[500]'>{job.company_type}</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-base font-[display] font-[500]'>{job.job_type}</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-base font-[display] font-[500]'>{job.gender_type}</span>
                                    </div>
                                    <div className='flex items-center justify-center w-[80%] h-[38px] bg-[red] rounded-[10px] text-lg font-[600] font-[display] text-[white] cursor-pointer'>
                                        Delete
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PostedJobs;
