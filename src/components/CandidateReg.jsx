import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';
import Select from 'react-select'; // Importing react-select
import statesAndDistricts2 from '../json/states-and-districts.json';
import degree from '../json/degree.json'
import jobs from '../json/jobs.json';
import location from '../json/cities.json'
import { useNavigate } from 'react-router-dom';


function CandidateReg() {

    const [companyDistrict, setCompanyDistrict] = useState('');
    const [districtOptions, setDistrictOptions] = useState([]);
    const [candidateDegree, setCandidateDegree] = useState('');
    const [degreeOptions, setDegreeOptions] = useState([]);
    const [jobsCategory, setJobsCategory] = useState('');
    const [jobsOptions, setJobsOptions] = useState([]);
    const [locationCategory, setLocationCategory] = useState('');
    const [locationOptions, setLocationOptions] = useState([]);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(null); // State for storing gender
    const [jobType, setJobType] = useState(null); // State for storing gender
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();



    const handleGenderChange = (selectedOption) => {
        setGender(selectedOption ? selectedOption.value : null);
    };

    const handleJobTypeChange = (selectedOption) => {
        setJobType(selectedOption ? selectedOption.value : null);
    };


    useEffect(() => {
        window.scrollTo(0, 0);


        const districts = statesAndDistricts2.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        const degrees = degree.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        // Extract districts from the imported JSON data
        const job = jobs.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        const locations = location.states[0].districts.map(district => ({
            value: district,
            label: district
        }));


        setDistrictOptions(districts); // Set district options for the select
        setDegreeOptions(degrees); // Set district options for the select
        setJobsOptions(job); // Set district options for the select
        setLocationOptions(locations)



    }, []);



    const handleDistrictChange = selectedOption => {
        setCompanyDistrict(selectedOption ? selectedOption.value : ''); // Set the selected district value
    };

    const handleDegreeChange = selectedOption => {
        setCandidateDegree(selectedOption ? selectedOption.value : ''); // Set the selected district value
    };


    const handleJobsChange = selectedOptions => {
        if (selectedOptions.length <= 5) {
            setJobsCategory(selectedOptions); // Set the selected options
        } else {
            alert("You can select a maximum of 5 options");
        }
    };

    const handleLocationChange = selectedOptions => {
        if (selectedOptions.length <= 5) {
            setLocationCategory(selectedOptions); // Set the selected options
        } else {
            alert("You can select a maximum of 5 options");
        }
    };

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

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

    const customStyles = {

        control: (base) => ({
            ...base,
            height: '43px',
            borderRadius: '5px',
            border: '2px solid #D7D7D7',
            paddingLeft: '4px',
        }),

    };

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


    const handleSubmit = async () => {
        // Create the data object
        // Validation checks
        const mobilePattern = /^[0-9]{10}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate mobile and WhatsApp numbers
        if (!mobilePattern.test(mobile)) {
            alert('Mobile Number must be 10 digits.');
            return; // Stop the function if validation fails
        }

        if (!mobilePattern.test(whatsapp)) {
            alert('WhatsApp Number must be 10 digits.');
            return; // Stop the function if validation fails
        }

        // Validate email format
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return; // Stop the function if validation fails
        }

        // Check for empty fields
        if (!name || !mobile || !whatsapp || !email ||
            !password || !gender || !companyDistrict || !candidateDegree ||
            !jobType || !jobsCategory.length || !locationCategory.length) {
            alert('Please fill in all fields.');
            return; // Stop the function if any field is empty
        }


        const data = {
            name,
            mobile,
            whatsapp,
            email,
            password,
            gender,
            district: companyDistrict,
            degree: candidateDegree,
            jobType: jobType,
            jobs: jobsCategory.map(option => option.value), // Ensure this is an array
            locations: locationCategory.map(option => option.value) // Ensure this is an array
        };

        console.log(data); // This should show jobs and locations as arrays

        try {
            const response = await fetch(`${apiBaseUrl}/registerCandidate`, { // Fixed typo here
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Attempt to parse error message
                if (errorData.message === 'Mobile number already exists') {
                    // Show an alert if the mobile number is already registered
                    alert('Mobile number already exists.');
                    return;
                }
                throw new Error(`Network response was not ok: ${errorData.message || 'Unknown error'}`);
            }
    
            else {
                alert('Registration Successful');
                setName('');
                setMobile('');
                setWhatsapp('');
                setEmail('');
                setPassword('');
                setGender(''); // Clear district
                setCompanyDistrict('');
                setCandidateDegree('');
                setJobType(''); // Clear district
                setJobsCategory('');
                setLocationCategory('');
                navigate('/login');

            }
            const result = await response.json();
            console.log(result); // Handle success
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };



    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className=' flex justify-center items-center bg-[black] py-12'>
                <div className='lg:w-[80%] w-[90%] h-[70%]  flex flex-col items-center bg-[white]  gap-12 py-12 lg:rounded-[20px] rounded-[5px]'>
                    <span className='text-2xl font-[700] font-[display]'>Candidate Register</span>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-12 px-3 w-full'>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Name</span>
                            <input
                                type="text"
                                placeholder='Enter Full Name'
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Mobile Number</span>
                            <input
                                type="number"
                                placeholder='Enter Phone No'
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Whatsapp Number</span>
                            <input
                                type="number"
                                placeholder='Your Whatsapp No'
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Email</span>
                            <input
                                type="text"
                                placeholder='Enter Email Address'
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Create Password</span>
                            <input
                                type="password"
                                placeholder='Create Password'
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Gender</span>
                            <Select
                                options={genderOptions}
                                isClearable={true}
                                placeholder="Select Gender"
                                classNamePrefix="react-select"
                                styles={customStyles}
                                value={genderOptions.find(option => option.value === gender) || null} // Match the selected value
                                onChange={handleGenderChange} // Handle gender change
                            />

                        </div>



                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>District</span>
                            <Select
                                options={districtOptions}
                                onChange={handleDistrictChange}
                                placeholder="Select District"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={districtOptions.find(option => option.value === companyDistrict) || null} // Set the selected option
                                styles={customStyles}

                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Highest Qualification</span>
                            <Select
                                options={degreeOptions}
                                onChange={handleDegreeChange}
                                placeholder="Select Qualificaion"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={degreeOptions.find(option => option.value === candidateDegree) || null} // Set the selected option
                                styles={customStyles}

                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job Type</span>
                            <Select
                                options={jobTypeOptions}
                                isClearable={true}
                                placeholder="Select Job Type"
                                classNamePrefix="react-select"
                                styles={customStyles}
                                value={jobTypeOptions.find(option => option.value === jobType) || null} // Match the selected value
                                onChange={handleJobTypeChange} // Handle job type change
                            />

                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job Preference <span className='text-[#E22E37] text-lg font-[500] font-[display]'>(Max-5)</span></span>
                            <Select
                                options={jobsOptions}
                                onChange={handleJobsChange}
                                placeholder="Select"
                                className='w-auto'
                                classNamePrefix='select'
                                isClearable={true}
                                isMulti // Allow multiple selections
                                value={jobsCategory} // Display selected options
                                styles={customStyles2}
                            />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job Location <span className='text-[#E22E37] text-lg font-[500] font-[display]'>(Max-5)</span></span>
                            <Select
                                options={locationOptions}
                                onChange={handleLocationChange}
                                placeholder="Select Location"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                isMulti // Allow multiple selections
                                value={locationCategory} // Display selected options
                                styles={customStyles2}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 w-full px-12 justify-center items-center'>
                        <div className='h-[56px] lg:w-[25%] w-[50%] bg-[#E22E37] rounded-[20px] flex justify-center items-center text-[white] text-xl font-[display] font-[600] cursor-pointer' onClick={handleSubmit}>Register</div>
                        <span className='text-base font-[500] font-[dislay]'>Already Register- <span className='text-base font-[700] font-[dislay] text-[#E22E37] cursor-pointer'>Login</span> </span>
                    </div>

                </div>
            </div>
            <Footer />
        </div>

    )
}

export default CandidateReg
