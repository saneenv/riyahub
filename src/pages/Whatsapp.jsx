import React, { useState, useEffect } from 'react';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';

function Whatsapp() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [locationCategory, setLocationCategory] = useState(null);
    const [locationOptions, setLocationOptions] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [whatsappLoading, setWhatsappLoading] = useState(false);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Fetch location options
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/data`);
                if (response.ok) {
                    const data = await response.json();
                    const locations = data.states[0].districts.map(district => ({
                        value: district,
                        label: district,
                    }));
                    setLocationOptions(locations);
                } else {
                    console.error('Failed to fetch locations');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        fetchLocations();
    }, [apiBaseUrl]);

    // Fetch filtered jobs based on date and location
    const fetchFilteredJobs = async () => {
        if (!startDate || !endDate || !locationCategory) return;
    
        setLoading(true);
        try {
            const response = await fetch(
                `${apiBaseUrl}/getjobposts?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}&location=${locationCategory.value}`
            );
            if (response.ok) {
                const data = await response.json();
                setJobs(data.filter(job => {
                    const jobDate = new Date(job.created_at);
                    
                    // Start and End date are on the same day
                    if (startDate.toDateString() === endDate.toDateString()) {
                        return (
                            jobDate.toDateString() === startDate.toDateString() &&
                            job.location === locationCategory.value
                        );
                    }
    
                    // Date range filtering
                    return (
                        jobDate >= startDate &&
                        jobDate <= endDate &&
                        job.location === locationCategory.value
                    );
                }));
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


    // Send jobs to WhatsApp
    const sendToWhatsApp = async () => {
        if (jobs.length === 0) return;

        setWhatsappLoading(true);
        const jobText = jobs.map((job, index) =>
            `*${index + 1}. JOB ID - ${job.job_id}\n` +
            `Job Title: ${job.job_title}\n` +
            `Salary: ${job.salaryDisplay}\n` +
            `Qualification: ${job.qualification}\n` +
            `Location: ${job.location}`
        ).join('\n\n');


         // Determine the phone number based on the location
    const defaultPhoneNumber = '*9544500746*';
    const mannarkkadPhoneNumber = '*7356400746*';
    const phoneNumber = jobs.some(job => job.location === 'Mannarkkad') 
        ? mannarkkadPhoneNumber 
        : defaultPhoneNumber;

    // Extra official data in Malayalam
    const officialText = `RIYA HUB - JOB PORTAL\nനമ്പർ - ${phoneNumber}`;

        // Combine job data with the official information
        const fullText = `നാട്ടിലെ ജോലി ഒഴിവുകൾ\n\n${jobText}\n\n${officialText}`;

        // Prepare message to send (ensure it's properly encoded)
        const encodedMessage = fullText; // No need to encodeURIComponent here, backend will handle that


        try {
            const response = await fetch(`${apiBaseUrl}/send-whatsapp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to: '919544500746', message: encodedMessage, }),
            });

            if (response.ok) {
                alert('Message sent successfully!');
            } else {
                console.error('Failed to send WhatsApp message');
            }
        } catch (error) {
            console.error('Error sending WhatsApp message:', error);
        } finally {
            setWhatsappLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className="md:flex hidden">
                <Navbar2 />
            </div>
            <div className="lg:px-12 px-3 lg:py-12 py-6 flex flex-col gap-8 bg-gray-100">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Select start date"
                            dateFormat="dd/MM/yyyy"
                            className="w-full py-2 px-4 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            placeholderText="Select end date"
                            dateFormat="dd/MM/yyyy"
                            className="w-full py-2 px-4 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="w-64">
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <Select
                            options={locationOptions}
                            value={locationCategory}
                            onChange={setLocationCategory}
                            placeholder="Select location"
                        />
                    </div>
                </div>
                <button
                    onClick={fetchFilteredJobs}
                    className="mt-6 bg-blue-500 text-white font-semibold py-2 px-8 rounded-lg"
                >
                    Filter Jobs
                </button>

                {/* Job Listings */}
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.map(job => (
                            <div key={job.job_id} className="bg-white p-4 shadow rounded">
                                <h3 className="text-xl font-bold">{job.job_title}</h3>
                                <p>{job.location}</p>
                                <p>{job.salaryDisplay}</p>
                                <p>
                                    Posted: {new Date(job.created_at).toLocaleDateString('en-GB')}
                                </p>

                            </div>
                        ))}
                    </div>
                )}

                {/* Send to WhatsApp */}
                {jobs.length > 0 && (
                    <button
                        onClick={sendToWhatsApp}
                        className="bg-green-500 text-white py-2 px-8 rounded-lg"
                        disabled={whatsappLoading}
                    >
                        {whatsappLoading ? 'Sending...' : 'Send via WhatsApp'}
                    </button>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Whatsapp;
