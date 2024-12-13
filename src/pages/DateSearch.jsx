import React, { useState, useEffect } from 'react';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';
import * as XLSX from 'xlsx';
// import location from '../json/cities.json';

function DateSearch() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [locationCategory, setLocationCategory] = useState('');
    const [locationOptions, setLocationOptions] = useState([]);
    const [locationData, setLocationData] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

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
    


    const exportJobsToExcel = () => {
        if (jobs.length === 0) {
            alert('No jobs available to export');
            return;
        }
    
        // Prepare the job data for the Excel file
        const jobData = jobs.map((job, index) => ({
            "Job ID": job.manualJobID ? job.manualJobID : job.job_id,
            "Job": job.job,
            "Salary": job.salaryDisplay || 'N/A',
            "Qualification": job.qualification || 'N/A',
            "Location": job.location || 'N/A',
            "WhatsApp Number": job.whatsapp_number || 'N/A',
            "Gender": job.gender_type || 'N/A',
            "Experience": job.experienceType || 'N/A',
            "Vacancy": job.vacancy || 'N/A'
        }));
    
        // Create a new worksheet and workbook
        const worksheet = XLSX.utils.json_to_sheet(jobData);
    
        // Apply styles for the headers
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let C = range.s.c; C <= range.e.c; C++) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C }); // Header row is row 0
            if (worksheet[cellAddress]) {
                worksheet[cellAddress].s = {
                    font: { bold: true }, // Make header bold
                    alignment: { horizontal: 'center', vertical: 'center' } // Center-align header
                };
            }
        }
    
        // Align numeric values to the left
        for (let R = 1; R <= range.e.r; R++) {
            for (let C = range.s.c; C <= range.e.c; C++) {
                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                if (worksheet[cellAddress] && typeof worksheet[cellAddress].v === 'number') {
                    worksheet[cellAddress].s = {
                        alignment: { horizontal: 'left' } // Align numbers to the left
                    };
                }
            }
        }
    
        // Add styling to the worksheet
        worksheet['!cols'] = [
            { wch: 15 }, // Job ID column width
            { wch: 30 }, // Job column width
            { wch: 20 }, // Salary column width
            { wch: 20 }, // Qualification column width
            { wch: 20 }, // Location column width
            { wch: 25 }, // WhatsApp Number column width
            { wch: 15 }, // Gender column width
            { wch: 20 }, // Experience column width
            { wch: 15 }  // Vacancy column width
        ];
    
        // Create workbook and export to Excel
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Jobs');
    
        // Write file
        XLSX.writeFile(workbook, 'Jobs_List.xlsx');
    };
    
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className="md:flex hidden">
                <Navbar2 />
            </div>
            <div className="lg:px-12 px-3 lg:py-12 py-3 flex flex-col gap-8 bg-gray-100">
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
                        onClick={exportJobsToExcel}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Export Jobs to Excel
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

export default DateSearch;