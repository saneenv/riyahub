import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';
import Select from 'react-select';
import companies from '../json/company-categories.json';
import jobs from '../json/jobs.json';
import location from '../json/cities.json'



function JobPost() {
    const [employeeData, setEmployeeData] = useState(null);
    const [whatsappNumber, setWhatsappNumber] = useState(''); // State for WhatsApp number
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [jobType, setJobType] = useState(null);
    const [genderType, setGenderType] = useState(null);
    const [companyCategory, setCompanyCategory] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [jobsCategory, setJobsCategory] = useState('');

    const [jobsOptions, setJobsOptions] = useState([]);

    const [locationCategory, setLocationCategory] = useState('');

    const [locationOptions, setLocationOptions] = useState([]);




    const jobTypeOptions = [
        { value: 'fulltime', label: 'Full Time' },
        { value: 'parttime', label: 'Part Time' },
        { value: 'Remote/workathome', label: 'Remote/work at home' }
    ];

    const genderTypeOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'male/female', label: 'Male/Female' }
    ];

    // Custom styles to match the input field style
    const customStyles = {
        control: (provided) => ({
            ...provided,
            height: '43px',
            border: '2px solid #D7D7D7',
            borderRadius: '5px',
            paddingLeft: '4px'
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '5px',
        }),
    };

    // Handle change for the select input
    const handleJobTypeChange = (selectedOption) => {
        setJobType(selectedOption);
    };

    const handleGenderTypeChange = (selectedOption) => {
        setGenderType(selectedOption);
    };


    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    useEffect(() => {
        window.scrollTo(0, 0);

        // Extract districts from the imported JSON data
        const districts = companies.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        // Extract districts from the imported JSON data
        const job = jobs.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        // Extract districts from the imported JSON data
        const locations = location.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        setCategoryOptions(districts);
        setJobsOptions(job); // Set district options for the select
        setLocationOptions(locations)
    }, []);

    const handleCategoryChange = selectedOption => {
        setCompanyCategory(selectedOption ? selectedOption.value : ''); // Set the selected district value
    };

    const handleJobsChange = selectedOption => {
        setJobsCategory(selectedOption ? selectedOption.value : ''); // Set the selected district value
    };

    const handleLocationChange = selectedOption => {
        setLocationCategory(selectedOption ? selectedOption.value : ''); // Set the selected district value
    };


    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const employeeId = sessionStorage.getItem('employeeId');

    console.log(employeeId);
    useEffect(() => {
        // Fetch employee data from the API
        const fetchEmployeeData = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/employee/${employeeId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEmployeeData(data);
                setWhatsappNumber(data.employee.whatsapp_number); // Set initial WhatsApp number
                setEmail(data.employee.email);
                setAddress(data.employee.address);
                console.log(data); // Log the fetched employee data
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchEmployeeData();
    }, [employeeId, apiBaseUrl]);

    // Handle input change
    const handleWhatsappChange = (e) => {
        setWhatsappNumber(e.target.value); // Update the state when the user types
    };

    // Handle input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value); // Update the state when the user types
    };

    // Handle input change
    const handleAddressChange = (e) => {
        setAddress(e.target.value); // Update the state when the user types
    };

    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className=' flex justify-center items-center bg-[#0D2D3E] py-12'>
                <div className='lg:w-[90%] w-[90%] h-[70%] bg-[white]  flex flex-col items-center  gap-12 py-12 lg:rounded-[20px] rounded-[5px]'>
                    <span className='text-2xl font-[700] font-[display]'>Job Post</span>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-12 px-3 w-full'>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job Title *</span>
                            <input placeholder='Job Title' type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job Type *</span>
                            <Select
                                placeholder="Select Job Type"
                                options={jobTypeOptions}
                                value={jobType}
                                onChange={handleJobTypeChange}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select" // Ensures custom class prefix
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Gender *</span>
                            <Select
                                placeholder="Select Gender"
                                options={genderTypeOptions}
                                value={genderType}
                                onChange={handleGenderTypeChange}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select" // Ensures custom class prefix
                            />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Company Category *</span>
                            <Select
                                options={categoryOptions}
                                onChange={handleCategoryChange}
                                placeholder="Select Category"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={categoryOptions.find(option => option.value === companyCategory) || null} // Set the selected option
                                styles={customStyles}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job *</span>
                            <Select
                                options={jobsOptions}
                                onChange={handleJobsChange}
                                placeholder="Select Job"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={jobsOptions.find(option => option.value === jobsCategory) || null} // Set the selected option
                                styles={customStyles}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job Location *</span>
                            <Select
                                options={locationOptions}
                                onChange={handleLocationChange}
                                placeholder="Select Location"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={locationOptions.find(option => option.value === locationCategory) || null} // Set the selected option
                                styles={customStyles}
                            />
                        </div>



                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Minimum Salary *</span>
                            <input placeholder='Select Minimum Salary' type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Maximum Salary *</span>
                            <input placeholder='Select Maximum Salary' type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Work Time Start *</span>
                            <input placeholder='Select Working Time Start' type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>


                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Work Time End *</span>
                            <input placeholder='Select Working Time End' type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Qualification Required *</span>
                            <input placeholder='Qualification Required' type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job Description *</span>
                            <input placeholder='Job Description' type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>



                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Food & Accommodation</span>
                            <input placeholder='Select If Applicable' type="text" className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Whatsapp Number *</span>
                            <input
                                type="text"
                                placeholder='Enter Number'
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={whatsappNumber} // Controlled input
                                onChange={handleWhatsappChange} // Update state on change
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Email</span>
                            <input
                                type="text"
                                placeholder='example@gmail.com'
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={email} // Controlled input
                                onChange={handleEmailChange} // Update state on change

                            />
                        </div>



                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Address *</span>
                            <input
                                type="text"
                                placeholder='Enter Address'
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={address} // Controlled input
                                onChange={handleAddressChange} // Update state on change

                            />
                        </div>

                    </div>

                    <div className='flex flex-col gap-5 w-full px-12 justify-center items-center'>
                        <div className='h-[56px] lg:w-[25%] w-[50%] bg-[#E22E37] rounded-[20px] flex justify-center items-center text-[white] text-xl font-[display] font-[600]'>Job Post</div>
                        <span className='text-base font-[500] font-[dislay]'>Already Register- <span className='text-base font-[700] font-[dislay] text-[#E22E37] cursor-pointer'>Login</span> </span>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default JobPost
