import React, { useState } from 'react';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { useMediaQuery } from 'react-responsive';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';

registerLocale('en-GB', enGB); // Set locale to format dates as dd/MM/yyyy

function DateSearch() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Format date to dd/MM/yyyy for display
  // Format date to dd/MM/yyyy
const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};


    // Fetch jobs based on date range in ISO format
    const fetchFilteredJobs = async () => {
        if (!startDate || !endDate) return; // Ensure both dates are selected

        setLoading(true);
        try {
            const response = await fetch(
                `${apiBaseUrl}/getjobposts?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`
            );
            if (response.ok) {
                const data = await response.json();
                setJobs(data.filter(job => {
                    const jobDate = new Date(job.created_at);
                    return jobDate >= startDate && jobDate <= endDate;
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

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className="md:flex hidden">
                <Navbar2 />
            </div>
            <div className="lg:px-12 px-3 lg:py-12 py-6 flex flex-col gap-8 bg-gray-100">
                {/* Date Picker Filters */}
                <div className="mb-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Filter Jobs by Date</h2>
                    <div className="flex justify-center gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                placeholderText="Select start date"
                                dateFormat="dd/MM/yyyy"
                                locale="en-GB"
                                className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                placeholderText="Select end date"
                                dateFormat="dd/MM/yyyy"
                                locale="en-GB"
                                className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                    </div>
                    <button
                        onClick={fetchFilteredJobs}
                        className="mt-6 bg-blue-500 text-white font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
                    >
                        Filter Jobs
                    </button>
                </div>

                {/* Job Listings */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <div className="text-center text-lg text-blue-500 col-span-full">Loading jobs...</div>
                    ) : jobs.length > 0 ? (
                        jobs.map(job => (
                            <div key={job.job_id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-200 ease-in-out">
                                {/* Job ID */}
                                <div className="text-lg font-bold text-gray-500 mb-2">Job ID: {job.manualJobID && job.manualJobID !== "0" ? job.manualJobID : job.job_id}</div>
                                
                                {/* Job Title */}
                                <h3 className="text-xl font-semibold text-gray-900">{job.job_title}</h3>
                                
                                {/* Job Description */}
                                <p className="text-gray-600 mt-2">{job.job_description}</p>
                                
                                {/* Job Details */}
                                <div className="mt-4 flex flex-wrap gap-2 items-center justify-center">
                                    <span className="px-3 py-1 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full">
                                        {job.location}
                                    </span>
                                    <span className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full">
                                        {job.job_type}
                                    </span>
                                    <span className="px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                        ₹{job.min_salary} - ₹{job.max_salary}
                                    </span>
                                </div>
                                
                                {/* Job Date */}
                                <div className="mt-2 text-sm text-gray-500">
                                    Posted on: {formatDateDisplay(job.created_at)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-lg text-gray-600 col-span-full">No jobs available for the selected date range</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DateSearch;
