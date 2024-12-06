import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function JobNames() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [jobTitles, setJobTitles] = useState([]); // State to store the job titles
    const [filteredTitles, setFilteredTitles] = useState([]); // State for filtered job titles
    const [searchQuery, setSearchQuery] = useState(''); // State for search input
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        // Fetch data from the backend API
        fetch(`${apiBaseUrl}/datajobs`)
            .then((response) => response.json())
            .then((data) => {
                const titles = data.states[0].districts; // Access the districts array
                const filtered = titles.filter((title) => title.toLowerCase() !== 'all'); // Exclude "All"
                setJobTitles(filtered); // Update the state with the filtered job titles
                setFilteredTitles(filtered); // Initialize filtered titles
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []); // Empty dependency array ensures this runs once when the component mounts

    const navigate = useNavigate();

    // Function to navigate to the job details page
    const jobPage = (title) => {
        navigate('/jobs', { state: { jobTitle: title } });
    };

    // Handle search query change
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter job titles based on the search query
        const filtered = jobTitles.filter((title) =>
            title.toLowerCase().includes(query)
        );
        setFilteredTitles(filtered);
    };

    return (
        <div className='min-h-screen flex flex-col'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>

            <div className='lg:px-12 px-3 flex flex-col bg-[#eeebeb]'>
                {/* Search Bar */}
                <div className='py-6'>
                    <input
                        type='text'
                        placeholder='Search for job categories...'
                        className='w-full lg:w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Job Titles Grid */}
                <div className='grid py-12 lg:grid-cols-4 grid-cols-2 gap-4'>
                    {filteredTitles.length > 0 ? (
                        filteredTitles.map((title, index) => (
                            <div
                                key={index}
                                className='w-full h-[170px] flex justify-center items-center flex-col gap-3 bg-[white] rounded-[5px] p-2'
                            >
                                <span className='lg:text-lg text-base font-[600] font-display'>{title}</span>
                                {/* <div
                                    className='lg:w-[30%] w-[70%] h-[40px] bg-[#E22E37] rounded-md text-[white] font-[600] lg:text-base text-sm font-display flex justify-center items-center cursor-pointer hover:text-[black]'
                                    onClick={() => jobPage(title)}
                                >
                                    View Jobs
                                </div> */}
                            </div>
                        ))
                    ) : (
                        <p className='col-span-full text-center text-gray-500'>
                            No job categories found for "{searchQuery}".
                        </p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default JobNames;
