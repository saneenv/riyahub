import React, { useState, useEffect } from 'react'
import logo from '../images/navbar/newlogo.png'
import EmpOptions from './EmpOptions';
import { useNavigate } from 'react-router-dom'
import CandidateOpt from './CandidateOpt';
// import jobs from '../json/jobs.json'; 
// import location from '../json/cities.json';
import StaffOptions from './StaffOptions';
import Select from 'react-select';
// import smallloc from '../images/navbar/smallloc.png'

function NavbarMob() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const companyName = sessionStorage.getItem('customerName');
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();
    const customerType = sessionStorage.getItem('customerType');
    const [job, setJob] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [jobsOptions, setJobsOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [locationData, setLocationData] = useState(null);
    const [jobsData, setJobsData] = useState(null);

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

            // Extract districts from location data for the select dropdown
            const locations = locationData.states[0].districts.map(district => ({
                value: district,
                label: district,
            }));
            setLocationOptions(locations); // Set the location options once data is available
        }
    }, [locationData]);


    const fetchJobsData = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/datajobs`); // API endpoint for location data
            if (response.ok) {
                const data = await response.json();
                setJobsData(data); // Set the fetched data
            } else {
                console.error('Failed to fetch location data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    };

    useEffect(() => {
        fetchJobsData(); // Fetch location data when the component mounts
    }, []);

    useEffect(() => {
        if (jobsData) {


            // Extract districts from location data for the select dropdown
            const job = jobsData.states[0].districts.map(district => ({
                value: district,
                label: district,
            }));
            setJobsOptions(job); // Set the location options once data is available
        }
    }, [jobsData]);



    // Function to handle navigation with state
    const findJob = () => {
        const jobValue = job === 'All' ? '' : job; // Convert 'All' to an empty string
        navigate('/searchedjobs', { state: { job: jobValue, location: locationInput } }); // Passing adjusted job and location as state
    };



    // Function to toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Function to toggle the options component display
    const toggleOptions = () => {
        setShowOptions(!showOptions); // Toggle the state between true and false
    };

    const closeOptions = () => {
        setShowOptions(false); // Close the options modal
    };

    const home = () => {
        navigate('/home');
    };

    const login = () => {
        navigate('/login');
    };

    const regchooses = () => {
        navigate('/regchoose');
    };


    const contactus = () => {
        navigate('/contact');
    };

    const findjob = () => {
        navigate('/searchedjobs');
    };

    const jobcategories = () => {
        navigate('/jobcategories');
    };

    const jobidpage = () => {
        navigate('/jobid');
    };

    const martial = () => {
        navigate('/martialstatus');
    };

    const sevicespage = () => {
        navigate('/services');
    };

    const whatsappPage = () => {
        navigate('/whatsapp');
    };

    const datesearch = () => {
        navigate('/datesearch');
    };

    const jobnames = () => {
        navigate('/jobnames');
      };

    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            width: '100%',
            height: '100%',
            paddingLeft: '8px',
            border: '2px solid gray',
            borderRadius: '5px',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#E22E37' : 'white',
            color: state.isFocused ? 'white' : 'black',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black',
        }),
    };

    return (
        <div className='w-full h-[180px]  flex flex-col px-3 gap-3'>
            <div className='w-full flex flex-row gap-3 mt-3 justify-between items-center '>
                <img src={logo} alt="logo" className='w-[45%] h-[80%]' onClick={home} />
                <span className='text-base font-[500] font-display text-[#E22E37]' onClick={login}>Login</span>
                <span className='text-base font-[500] font-display text-[#E22E37]' onClick={regchooses}>Register</span>
                <button onClick={toggleSidebar} className="text-gray-700 hover:text-blue-500 focus:outline-none">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            <div className='w-full h-[40px]  rounded-[5px]'>
                <Select
                    styles={customSelectStyles}
                    options={jobsOptions.filter(option => option.value === 'All')}
                    placeholder="Select Job..."
                    value={job ? jobsOptions.find(option => option.value === job) : null}
                    onChange={(selectedOption) => setJob(selectedOption ? selectedOption.value : '')}
                    isClearable
                />
            </div>
            <div className='w-full flex flex-row h-[40px]  rounded-[5px]'>
                <div className='w-[70%] h-full'>
                    <Select
                        styles={customSelectStyles}
                        options={locationOptions}
                        placeholder="Select Location..."
                        value={locationOptions.find(option => option.value === locationInput)}
                        onChange={(selectedOption) => setLocationInput(selectedOption?.value || '')}
                        isClearable
                    />
                </div>
                <div className='w-[30%] bg-[#E22E37] h-full flex justify-center items-center text-[white] text-base font-[700] font-display cursor-pointer rounded-[5px]' onClick={findJob}>Find Job</div>
            </div>
            {/* Sidebar Component */}
            {isSidebarOpen && (
                <>
                    {/* Background Blur */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] z-40"
                        onClick={toggleSidebar}  // Clicking outside the sidebar will close it
                    ></div>
                    <div className={`fixed top-0 left-0 w-[250px] h-full bg-[black] text-white z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <button onClick={toggleSidebar} className="text-white w-full p-2 flex justify-end items-end mt-2">
                            <div className='border-2 border-[white] px-1 bg-[#E22E37] hover:bg-gray-700'>X</div>
                        </button>
                        <ul className='mt-5'>
                            <li className='p-4 hover:bg-gray-700 cursor-pointer' onClick={home}>Home</li>
                            <li className='p-4 hover:bg-gray-700 cursor-pointer' onClick={findjob}>Find Jobs</li>
                            {(customerType === 'admin' || customerType === 'mainAdmin') && (
                            <li className='p-4 hover:bg-gray-700 cursor-pointer' onClick={jobcategories}>Job By Categories</li>
                        )}
                            <li className='p-4 hover:bg-gray-700 cursor-pointer' onClick={jobnames}>Job Names</li>

                            <li className='p-4 hover:bg-gray-700 cursor-pointer' onClick={jobidpage}>Job ID Search</li>

                            {(customerType === 'admin' || customerType === 'mainAdmin') && (
                                <li className='p-4 hover:bg-gray-700 cursor-pointer' onClick={martial}>Martial Status</li>
                            )}
                            {(customerType === 'admin' || customerType === 'mainAdmin') && (
                                <li className='p-4 hover:bg-gray-700 cursor-pointer' onClick={whatsappPage}>To Whatsapp</li>
                            )}
                            {/* {(customerType === 'admin' || customerType === 'mainAdmin') && (
                                <li className='p-4 hover:bg-gray-700 cursor-pointer' onClick={datesearch}>Date Search</li>
                            )} */}

                            <li className='p-4 hover:bg-gray-700 cursor-pointer' onClick={sevicespage}>Services</li>

                            {/* <li className='p-4 hover:bg-gray-700 cursor-pointer'>Services</li> */}
                            <li className='p-4 hover:bg-gray-700 cursor-pointer' onClick={contactus}>Contact Us</li>
                        </ul>
                        <div className='w-[full] h-[8%] flex justify-center items-center mt-5'>
                            {companyName ? (
                                <div className='w-[60%] h-full border-2 border-[#E22E37] bg-[white] rounded-[5px] flex flex-row gap-4 cursor-pointer justify-center items-center' onClick={toggleOptions}>
                                    <span className='text-sm font-[600] font-display text-[black]'>{companyName}</span>

                                </div>
                            ) : (
                                <>
                                    {/* <div className='w-[30%] h-full flex justify-center items-center border-2 border-[#E22E37] rounded-[5px] text-sm font-[600] font-display cursor-pointer' onClick={login}>Login</div>
                                    <div className='w-[30%] h-full flex justify-center items-center border-2 border-[#E22E37] rounded-[5px] text-sm font-[600] font-display cursor-pointer' onClick={regchooses}>Register</div> */}
                                </>
                            )}

                        </div>
                    </div>
                </>
            )}
            {showOptions && (
                customerType === 'admin' ? (
                    <StaffOptions closeOptions={closeOptions} />
                ) : customerType === 'employee' ? (
                    <EmpOptions closeOptions={closeOptions} />
                ) : customerType === 'mainAdmin' ? (
                    <StaffOptions closeOptions={closeOptions} />
                ) : customerType === 'candidate' ? (
                    <CandidateOpt closeOptions={closeOptions} />
                ) : null
            )}

        </div>
    )
}

export default NavbarMob
