import React, { useState, useEffect } from 'react';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx';




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
    const [currentChunk, setCurrentChunk] = useState(0); // Tracks the current batch of jobs
    const jobsPerBatch = 4; // Number of jobs per WhatsApp message
    const navigate = useNavigate();



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

                    // Only include jobs where enable is "on"
                    if (job.enable !== "on") return false;

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

    const chunkJobs = (jobs, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < jobs.length; i += chunkSize) {
            chunks.push(jobs.slice(i, i + chunkSize));
        }
        return chunks;
    };



    const sendAllToWhatsApp = async () => {
        const jobChunks = chunkJobs(jobs, 4); // Split jobs into chunks of 5
        setWhatsappLoading(true);

        try {
            for (let i = 0; i < jobChunks.length; i++) {
                const jobBatch = jobChunks[i];
                const startIndex = i * 4;

                const jobText = jobBatch.map((job, index) => {
                    const jobIDToDisplay = job.manualJobID ? job.manualJobID : job.job_id; // Check if manualJobID is present and not null, 0, or undefined
                    return (
                        `*${startIndex + index + 1}. JOB ID - ${jobIDToDisplay}\n` +
                        `Job Title: ${job.job_title}\n` +
                        `Salary: ${job.salaryDisplay}\n` +
                        `Gender: ${job.gender_type}\n` +
                        `Qualification: ${job.qualification}\n` +
                        `Experience: ${job.experienceType}\n` +
                        `Vacancy: ${job.vacancy}\n` +
                        `Location: ${job.location}`
                    );
                }).join('\n\n');


                const phoneNumber = jobBatch.some(job => job.location === 'Mannarkkad')
                    ? '*7356400746*'
                    : '*9544500746*';

                const officialText = `RIYA HUB - JOB PORTAL\nനമ്പർ - ${phoneNumber}`;
                const fullText = `നാട്ടിലെ ജോലി ഒഴിവുകൾ\n\n${jobText}\n\n${officialText}`;
                const encodedMessage = fullText;

                // Send this chunk as a WhatsApp message
                await fetch(`${apiBaseUrl}/send-whatsapp`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ to: '919544500746', message: encodedMessage }),
                });

                alert(`Batch ${startIndex + 1}-${startIndex + jobBatch.length} sent successfully!`);
            }
        } catch (error) {
            console.error('Error sending WhatsApp messages:', error);
        } finally {
            setWhatsappLoading(false);
        }
    };


    const exportJobsToExcel = () => {
        if (jobs.length === 0) {
            alert('No jobs available to export');
            return;
        }

        // Prepare the job data for the Excel file
        const jobData = jobs.map((job, index) => ({
            "Job ID": job.manualJobID ? job.manualJobID : job.job_id,
            "Job": job.job,
            "Salary": job.salaryDisplay || job.salaryType,
            "Qualification": job.qualification || 'N/A',
            "Location": job.location || 'N/A',
            "Gender": job.gender_type || 'N/A',
            "Experience": job.experienceType || 'N/A',
            "Vacancy": job.vacancy || 'N/A',
            "Start Time": job.start_time || 'N/A',
            "End Time": job.end_time || 'N/A',
            "Description": job.job_description || 'N/A'

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

    const exportHistoryDataToExcel = async () => {
        try {
          // Fetch data from the API using fetch
          const response = await fetch(`${apiBaseUrl}/getAllPackageSelections`);
      
          // Check if the response is successful
          if (response.ok) {
            const data = await response.json();
      
            // Check if the response contains the data
            if (data && data.data) {
              const sortedData = data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
              // Map the data to exclude the 'id' column and format 'created_at'
              const formattedData = sortedData.map((item) => {
                // Remove 'id' and format 'created_at'
                const { id, ...rest } = item;
                return {
                  ...rest,
                  created_at: new Date(item.created_at).toLocaleDateString("en-GB"),
                };
              });
      
              // Define custom headers
              const headers = [
                "Applied Candidate Name",
                "Applied Job ID",
                "Applied Date",
                "Applied Candidate Whatsapp Number",
                "Applied Candidate Mobile Number",
                "Applied Candidate Email",
                "Applied Company ID"
              ];
      
              // Map formatted data to match custom headers
              const customData = formattedData.map((item) => [
                item.customerName,
                item.jobId,
                item.created_at,
                item.whatsappNumber,
                item.mobileNumber,
                item.Email,
                item.employeeId
              ]);
      
              // Add custom headers to the top of the data
              customData.unshift(headers);
      
              // Create a worksheet from the custom data
              const ws = XLSX.utils.aoa_to_sheet(customData);
      
              // Set fixed column widths (in characters)
              const colWidths = [
                { wch: 25 }, // Applied Candidate Name
                { wch: 10 }, // Applied Job ID
                { wch: 10 }, // Applied Date
                { wch: 25 }, // Applied Candidate Whatsapp Number
                { wch: 25 }, // Applied Candidate Mobile Number
                { wch: 35 }, // Applied Candidate Email
                { wch: 10 }, // Applied Company ID
              ];
      
              // Apply fixed column widths to the worksheet
              ws['!cols'] = colWidths;
      
              // Create a new workbook
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "Package Selections");
      
              // Export the workbook as an Excel file
              XLSX.writeFile(wb, "PackageSelections.xlsx");
            } else {
              console.error("No data available in the response");
            }
          } else {
            console.error("Error fetching data:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching or exporting data:", error);
        }
      };
      
    // const toexcel = () => {
    //     navigate('/toexcel');
    // };


    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className="md:flex hidden">
                <Navbar2 />
            </div>
            <div className='lg:px-12 px-3 pt-2 flex  gap-8 bg-gray-100 justify-between'>
                <FontAwesomeIcon
                    icon={faFileExcel}
                    className="text-green-600 text-4xl cursor-pointer"
                    onClick={exportJobsToExcel}
                />
                <FontAwesomeIcon
                    icon={faHistory}
                    className="text-green-600 text-4xl cursor-pointer"
                    onClick={exportHistoryDataToExcel}
                />
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
                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={sendAllToWhatsApp}
                            className="bg-blue-500 text-white py-2 px-8 rounded-lg"
                            disabled={whatsappLoading}
                        >
                            {whatsappLoading ? 'Sending All...' : 'Send All Jobs'}
                        </button>
                    </div>

                )}


            </div>
            <Footer />
        </div>
    );
}

export default Whatsapp;
