import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import filter from '../images/search/Filter.png'
import Select from 'react-select'; // Importing react-select
import jobs from '../json/jobs.json';
import location from '../json/cities.json'




function MatchingJobs() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [jobsCategory, setJobsCategory] = useState('');
    const [jobsOptions, setJobsOptions] = useState([]);
    const [locationCategory, setLocationCategory] = useState('');
    const [locationOptions, setLocationOptions] = useState([]);
    const [jobType, setJobType] = useState(null); // State for storing gender
    const [gender, setGender] = useState(null); // State for storing gender
    const [foodType, setFoodType] = useState(null); // State for storing gender


    useEffect(() => {
        window.scrollTo(0, 0);

        // Extract districts from the imported JSON data
        const job = jobs.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        const locations = location.states[0].districts.map(district => ({
            value: district,
            label: district
        }));




        setJobsOptions(job); // Set district options for the select
        setLocationOptions(locations)



    }, []);

    const handleJobsChange = selectedOption => {
        setJobsCategory(selectedOption ? selectedOption.value : ''); // Set the selected district value
    };

    const handleLocationChange = selectedOption => {

        setLocationCategory(selectedOption ? selectedOption.value : ''); // Set the selected options

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

    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='flex w-full px-12 bg-[#eeebeb] flex-row gap-3 py-6'>
                <div className='w-[25%] h-auto bg-[white] rounded-[10px] flex flex-col '>
                    <div className='w-full h-[50px]  rounded-t-[10px] p-5 flex justify-between items-center border-b-2 border-[#d2d0d0]'>
                        <div className=' flex flex-row gap-2'>
                            <img src={filter} alt="filter" className='cursor-pointer' />
                            <span className='text-lg font-[500] font-[display]'>Search Job</span>
                        </div>
                        <span className='text-base font-[500] font-[display] cursor-pointer'>clear all</span>

                    </div>
                    <div className='p-5 flex flex-col gap-5 w-full'>
                        <div className='w-full flex flex-col gap-2'>
                            <span className='text-left font-[display] text-base font-[400]'>Select Preferred Job</span>
                            <Select
                                options={jobsOptions}
                                onChange={handleJobsChange}
                                placeholder="Select"
                                className='w-auto'
                                classNamePrefix='select'
                                isClearable={true}
                                value={jobsCategory}
                                styles={customStyles2}
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <span className='text-left font-[display] text-base font-[400]'>Select Preferred Location</span>
                            <Select
                                options={locationOptions}
                                onChange={handleLocationChange}
                                placeholder="Select Location"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={locationCategory} // Display selected options
                                styles={customStyles2}
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <span className='text-left font-[display] text-base font-[400]'>Select Job Type</span>
                            <Select
                                options={jobTypeOptions}
                                isClearable={true}
                                placeholder="Select Job Type"
                                classNamePrefix="react-select"
                                styles={customStyles2}
                                value={jobTypeOptions.find(option => option.value === jobType) || null} // Match the selected value
                                onChange={handleJobTypeChange} // Handle job type change
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <span className='text-left font-[display] text-base font-[400]'>Male / Female</span>
                            <Select
                                options={genderOptions}
                                isClearable={true}
                                placeholder="Select Gender"
                                classNamePrefix="react-select"
                                styles={customStyles2}
                                value={genderOptions.find(option => option.value === gender) || null} // Match the selected value
                                onChange={handleGenderChange} // Handle gender change
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <span className='text-left font-[display] text-base font-[400]'>Food & Accomodation</span>
                            <Select
                                options={foodTypeOptions}
                                isClearable={true}
                                placeholder="Select Food Type"
                                classNamePrefix="react-select"
                                styles={customStyles2}
                                value={foodTypeOptions.find(option => option.value === foodType) || null} // Match the selected value
                                onChange={handleFoodChange} // Handle gender change
                            />
                        </div>


                    </div>

                </div>
                <div className='w-[75%] h-auto bg-[white]  flex  p-5'>
                     
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MatchingJobs