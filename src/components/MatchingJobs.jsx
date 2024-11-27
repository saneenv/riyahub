import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import filter from '../images/search/Filter.png'
import Select from 'react-select'; // Importing react-select
import jobs from '../json/jobs.json';
// import location from '../json/cities.json'
import vector from '../images/home/Vector.png'

function MatchingJobs() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [jobsCategory, setJobsCategory] = useState('');
    const [jobsOptions, setJobsOptions] = useState([]);
    const [locationCategory, setLocationCategory] = useState('');
    const [locationOptions, setLocationOptions] = useState([]);
    const [jobType, setJobType] = useState(null); // State for storing gender
    const [gender, setGender] = useState(null); // State for storing gender
    const [foodType, setFoodType] = useState(null); // State for storing gender
    const [jobsApi, setJobsApi] = useState([]);
    const [locationData, setLocationData] = useState(null);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    // Fetch values from sessionStorage when component mounts
    useEffect(() => {
        const preferredJob = sessionStorage.getItem('preferredJob') ? sessionStorage.getItem('preferredJob').split(",") : [];
        const preferredLocation = sessionStorage.getItem('preferredLocation') ? sessionStorage.getItem('preferredLocation').split(",") : [];

        const jobTypes = sessionStorage.getItem('jobType');
        const genderType = sessionStorage.getItem('gender');
        const storedFoodType = sessionStorage.getItem('foodType');

        setJobsCategory(preferredJob || null);
        setLocationCategory(preferredLocation || null);
        setJobType(jobTypes || null);
        setGender(genderType || null);
        setFoodType(storedFoodType || null);
    }, []);


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

            // Extract districts from location data for the select dropdown
            const locations = locationData.states[0].districts.map(district => ({
                value: district,
                label: district,
            }));
            setLocationOptions(locations); // Set the location options once data is available
        }
    }, [locationData]);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Extract districts from the imported JSON data
        const job = jobs.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

   




        setJobsOptions(job); // Set district options for the select



    }, []);

    // Handle changes for multi-select
    const handleJobsChange = (selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setJobsCategory(selectedValues);
    };

    const handleLocationChange = (selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setLocationCategory(selectedValues);
    };
    const handleJobTypeChange = (selectedOption) => {
        setJobType(selectedOption ? selectedOption.value : null);
    };

    const handleGenderChange = (selectedOption) => {
        setGender(selectedOption ? selectedOption.value : null);
    };


    const handleFoodChange = (selectedOption) => {
        setFoodType(selectedOption ? selectedOption.value : null);
    };


    // Options for Job Type
    const jobTypeOptions = [
        { value: 'any', label: 'Any' },
        { value: 'fulltime', label: 'Full-time' },
        { value: 'parttime', label: 'Part-time' },
        { value: 'remote', label: 'Remote/Work at Home' }
    ];

    // Options for Gender
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
    ];

    const foodTypeOptions = [
        { value: 'no', label: 'No' },
        { value: 'yes', label: 'Yes' },
        { value: 'Accomodationonly', label: 'Accomodation Only' },
        { value: 'Foodonly', label: 'Food Only' }
    ];

    const customStyles2 = {
        control: (base) => ({
            ...base,
            height: '43px',
            borderRadius: '5px',
            border: '2px solid #D7D7D7',
            paddingLeft: '4px',

        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: '#E0E0E0', // Change background color if needed
            borderRadius: '3px',
            padding: '2px 6px',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: 'black', // Change text color if needed
            fontSize: '12px', // Adjust font size
        }),
        multiValueRemove: (base) => ({
            ...base,
            cursor: 'pointer',
            ':hover': {
                backgroundColor: '#D7D7D7', // Change background on hover
                color: 'red', // Change text color on hover
            },
        }),
        menu: (base) => ({
            ...base,
            zIndex: 9999, // Ensure menu is above other elements
        }),
    };

    // Fetch data from the API
    // Fetch data using fetch
    // Fetch data based on filter
    useEffect(() => {
        // Construct API URL with filter params
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${apiBaseUrl}/filterjobposts?job=${jobsCategory || ''}&location=${locationCategory || ''}&job_type=${jobType || ''}&gender_type=${gender || ''}&food_type=${foodType || ''}`
                );
                const data = await response.json();
                const enabledJobPosts = data.filter(job => job.enable === 'on');
                setJobsApi(enabledJobPosts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the function whenever a filter value changes
        fetchData();
    }, [apiBaseUrl, jobsCategory, locationCategory, jobType, gender, foodType]);

    const [visibleJobs, setVisibleJobs] = useState(6); // Initial number of jobs to display

    // Handler to load more jobs
    const loadMoreJobs = () => {
        setVisibleJobs((prevVisible) => prevVisible + 6); // Increase the number of visible jobs by 9
    };
    const handleClearAll = () => {
        setJobsCategory(null);  // Clear the job category selection
        setLocationCategory(null);  // Clear the location selection
        setJobType(null);  // Clear the job type selection
        setGender(null);  // Clear the gender selection
        setFoodType(null);  // Clear the food type selection
    };


    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const toggleFilter = () => {
        setIsFilterVisible(prev => !prev);
    };

    const navigate = useNavigate();
    // const HomePage = () => {
    // Navigate to details page with job_id passed as state
    const details = (jobId) => {
        navigate('/details', { state: { jobId } }); // Pass job_id as state
    };

    
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
            <div className='flex w-full px-2 bg-[#eeebeb] lg:flex-row flex-col gap-3 py-6'>
                <div className='lg:w-[25%] w-full lg:h-[600px] h-auto  rounded-[10px] flex flex-col '>
                    <div className='w-full h-[50px] bg-[white]  rounded-t-[10px] p-5 flex justify-between items-center border-b-2 border-[#d2d0d0]'>
                        <div className=' flex flex-row gap-2'>
                            <img src={filter} alt="filter" className='cursor-pointer' onClick={toggleFilter} />
                            <span className='text-lg font-[500] font-display'>Search Job</span>
                        </div>
                        {/* <span className='text-base font-[500] font-display cursor-pointer hover:text-[#E22E37]' onClick={handleClearAll}>clear all</span> */}

                    </div>
                    {isFilterVisible && (
                        <div className='p-5 flex flex-col gap-5 w-full bg-[white] rounded-b-[10px]'>
                            <div className='w-full flex flex-col gap-2'>
                                <span className='text-left font-display text-base font-[500]'>Select Preferred Job</span>
                                <Select
                                    options={jobsOptions}
                                    onChange={handleJobsChange}
                                    placeholder="Select"
                                    className='w-auto'
                                    classNamePrefix='select'
                                    isClearable={true}
                                    isMulti={true}
                                    value={jobsOptions.filter(option => jobsCategory.includes(option.value))}
                                    styles={customStyles2}
                                />
                            </div>
                            <div className='w-full flex flex-col gap-2'>
                                <span className='text-left font-display text-base font-[500]'>Select Preferred Location</span>
                                <Select
                                    options={locationOptions}
                                    onChange={handleLocationChange}
                                    placeholder="Select Location"
                                    className='w-full'
                                    classNamePrefix='select'
                                    isClearable={true}
                                    isMulti={true}
                                    value={locationOptions.filter(option => locationCategory.includes(option.value))}
                                    styles={customStyles2}
                                />
                            </div>
                            <div className='w-full flex flex-col gap-2'>
                                <span className='text-left font-display text-base font-[500]'>Select Job Type</span>
                                <Select
                                    options={jobTypeOptions}
                                    onChange={handleJobTypeChange}
                                    placeholder="Select Job Type"
                                    classNamePrefix="react-select"
                                    isClearable={true}
                                    value={jobTypeOptions.find(option => option.value === jobType) || null}
                                    styles={customStyles2}
                                />
                            </div>
                            <div className='w-full flex flex-col gap-2'>
                                <span className='text-left font-display text-base font-[500]'>Male / Female</span>
                                <Select
                                    options={genderOptions}
                                    onChange={handleGenderChange}
                                    placeholder="Select Gender"
                                    classNamePrefix="react-select"
                                    isClearable={true}
                                    value={genderOptions.find(option => option.value === gender) || null}
                                    styles={customStyles2}
                                />
                            </div>
                            <div className='w-full flex flex-col gap-2'>
                                <span className='text-left font-display text-base font-[500]'>Food & Accommodation</span>
                                <Select
                                    options={foodTypeOptions}
                                    onChange={handleFoodChange}
                                    placeholder="Select Food Type"
                                    classNamePrefix="react-select"
                                    isClearable={true}
                                    value={foodTypeOptions.find(option => option.value === foodType) || null}
                                    styles={customStyles2}
                                />
                            </div>


                        </div>
                    )}

                </div>
                <div className='lg:w-[75%] w-full h-auto bg-[white]  flex flex-col gap-3  lg:p-5 p-2'>
                    <div className='grid lg:grid-cols-3 grid-cols-1 w-full gap-3'>
                        {jobsApi.length > 0 ? (
                            jobsApi.slice(0, visibleJobs).map((job) => (
                                <div
                                    key={job.job_id}
                                    className='lg:h-[292px] h-[320px] border-2 border-[#C5C5C5] w-full rounded-[10px] flex flex-col overflow-hidden'
                                >
                                    <div className='w-full h-[30%] bg-[white] border-b-2 border-[#C5C5C5] p-2 gap-2 flex justify-center items-center flex-col'>
                                        <span className='text-[black] text-xl font-[700] font-display'>{formatJobTitle(job.job_title)}</span>
                                        <div className='flex flex-row gap-1 items-center justify-center '>
                                            <img src={vector} alt="loc" />
                                            <span className='text-sm font-[500] font-display text-[black]'>{job.location}</span>
                                        </div>
                                    </div>
                                    <div className='w-full h-[70%] flex flex-row'>
                                        <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                            <div className='flex items-center justify-between w-full'>
                                                <span className='text-sm font-display font-[600]'>JOB ID</span>
                                                <span className='text-sm font-display font-[600]'>:</span>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-sm font-display font-[600]'>COMPANY TYPE</span>
                                                <span className='text-sm font-display font-[600]'>:</span>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-sm font-display font-[600]'>JOB TYPE</span>
                                                <span className='text-sm font-display font-[600]'>:</span>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-sm font-display font-[600]'>GENDER</span>
                                                <span className='text-sm font-display font-[600]'>:</span>
                                            </div>
                                            <div className='flex items-center justify-center w-[80%] h-[38px] bg-[black] rounded-[10px] text-base font-[600] font-display text-[white] cursor-pointer hover:bg-[#E22E37]' onClick={() => details(job.job_id)}>
                                                Apply Now
                                            </div>
                                        </div>
                                        <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-2'>
                                            <div className='flex items-center justify-between w-full'>
                                                <span className='text-sm font-display font-[500]'>{job.job_id}</span>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-sm font-display font-[500]'>{job.company_type}</span>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-sm font-display font-[500]'>{job.job_type}</span>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-sm font-display font-[500]'>{job.gender_type}</span>
                                            </div>
                                            <div className='flex items-center justify-center w-[80%] h-[38px] bg-[black] rounded-[10px] text-base font-[600] font-display text-[white] cursor-pointer hover:bg-[#E22E37]' onClick={() => details(job.job_id)}>
                                                Job Details
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No jobs available</p>
                        )}
                        {/* Load More Button */}





                    </div>
                    {/* Load More Button */}
                    {visibleJobs < jobsApi.length && (
                        <div className='flex justify-center mt-4'>
                            <button
                                className='bg-[black] text-white px-4 py-2 rounded-md text-lg font-semibold hover:bg-[#E22E37]'
                                onClick={loadMoreJobs}
                            >
                                View More
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MatchingJobs