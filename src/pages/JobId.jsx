import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'; // Import React Select
import Navbar2Mob from '../components/Navbar2Mob';

function JobId() {
    const [jobId, setJobId] = useState(null); // Selected Job ID
    const [options, setOptions] = useState([]); // Options for the dropdown
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const navigate = useNavigate();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


    // Fetch job IDs from API
    useEffect(() => {
        const fetchJobIds = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/jobpost/getid`);
                const data = await response.json();
                if (data.success) {
                    const jobOptions = data.data.map((job) => ({
                        value: job.manualJobID || job.job_id, // Use manualJobID if available, else job_id
                        label: job.manualJobID ? `${job.manualJobID}` : `${job.job_id}`,
                    }));
                    setOptions(jobOptions);
                }
            } catch (error) {
                console.error('Error fetching job IDs:', error);
            }
        };

        fetchJobIds();
    }, []);

    const details = () => {
        if (!jobId) {
            alert('Please select a Job ID');
            return;
        }

        // Navigate with the selected job ID
        navigate('/details', { state: { jobId: `'${jobId.value}'` } }); // Wrap in quotes if manualJobID
    };

    return (
        <div className='min-h-screen flex flex-col'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='md:hidden flex flex-col'>
            <Navbar2Mob />
            </div>
            <div className='lg:px-12 px-3 lg:py-12 py-3 flex bg-[#eeebeb] justify-center items-center min-h-screen'>
                <div className='lg:w-[40%] w-[90%] h-[300px] rounded-[10px] bg-[white] flex flex-col p-8 gap-8'>
                    <span className='flex justify-center items-start w-full text-xl font-[600] font-display'>Job ID Search</span>
                    <div className='flex flex-col w-full'>
                        <span className='w-full text-left text-lg font-[400] font-display'>Job ID*</span>
                        <Select
                            options={options} // Pass fetched options
                            placeholder="Select Job ID"
                            onChange={(selectedOption) => setJobId(selectedOption)} // Set selected job ID
                            isSearchable={true} // Allow searching
                        />
                    </div>
                    <div
                        className='flex flex-col w-full h-[50px] rounded-[5px] bg-[black] justify-center items-center text-[white] font-[600] font-display text-lg cursor-pointer hover:bg-[#E22E37]'
                        onClick={details}
                    >
                        Submit
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default JobId;
