import React, { useState, useEffect } from 'react';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { useMediaQuery } from 'react-responsive';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import enGB from 'date-fns/locale/en-GB';

registerLocale('en-GB', enGB); // Set locale to format dates as dd/MM/yyyy

function DateSearch() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [whatsappLoading, setWhatsappLoading] = useState(false); // For loading state when sending WhatsApp message
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  // Format date to dd/MM/yyyy for display
  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchFilteredJobs = async () => {
    if (!startDate || !endDate) return; // Ensure both dates are selected

    setLoading(true);
    try {
      const response = await fetch(
        `${apiBaseUrl}/getjobposts?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`
      );
      if (response.ok) {
        const data = await response.json();
        setJobs(data.filter((job) => {
          const jobDate = new Date(job.created_at);
          if (startDate.getTime() === endDate.getTime()) {
            return jobDate.toDateString() === startDate.toDateString();
          } else {
            return jobDate >= startDate && jobDate <= endDate;
          }
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

  // Function to send filtered job data to WhatsApp
  // Function to send filtered job data to WhatsApp
  const sendToWhatsApp = async () => {
    if (jobs.length === 0) return; // Ensure there are jobs to send

    setWhatsappLoading(true);



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

    try {
      const response = await fetch(`${apiBaseUrl}/send-whatsapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: '919544500746', // Replace with actual number
          message: encodedMessage,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Message sent successfully!');
      } else {
        alert('Message sent successfully!');
      }
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      alert('Failed to send message');
    } finally {
      setWhatsappLoading(false);
    }
  };

  const whatsappPage = () => {
    navigate('/whatsapp');
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {isMobile ? <NavbarMob /> : <Navbar />}
      <div className="md:flex hidden">
        <Navbar2 />
      </div>
      <div className="lg:px-12 px-3 lg:py-12 py-6 flex flex-col gap-8 bg-gray-100">
        {/* Date Picker Filters */}
        <div className="w-full flex justify-center">
          <button className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-green-400 transition duration-300 ease-in-out transform hover:scale-105" onClick={whatsappPage}>
            Location Search
          </button>
        </div>
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
            jobs.map((job) => (
              <div key={job.job_id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-200 ease-in-out">
                <div className="text-lg font-bold text-gray-500 mb-2">
                  Job ID: {job.manualJobID || job.job_id}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{job.job_title}</h3>
                <p className="text-gray-600 mt-2">{job.job_description}</p>
                <div className="mt-4 flex flex-wrap gap-2 items-center justify-center">
                  <span className="px-3 py-1 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full">
                    {job.location}
                  </span>
                  <span className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full">
                    {job.job_type}
                  </span>
                  <span className="px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                    {job.min_salary > 0 && job.max_salary > 0
                      ? `₹${job.min_salary} - ₹${job.max_salary}`
                      : job.min_salary > 0
                        ? `₹${job.min_salary}`
                        : job.max_salary > 0
                          ? `₹${job.max_salary}`
                          : 'N/A'}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Posted on: {formatDateDisplay(job.created_at)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-lg text-gray-600 col-span-full">No jobs available for the selected date range</div>
          )}
        </div>

        {/* Send to WhatsApp Button */}
        {jobs.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={sendToWhatsApp}
              className="bg-green-500 text-white font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out"
              disabled={whatsappLoading}
            >
              {whatsappLoading ? 'Sending...' : 'Send Jobs via WhatsApp'}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DateSearch;
