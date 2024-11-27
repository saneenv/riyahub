import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
import { useMediaQuery } from 'react-responsive';
import Navbar from '../components/Navbar';
import NavbarMob from '../components/NavbarMob';

function EnableJobPost() {
  const [jobPosts, setJobPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    employee_id: '',
    job: '',
    location: '',
    job_id: '', // Added job_id for search filtering
  });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  // Fetch job posts data from the API
  useEffect(() => {
    fetch(`${apiBaseUrl}/getjobposts`)
      .then((response) => response.json())
      .then((data) => setJobPosts(data))
      .catch((error) => console.error('Error fetching job posts:', error));
  }, [apiBaseUrl]);

  // Filter job posts based on the search query
  const filteredJobPosts = jobPosts.filter((job) => {
    const displayedJobId = job.manualJobID && job.manualJobID !== "0" ? job.manualJobID : job.job_id;
    return (
      job.employee_id.toString().includes(searchQuery.employee_id) &&
      job.job.toLowerCase().includes(searchQuery.job.toLowerCase()) &&
      job.location.toLowerCase().includes(searchQuery.location.toLowerCase()) &&
      displayedJobId.toString().includes(searchQuery.job_id) // Use displayedJobId here
    );
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  // Toggle enable status
  const handleToggle = async (jobId, currentEnableStatus) => {
    const newEnableStatus = currentEnableStatus === 'off' ? 'on' : 'off';

    setJobPosts((prevPosts) =>
      prevPosts.map((job) =>
        job.job_id === jobId ? { ...job, enable: newEnableStatus } : job
      )
    );

    try {
      const response = await fetch(`${apiBaseUrl}/updateJobEnable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          enable: newEnableStatus,
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('Job enable status updated successfully');
      } else {
        console.error('Failed to update status:', result.message);
      }
    } catch (error) {
      console.error('Error updating job enable status:', error);
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      {isMobile ? <NavbarMob /> : <Navbar />}
      <div className='md:flex hidden'>
        <Navbar2 />
      </div>

      <div className='flex flex-col gap-8 px-3 mt-12 pb-12 sm:px-6 lg:px-12'>
        <h1 className='text-xl font-bold text-center text-gray-800'>
          Job Post Requests
        </h1>
   

        {/* Search Inputs */}
        <div className='flex lg:flex-row flex-col gap-4 mb-6 justify-center items-center'>
          <input
            type='text'
            name='employee_id'
            placeholder='Search by Employee ID'
            value={searchQuery.employee_id}
            onChange={handleSearchChange}
            className='border border-[gray] p-2 rounded-lg '
          />
          <input
            type='text'
            name='job'
            placeholder='Search by Job'
            value={searchQuery.job}
            onChange={handleSearchChange}
            className='border border-[gray] p-2 rounded-lg'
          />
          <input
            type='text'
            name='location'
            placeholder='Search by Location'
            value={searchQuery.location}
            onChange={handleSearchChange}
            className='border border-[gray] p-2 rounded-lg'
          />
            <input
            type='text'
            name='job_id' // Added input field for job_id search
            placeholder='Search by Job ID'
            value={searchQuery.job_id}
            onChange={handleSearchChange}
            className='border border-[gray] p-2 rounded-lg'
          />
        </div>

        {/* Table displaying job posts */}
        <div className='overflow-x-auto'>
          <table className='table-auto w-full border-collapse bg-gray-50'>
            <thead>
              <tr className='bg-blue-600 text-white'>
                <th className='border p-2'>Employee ID</th>
                <th className='border p-2'>Job ID</th>
                <th className='border p-2'>Job</th>
                <th className='border p-2'>Location</th>
                <th className='border p-2'>Company Type</th>
                <th className='border p-2'>Email</th>
                <th className='border p-2'>Number</th>
                <th className='border p-2'>Accept</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobPosts.map((job) => (
                <tr
                  key={job.job_id}
                  className='hover:bg-gray-100 transition duration-200'
                >
                  <td className='border p-2'>{job.employee_id}</td>
                  <td className='border p-2'>{job.manualJobID && job.manualJobID !== "0" ? job.manualJobID : job.job_id}</td>
                  <td className='border p-2'>{job.job}</td>
                  <td className='border p-2'>{job.location}</td>
                  <td className='border p-2'>{job.company_type}</td>
                  <td className='border p-2'>{job.email}</td>
                  <td className='border p-2'>{job.whatsapp_number}</td>
                  <td className='border p-2 text-center'>
                    <button
                      className={`${
                        job.enable === 'on' ? 'bg-green-500' : 'bg-red-500'
                      } text-white px-4 py-2 rounded-lg`}
                      onClick={() => handleToggle(job.job_id, job.enable)}
                    >
                      {job.enable === 'on' ? 'On' : 'Off'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='mt-12'>
        <Footer />
      </div>
    </div>
  );
}

export default EnableJobPost;
