import React, { useState, useEffect } from 'react';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

// import location from '../json/cities.json';

function Whatsapp() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [locationCategory, setLocationCategory] = useState('');
    const [locationOptions, setLocationOptions] = useState([]);
    const [locationData, setLocationData] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    // Fetch location data from the backend API
    const fetchLocationData = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/data`); // API endpoint for location data
            if (response.ok) {
                const data = await response.json();
                setLocationData(data); // Set the fetched data
            } else {
                console.error('Failed to fetch location data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    };

    useEffect(() => {
        fetchLocationData(); // Fetch location data when the component mounts
    }, []);


    useEffect(() => {
        if (locationData) {
            window.scrollTo(0, 0);

            // Extract districts from location data for the select dropdown
            const locations = locationData.states[0].districts.map(district => ({
                value: district,
                label: district,
            }));
            setLocationOptions(locations); // Set the location options once data is available
        }
    }, [locationData]);

    const handleLocationChange = selectedOption => {
        setLocationCategory(selectedOption ? selectedOption.value : '');
        if (selectedOption) {
            fetchJobs(selectedOption.value);
        }
    };

    const fetchJobs = async (location) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiBaseUrl}/jobpost/location/${location.toLowerCase()}`);
            if (response.ok) {
                const data = await response.json();
                setJobs(data.jobs);
            } else {
                console.error('Failed to fetch jobs:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        // Process job data to format salary values
        if (jobs.length > 0) {
            const processedJobs = jobs.map(job => {
                const { min_salary, max_salary } = job;
    
                // Determine the salary display
                let salaryDisplay = '';
                if (min_salary > 0 && max_salary > 0) {
                    salaryDisplay = `₹${min_salary} - ₹${max_salary}`;
                } else if (min_salary > 0) {
                    salaryDisplay = `₹${min_salary}`;
                } else if (max_salary > 0) {
                    salaryDisplay = `₹${max_salary}`;
                }
    
                // Return updated job object with a formatted salary field
                return {
                    ...job,
                    salaryDisplay,
                };
            });
    
            setJobs(processedJobs); // Update the state with formatted jobs
        }
    }, [jobs]); // Run whenever the jobs array is updated
    

    const sendJobsToWhatsApp = () => {
        if (jobs.length === 0) {
            alert('No jobs available to send');
            return;
        }

        // Format the job details in Malayalam
        const jobText = jobs.map((job, index) =>
            `*${index + 1}. JOB ID - ${job.job_id}\n` +
            `ജോലി - ${job.job_title}*\n` +
            `ശമ്പളം - ${job.salaryDisplay}\n` +
            `ക്വാളിഫിക്കേഷൻ - ${job.qualification}\n` +
            `സ്ഥലം - ${job.location}\n` +
            `നമ്പർ - ${job.whatsapp_number}`
        ).join('\n\n');

        // Extra official data in Malayalam
        const officialText = `RIYA HUB - JOB PORTAL
        
     
        `;

        // Combine job data with the official information
        const fullText = `നാട്ടിലെ ജോലി ഒഴിവുകൾ\n\n${jobText}\n\n${officialText}`;

        // Prepare message to send (ensure it's properly encoded)
        const encodedMessage = fullText; // No need to encodeURIComponent here, backend will handle that

        // Send the message via backend API
        fetch(`${apiBaseUrl}/send-whatsapp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: '919544500746', // Recipient's number
                message: encodedMessage, // Message content
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Message sent successfully!');
                } else {
                    alert(`message sent successfully`);
                }
            })
            .catch((error) => {
                console.error('Error sending message:', error);
                alert('Failed to send message');
            });
    };

    
    const datesearch = () => {
        navigate('/datesearch');
      };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className="md:flex hidden">
                <Navbar2 />
            </div>
            <div className="lg:px-12 px-3 lg:py-12 py-3 flex flex-col gap-8 bg-gray-100">
            <div className="w-full flex justify-center">
          <button className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-green-400 transition duration-300 ease-in-out transform hover:scale-105" onClick={datesearch}>
            Date Search
          </button>
        </div>
                {/* Location Selector */}
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-center mb-4 ">Select Location</h2>
                    <Select
                        options={locationOptions}
                        onChange={handleLocationChange}
                        placeholder="Select Location"
                        className="w-full"
                        classNamePrefix="select"
                        isClearable
                        value={locationOptions.find(option => option.value === locationCategory) || null}
                        styles={{
                            control: (base) => ({ ...base }),
                            placeholder: (base) => ({ ...base }),
                        }}
                    />
                </div>


                <div className="text-center ">
                    <button
                        onClick={sendJobsToWhatsApp}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Send Jobs to WhatsApp
                    </button>
                </div>
                {/* Job Listings */}
                <div className="flex flex-col gap-6">
                    {loading ? (
                        <div className="text-center text-lg text-blue-500">Loading jobs...</div>
                    ) : jobs.length > 0 ? (
                        jobs.map(job => (
                            <div key={job.job_id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900">{job.job_title}</h3>
                                <p className="text-gray-700">{job.job_description}</p>
                                <div className="mt-4">
                                    <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full">
                                        {job.location}
                                    </span>
                                    <span className="inline-block ml-2 px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full">
                                        {job.job_type}
                                    </span>
                                    <span className="inline-block ml-2 px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                        {job.min_salary > 0 && job.max_salary > 0
                                            ? `₹${job.min_salary} - ₹${job.max_salary}`
                                            : job.min_salary > 0
                                                ? `₹${job.min_salary}`
                                                : job.max_salary > 0
                                                    ? `₹${job.max_salary}`
                                                    : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-lg text-gray-600">No jobs available for the selected location</div>
                    )}
                </div>

                {/* Download Button */}

            </div>
            <Footer />
        </div>
    );
}

export default Whatsapp;
