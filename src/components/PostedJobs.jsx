import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Navbar2 from './Navbar2';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import vector from '../images/home/Vector.png';
import { useNavigate } from 'react-router-dom';
import Navbar2Mob from './Navbar2Mob';

function PostedJobs() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [jobPosts, setJobPosts] = useState([]);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const employeeId = sessionStorage.getItem('employeeId');
    const navigate = useNavigate();

    const editJobPost = (jobId) => {
        sessionStorage.setItem('jobId', jobId);
        navigate('/editjobpost');
    };

    const deleteJobPost = (jobId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job post?");
        if (confirmDelete) {
            fetch(`${apiBaseUrl}/jobpost/${jobId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // Update the jobPosts state to remove the deleted job post
                    setJobPosts(prevJobs => prevJobs.filter(job => job.job_id !== jobId));
                    alert('Job post deleted successfully');
                })
                .catch(error => {
                    console.error('Error deleting job post:', error);
                });
        }
    };

    useEffect(() => {
        fetch(`${apiBaseUrl}/getjobposts${employeeId ? `?employeeId=${employeeId}` : ''}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setJobPosts(data); // Backend already filters, so no further filtering is needed here
            })
            .catch(error => {
                console.error('Error fetching job posts:', error);
            });
    }, [apiBaseUrl, employeeId]);

    
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
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='md:hidden flex flex-col'>
            <Navbar2Mob />
            </div>
            <div className='flex flex-col w-full lg:px-12 px-3 h-auto gap-12 mt-12 justify-center items-center pb-12 bg-[#FFFFFF]'>
                <span className='text-2xl font-[600] font-display'>View Posted Jobs</span>
                <div className='grid lg:grid-cols-3 grid-cols-1 w-full gap-3'>
                    {jobPosts.map((job) => (
                        <div className='lg:h-[292px] h-[320px] border-2 border-[#C5C5C5] w-full rounded-[10px] flex flex-col overflow-hidden' key={job.job_id}>
                            <div className='w-full h-[30%]  p-2 gap-2 flex justify-center border-b-2 border-[#C5C5C5] items-center flex-col'>
                                <span className=' text-xl font-[700] font-display'>{formatJobTitle(job.job_title)}</span>
                                <div className='flex flex-row gap-2 items-center justify-center '>
                                    <img src={vector} alt="loc" />
                                    <span className='text-base font-[500] font-display '>{job.location}</span>
                                    <div className={`mt-2 px-3 py-1 rounded-full text-white font-semibold ${job.enable === 'on' ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {job.enable === 'on' ? 'Posted' : 'Pending'}
                                </div>
                                </div>
                            
                           
                            </div>
                            <div className='w-full h-[70%] flex flex-row'>
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
                                    <div className='flex items-center justify-center w-[80%] h-[38px] bg-[green] rounded-[10px] text-base font-[600] font-display text-[white] cursor-pointer hover:bg-[#174b17] ' onClick={() => editJobPost(job.job_id)} >
                                        Edit
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
                                    <div className='flex items-center justify-center w-[80%] h-[38px] bg-[red] rounded-[10px] text-base font-[600] font-display text-[white] cursor-pointer hover:bg-[#fe4d4d] ' onClick={() => deleteJobPost(job.job_id)}>
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
