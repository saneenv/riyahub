import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import logo from '../images/navbar/newlogo.png'
import search from '../images/navbar/Vector.png'
import location from '../images/navbar/location.png'
// import smallloc from '../images/navbar/smallloc.png'
import { useNavigate } from 'react-router-dom'
import EmpOptions from './EmpOptions'
import CandidateOpt from './CandidateOpt'
import jobs from '../json/jobs.json'; // Import jobs
import locationData from '../json/cities.json'; // Import location data
import StaffOptions from './StaffOptions'

function Navbar() {
    const navigate = useNavigate();
    const companyName = sessionStorage.getItem('customerName');
    // State to store job and location values
    const [job, setJob] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [showOptions, setShowOptions] = useState(false); // State to track if options are shown
    const customerType = sessionStorage.getItem('customerType');
    console.log("customer Type:", customerType);


    const [jobsOptions, setJobsOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);

    // Load job and location options on component mount
    useEffect(() => {

        // Extract job and location data from the JSON files
        const jobOptions = jobs.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        const locationOptionsData = locationData.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        setJobsOptions(jobOptions); // Set job options for the select
        setLocationOptions(locationOptionsData); // Set location options for the select
    }, []);



    const login = () => {
        navigate('/login');
    };
    const home = () => {
        navigate('/home');
    };
    const jobpost = () => {
        navigate('/jobpost');
    };
    const regchooses = () => {
        navigate('/regchoose');
    };


    // Function to handle navigation with state
    const findJob = () => {
        navigate('/searchedjobs', { state: { job, location: locationInput } }); // Passing job and location as state
    };

    // Function to toggle the options component display
    const toggleOptions = () => {
        setShowOptions(!showOptions); // Toggle the state between true and false
    };

    const closeOptions = () => {
        setShowOptions(false); // Close the options modal
    };

      // Custom styles for react-select to match existing styles
      const customStyles = {
        container: (provided) => ({
            ...provided,
            width: '100%',
            height: '100%',
        }),
        control: (provided) => ({
            ...provided,
            border: 'none',
            boxShadow: 'none',
            height: '100%',
            fontSize: '16px',
            // paddingLeft: '0.5rem',
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            display: 'none', // Hide dropdown indicator
        }),
    };

    
    return (
        <div className='h-[100px] w-full  lg:px-12 px-3 flex items-center flex-row gap-5'>

            <img src={logo} alt="logo" className='w-[15%] h-[60%] cursor-pointer' onClick={home} />
            <div className='h-[48px] w-[45%] flex flex-row justify-center items-center border-[#edebeb] border-2'>
                <div className='h-full w-[40%] flex flex-row border-r-2 border-[#edebeb]'>
                    <div className='h-full w-[20%] flex justify-center items-center'>
                        <img src={search} alt="vector" />
                    </div>
                    <div className='h-full w-[100%]'>
                        <Select
                            options={jobsOptions}
                            value={jobsOptions.find(option => option.value === job)}
                            onChange={(selectedOption) => setJob(selectedOption ? selectedOption.value : '')}
                            placeholder="Select Job..."
                            styles={customStyles}
                            className='w-full'
                        />
                    </div>
                </div>
                
                <div className='h-full w-[40%] flex flex-row'>
                    <div className='h-full w-[20%] flex justify-center items-center'>
                        <img src={location} alt="location" />
                    </div>
                    <div className='h-full w-[100%]'>
                        <Select
                            options={locationOptions}
                            value={locationOptions.find(option => option.value === locationInput)}
                            onChange={(selectedOption) => setLocationInput(selectedOption ? selectedOption.value : '')}
                            placeholder="Select Location..."
                            styles={customStyles}
                            className='w-full'

                        />
                    </div>
                </div>
                
                <div className='h-[70%] w-[20%] flex justify-center items-center'>
                    <div className='h-full w-[80%] rounded-[10px] bg-[#E22E37] flex justify-center items-center text-[white] cursor-pointer text-base font-[600] font-display hover:bg-[red]' onClick={findJob}>
                        Find Job
                    </div>
                </div>
            </div>


            <div className='w-[40%] h-[48px] flex flex-row gap-4'>
                <div className='w-[30%] h-full flex justify-center items-center border-2 border-[#E22E37] rounded-[5px] text-base font-[600] font-display cursor-pointer hover:bg-black hover:text-white hover:border-none' onClick={login}>Login</div>
                <div className='w-[30%] h-full flex justify-center items-center border-2 border-[#E22E37] rounded-[5px] text-base font-[600] font-display cursor-pointer hover:bg-black hover:text-white hover:border-none' onClick={regchooses}>Register</div>
                {companyName ? (

                    <div className='w-[40%] h-full flex justify-center items-center border-2  bg-[#E22E37] rounded-[5px] flex-row gap-4 cursor-pointer text-[white]  hover:bg-[red]' onClick={toggleOptions}>
                        <span className='text-base font-[600] font-display cursor-pointer'>{companyName}</span>
                    </div>

                ) : (
                    <>
                        {/* <div className='w-[30%] h-full flex justify-center items-center border-2 border-[#E22E37] rounded-[5px] text-sm font-[600] font-display cursor-pointer' onClick={login}>Login</div>
                        <div className='w-[30%] h-full flex justify-center items-center border-2 border-[#E22E37] rounded-[5px] text-sm font-[600] font-display cursor-pointer' onClick={regchooses}>Register</div> */}
                    </>
                )}
            </div>

            {showOptions && (
                customerType === 'admin' ? (
                    <StaffOptions closeOptions={closeOptions} />
                ) : customerType === 'employee' ? (
                    <EmpOptions closeOptions={closeOptions} />
                ) : customerType === 'candidate' ? (
                    <CandidateOpt closeOptions={closeOptions} />
                ) : null
            )}

        </div>
    )
}

export default Navbar
