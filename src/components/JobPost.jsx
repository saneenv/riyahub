import React, { useEffect, useState, useRef } from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';
import Select from 'react-select';
import companies from '../json/company-categories.json';
import jobs from '../json/jobs.json';
import location from '../json/cities.json'
import worktime from '../json/worktime.json'
import endtime from '../json/endtime.json'



function JobPost() {
    const [jobTitle, setJobTitle] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [qualification, setQualification] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobType, setJobType] = useState(null);
    const [employeeData, setEmployeeData] = useState(null);
    const [whatsappNumber, setWhatsappNumber] = useState(''); // State for WhatsApp number
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [genderType, setGenderType] = useState(null);
    const [foodType, setFoodType] = useState(null);

    const [companyCategory, setCompanyCategory] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [jobsCategory, setJobsCategory] = useState('');

    const [jobsOptions, setJobsOptions] = useState([]);

    const [locationCategory, setLocationCategory] = useState('');

    const [locationOptions, setLocationOptions] = useState([]);

    const [startCategory, setStartCategory] = useState('');

    const [startOptions, setStartOptions] = useState([]);

    const [endCategory, setEndCategory] = useState('');

    const [endOptions, setEndOptions] = useState([]);



    // References for inputs
    const jobTitleRef = useRef(null);
    const jobTypeRef = useRef(null);
    const genderTypeRef = useRef(null);
    const companyCategoryRef = useRef(null);
    const jobRef = useRef(null);
    const locationRef = useRef(null);
    const minSalaryRef = useRef(null);
    const maxSalaryRef = useRef(null);
    const startRef = useRef(null);
    const endRef = useRef(null);
    const qualificationRef = useRef(null);
    const jobDescriptionRef = useRef(null);
    const foodRef = useRef(null);





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

    const foodTypeOptions = [
        { value: 'no', label: 'No' },
        { value: 'yes', label: 'Yes' },
        { value: 'Accomodationonly', label: 'Accomodation Only' },
        { value: 'Foodonly', label: 'Food Only' }
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

    const handleFoodTypeChange = (selectedOption) => {
        setFoodType(selectedOption);
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
        const workstart = worktime.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        const locations = location.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        const workend = endtime.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        setCategoryOptions(districts);
        setJobsOptions(job); // Set district options for the select
        setLocationOptions(locations)
        setStartOptions(workstart)
        setEndOptions(workend)
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

    const handleStartChange = selectedOption => {
        setStartCategory(selectedOption ? selectedOption.value : ''); // Set the selected district value
    };


    const handleEndChange = selectedOption => {
        setEndCategory(selectedOption ? selectedOption.value : ''); // Set the selected district value
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

    const selectedCompanyCategory = categoryOptions.find(option => option.value === companyCategory);
    const selectedEndCategory = endOptions.find(option => option.value === endCategory);
    const selectedJobCategory = jobsOptions.find(option => option.value === jobsCategory);
    const selectedLocationCategory = locationOptions.find(option => option.value === locationCategory);
    const selectedStartCategory = startOptions.find(option => option.value === startCategory)

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation to ensure all fields are filled
        if (
            !employeeId ||
            !jobTitle ||
            !jobType ||
            !genderType ||
            !selectedCompanyCategory ||
            !selectedJobCategory ||
            !selectedLocationCategory ||
            !minSalary ||
            !maxSalary ||
            !selectedStartCategory ||
            !selectedEndCategory ||
            !qualification ||
            !jobDescription ||
            !foodType ||
            !whatsappNumber ||
            !email ||
            !address
        ) {
            alert('Please fill in all the required fields.');
            return;
        }


        const formData = {
            employeeId,
            jobTitle,
            jobType: jobType?.value, // Assuming you're using react-select
            genderType: genderType?.value,
            companyType: selectedCompanyCategory ? selectedCompanyCategory.label : null,
            job: selectedJobCategory ? selectedJobCategory.label : null,
            location: selectedLocationCategory ? selectedLocationCategory.label : null,
            minSalary,
            maxSalary,
            startTime: selectedStartCategory ? selectedStartCategory.label : null,
            endTime: selectedEndCategory ? selectedEndCategory.label : null,
            qualification,
            jobDescription,
            foodType: foodType?.value,
            whatsappNumber,
            email,
            address,
        };

        console.log(formData, "formdata:");


        try {
            const response = await fetch(`${apiBaseUrl}/jobpost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                alert('Job posted successfully!');


                setCompanyCategory('');
                setFoodType('');
                setGenderType('');
                setJobType('');
                setJobDescription('');
                setQualification('');
                setMaxSalary('');
                setMinSalary('');
                setJobTitle('');
                setEndCategory('');
                setStartCategory('');
                setLocationCategory('');
                setJobsCategory('');



            } else {
                alert('Failed to post job.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while posting the job.');
        }
    };

    const handleKeyDown = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextRef && nextRef.current) {
                nextRef.current.focus();
            }
        }
    };

    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className=' flex justify-center items-center bg-[black] py-12'>
                <div className='lg:w-[90%] w-[90%] h-[70%] bg-[white]  flex flex-col items-center  gap-12 py-12 lg:rounded-[20px] rounded-[5px]'>
                    <span className='text-xl font-[700] font-display'>Job Post</span>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-12 px-3 w-full'>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Job Title *</span>
                            <input
                                ref={jobTitleRef}
                                placeholder='Job Title'
                                type="text"
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, jobTypeRef)} // Move to Mobile Number on "Enter"
                            />

                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Job Type *</span>
                            <Select
                                ref={jobTypeRef}
                                placeholder="Select Job Type"
                                options={jobTypeOptions}
                                value={jobType}
                                onChange={handleJobTypeChange}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select" // Ensures custom class prefix
                                onKeyDown={(e) => handleKeyDown(e, genderTypeRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Gender *</span>
                            <Select
                                ref={genderTypeRef}
                                placeholder="Select Gender"
                                options={genderTypeOptions}
                                value={genderType}
                                onChange={handleGenderTypeChange}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select" // Ensures custom class prefix
                                onKeyDown={(e) => handleKeyDown(e, companyCategoryRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Company Category *</span>
                            <Select
                                ref={companyCategoryRef}
                                options={categoryOptions}
                                onChange={handleCategoryChange}
                                placeholder="Select Category"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={categoryOptions.find(option => option.value === companyCategory) || null} // Set the selected option
                                styles={customStyles}
                                onKeyDown={(e) => handleKeyDown(e, jobRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Job *</span>
                            <Select
                                ref={jobRef}
                                options={jobsOptions}
                                onChange={handleJobsChange}
                                placeholder="Select Job"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={jobsOptions.find(option => option.value === jobsCategory) || null} // Set the selected option
                                styles={customStyles}
                                onKeyDown={(e) => handleKeyDown(e, locationRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Job Location *</span>
                            <Select
                                ref={locationRef}
                                options={locationOptions}
                                onChange={handleLocationChange}
                                placeholder="Select Location"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={locationOptions.find(option => option.value === locationCategory) || null} // Set the selected option
                                styles={customStyles}
                                onKeyDown={(e) => handleKeyDown(e, minSalaryRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>



                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Minimum Salary *</span>
                            <input
                                ref={minSalaryRef}
                                placeholder='Enter Minimum Salary'
                                type="number"
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={minSalary}
                                onChange={(e) => setMinSalary(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, maxSalaryRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Maximum Salary *</span>
                            <input
                                ref={maxSalaryRef}
                                placeholder='Enter Maximum Salary'
                                type="number"
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={maxSalary}
                                onChange={(e) => setMaxSalary(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, startRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Work Time Start *</span>
                            <Select
                                ref={startRef}
                                options={startOptions}
                                onChange={handleStartChange}
                                placeholder="Select Location"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={startOptions.find(option => option.value === startCategory) || null} // Set the selected option
                                styles={customStyles}
                                onKeyDown={(e) => handleKeyDown(e, endRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>


                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Work Time End *</span>
                            <Select
                                ref={endRef}
                                options={endOptions}
                                onChange={handleEndChange}
                                placeholder="Select Location"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={endOptions.find(option => option.value === endCategory) || null} // Set the selected option
                                styles={customStyles}
                                onKeyDown={(e) => handleKeyDown(e, qualificationRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Qualification Required *</span>
                            <input
                                ref={qualificationRef}
                                placeholder='Qualification Required'
                                type="text"
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, jobDescriptionRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Job Description *</span>
                            <input
                                ref={jobDescriptionRef}
                                placeholder='Job Description'
                                type="text"
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, foodRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>



                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Food & Accommodation</span>
                            <Select
                                ref={foodRef}
                                placeholder="Select"
                                options={foodTypeOptions}
                                value={foodType}
                                onChange={handleFoodTypeChange}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select" // Ensures custom class prefix
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Whatsapp Number *</span>
                            <input
                                type="text"
                                placeholder='Enter Number'
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={whatsappNumber} // Controlled input
                                onChange={handleWhatsappChange} // Update state on change
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Email</span>
                            <input
                                type="text"
                                placeholder='example@gmail.com'
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={email} // Controlled input
                                onChange={handleEmailChange} // Update state on change

                            />
                        </div>



                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Address *</span>
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
                        <div className='h-[56px] lg:w-[25%] w-[50%] bg-[#E22E37] rounded-[20px] flex justify-center items-center text-[white] text-lg font-display font-[600] cursor-pointer hover:bg-[black] hover:text-[white]' onClick={handleSubmit}>Job Post</div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default JobPost
