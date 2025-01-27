import React, { useEffect, useState, useRef } from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';
import Select from 'react-select';
// import companies from '../json/company-categories.json';
// import jobs from '../json/jobs.json';
// import location from '../json/cities.json'
import worktime from '../json/worktime.json'
import endtime from '../json/endtime.json'
import Navbar2Mob from './Navbar2Mob';



function JobPost() {
    const [jobTitle, setJobTitle] = useState('');
    const [manualJobID, setManualJobID] = useState('');
    const [locationData, setLocationData] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [jobsData, setJobsData] = useState(null);
    const [qualificationData, setQualificationData] = useState(null);
    const [degreeOptions, setDegreeOptions] = useState([]);
    const [candidateDegree, setCandidateDegree] = useState('');
    const [errorState, setErrorState] = useState({});
    const [minSalary, setMinSalary] = useState(0);
    const [maxSalary, setMaxSalary] = useState(0);
    const [jobDescription, setJobDescription] = useState('');
    const [jobType, setJobType] = useState(null);
    const [salaryType, setSalaryType] = useState(null);
    const [employeeData, setEmployeeData] = useState(null);
    const [whatsappNumber, setWhatsappNumber] = useState(''); // State for WhatsApp number
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [vacancy, setVacancy] = useState('');
    const [genderType, setGenderType] = useState(null);
    const [foodType, setFoodType] = useState(null);
    const [experienceType, setExperienceType] = useState(null);
    const [shopName, setShopName] = useState('');

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

    const customerType = sessionStorage.getItem('customerType');
    console.log("customer Type:", customerType);



    // Ref for Job Title field
    const jobTitleRef = useRef(null);







    const jobTypeOptions = [
        { value: 'Full Time', label: 'Full Time' },
        { value: 'Part Time', label: 'Part Time' },
        { value: 'Remote/work at home', label: 'Remote/work at home' }
    ];

    const genderTypeOptions = [
        { value: 'MALE', label: 'MALE' },
        { value: 'FEMALE', label: 'FEMALE' },
        { value: 'MALE/FEMALE', label: 'MALE/FEMALE ' }
    ];

    const foodTypeOptions = [
        { value: 'No', label: 'No' },
        { value: 'Yes', label: 'Yes' },
        { value: 'Accomodation Only', label: 'Accomodation Only' },
        { value: 'Food Only', label: 'Food Only' }
    ];

    const experienceOptions = [
        { value: 'Fresher', label: 'Fresher' },
        { value: 'Experienced', label: 'Experienced' },
        { value: 'Any', label: 'Any' },
    ];

    const salaryOptions = [
        { value: 'Negotiable', label: 'Negotiable' },
        { value: 'On Work Basis', label: 'On Work Basis' },
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

    const handleExperienceTypeChange = (selectedOption) => {
        setExperienceType(selectedOption);
    };

    const handleSalaryTypeChange = (selectedOption) => {
        setSalaryType(selectedOption);
    };


    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


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


    const fetchCompanyData = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/datacompany`); // API endpoint for location data
            if (response.ok) {
                const data = await response.json();
                setCompanyData(data); // Set the fetched data
            } else {
                console.error('Failed to fetch location data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    };

    useEffect(() => {
        fetchCompanyData(); // Fetch location data when the component mounts
    }, []);

    useEffect(() => {
        if (companyData) {


            // Extract districts from the imported JSON data
            const districts = companyData.states[0].districts.map(district => ({
                value: district,
                label: district
            }));
            setCategoryOptions(districts);
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


    const fetchQualificationData = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/dataqualifications`); // API endpoint for location data
            if (response.ok) {
                const data = await response.json();
                setQualificationData(data); // Set the fetched data
            } else {
                console.error('Failed to fetch location data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    };

    useEffect(() => {
        fetchQualificationData(); // Fetch location data when the component mounts
    }, []);

    useEffect(() => {
        if (qualificationData) {


            // Extract districts from location data for the select dropdown
            const degrees = qualificationData.states[0].districts.map(district => ({
                value: district,
                label: district,
            }));
            setDegreeOptions(degrees); // Set the location options once data is available
        }
    }, [qualificationData]);



    useEffect(() => {
        window.scrollTo(0, 0);




        // Extract districts from the imported JSON data
        const workstart = worktime.states[0].districts.map(district => ({
            value: district,
            label: district
        }));



        const workend = endtime.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        setStartOptions(workstart)
        setEndOptions(workend)
    }, []);

    const handleCategoryChange = selectedOption => {
        setCompanyCategory(selectedOption ? selectedOption.value : ''); // Set the selected district value
    };

    const handleJobsChange = selectedOption => {
        setJobsCategory(selectedOption ? selectedOption.value : ''); // Set the selected district value
    };

    const handleLocationChange = (selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
        console.log("Updated locationCategory:", values);
        setLocationCategory(values);
    };



    const handleDegreeChange = selectedOption => {
        setCandidateDegree(selectedOption ? selectedOption.value : ''); // Set the selected district value
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
        // Fetch data from the primary API
        const fetchPrimaryApi = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/employee/${employeeId}`);
                if (!response.ok) {
                    throw new Error('Primary API failed');
                }
                const data = await response.json();
                setEmployeeData(data);
                setWhatsappNumber(data.employee.mobile_number); // Set WhatsApp number
                setEmail(data.employee.email);
                setAddress(data.employee.address);
                console.log('Primary API data:', data);
            } catch (error) {
                console.warn('Primary API failed:', error);
                // Try the fallback API
                await fetchFallbackApi();
            }
        };

        // Fetch data from the fallback API
        const fetchFallbackApi = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/staff/${employeeId}`);
                if (!response.ok) {
                    throw new Error('Fallback API failed');
                }
                const data = await response.json();
                setEmployeeData(data);
                setWhatsappNumber(data.employee.mobileNumber); // Set WhatsApp number
                setEmail(data.employee.email);
                setAddress(data.employee.address);
                console.log('Fallback API data:', data);
            } catch (error) {
                console.error('Both APIs failed:', error);
            }
        };

        fetchPrimaryApi();
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

    const handleVacancyChange = (e) => {
        setVacancy(e.target.value); // Update the state when the user types
    };

    // Handle input change
    const handleShopNameChange = (e) => {
        setShopName(e.target.value); // Update the state when the user types
    };

    const selectedCompanyCategory = categoryOptions.find(option => option.value === companyCategory);
    const selectedEndCategory = endOptions.find(option => option.value === endCategory);
    const selectedJobCategory = jobsOptions.find(option => option.value === jobsCategory);
    const selectedLocationCategory = locationOptions
        .filter(option => locationCategory.includes(option.value))
        .map(option => option.value) // Extract only the values
        .join(', '); // Join values with a comma and space

    console.log("Selected Categories as String:", selectedLocationCategory);



    const selectedStartCategory = startOptions.find(option => option.value === startCategory)

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        const errors = {};
        if (!employeeId) errors.employeeId = "employeeId is required";

        if (!jobTitle) errors.jobTitle = "Job Title is required";
        if (!jobType) errors.jobType = "Job Type is required";
        if (!genderType) errors.genderType = "Gender is required";
        if (!selectedCompanyCategory) errors.selectedCompanyCategory = "Company Category is required";
        if (!selectedJobCategory) errors.selectedJobCategory = "Job is required";
        if (!selectedLocationCategory) errors.selectedLocationCategory = "Job Location is required";
        if (!foodType) errors.foodType = "Food Type is required";

        if (!whatsappNumber) errors.whatsappNumber = "Manager Number is required";
        if (!address) errors.address = "Address is required";
        if (!experienceType) errors.experienceType = "Experience Type is required";

        if (!vacancy) errors.vacancy = "Number of Vacancies is required";
        if (!shopName) errors.shopName = "Shop Name is required";

        // If there are errors, set them and focus the Job Title field
        if (Object.keys(errors).length > 0) {
            setErrorState(errors);

            // Focus Job Title field if there's any error
            if (jobTitleRef.current) {
                jobTitleRef.current.focus();
            }

            return;
        }



        // Clear errors if no errors
        setErrorState({});



        const formData = {
            employeeId,
            jobTitle,
            jobType: jobType?.value, // Assuming you're using react-select
            genderType: genderType?.value,
            companyType: selectedCompanyCategory ? selectedCompanyCategory.label : null,
            job: selectedJobCategory ? selectedJobCategory.label : null,
            location: selectedLocationCategory,
            minSalary,
            maxSalary,
            startTime: selectedStartCategory ? selectedStartCategory.label : null,
            endTime: selectedEndCategory ? selectedEndCategory.label : null,
            qualification: candidateDegree,
            jobDescription,
            foodType: foodType?.value,
            whatsappNumber,
            email,
            address,
            manualJobID,
            experienceType: experienceType?.value,
            vacancy,
            salaryType: salaryType?.value,
            shopName

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
                setCandidateDegree('');
                setMaxSalary('');
                setMinSalary('');
                setJobTitle('');
                setEndCategory('');
                setStartCategory('');
                setLocationCategory('');
                setJobsCategory('');
                setManualJobID('');
                setExperienceType('');
                setVacancy('');
                setSalaryType('');
                setShopName('');

                window.location.reload();


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
            <div className='md:hidden flex flex-col'>
                <Navbar2Mob />
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
                            />
                            {errorState.jobTitle && <span className="text-red-500 text-sm">{errorState.jobTitle}</span>}
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Shop Name *</span>
                            <input
                                type="text"
                                placeholder='Enter Shop Name'
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={shopName} // Controlled input
                                onChange={handleShopNameChange} // Update state on change

                            />
                            {errorState.address && <span className="text-red-500 text-sm">{errorState.shopName}</span>}

                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Job Type *</span>
                            <Select
                                placeholder="Select Job Type"
                                options={jobTypeOptions}
                                value={jobType}
                                onChange={handleJobTypeChange}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select" // Ensures custom class prefix
                            />
                            {errorState.jobType && <span className="text-red-500 text-sm">{errorState.jobType}</span>}

                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Gender *</span>
                            <Select
                                placeholder="Select Gender"
                                options={genderTypeOptions}
                                value={genderType}
                                onChange={handleGenderTypeChange}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select" // Ensures custom class prefix
                            />
                            {errorState.genderType && <span className="text-red-500 text-sm">{errorState.genderType}</span>}

                        </div>

                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Company Category *</span>
                            <Select
                                options={categoryOptions}
                                onChange={handleCategoryChange}
                                placeholder="Select Category"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={companyCategory ? categoryOptions.find(option => option.value === companyCategory) : null}
                                styles={customStyles}
                            />
                            {errorState.selectedCompanyCategory && <span className="text-red-500 text-sm">{errorState.selectedCompanyCategory}</span>}

                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Job *</span>
                            <Select
                                options={jobsOptions}
                                onChange={handleJobsChange}
                                placeholder="Select Job"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={jobsCategory ? jobsOptions.find(option => option.value === jobsCategory) : null} // Set the selected option
                                styles={customStyles}
                            />
                            {errorState.selectedJobCategory && <span className="text-red-500 text-sm">{errorState.selectedJobCategory}</span>}

                        </div>

                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Experience *</span>
                            <Select
                                placeholder="Select Required Experience"
                                options={experienceOptions}
                                value={experienceType}
                                onChange={handleExperienceTypeChange}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select" // Ensures custom class prefix
                            />
                            {errorState.experienceType && <span className="text-red-500 text-sm">{errorState.experienceType}</span>}

                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Job Location *</span>
                            <Select
                                options={locationOptions}
                                onChange={handleLocationChange}
                                placeholder="Select Locations"
                                className="w-full"
                                classNamePrefix="select"
                                isMulti={true} // Enables multiple selections
                                isClearable={true}
                                value={
                                    locationCategory?.length > 0
                                        ? locationOptions.filter(option => locationCategory.includes(option.value))
                                        : null
                                } // Set the selected options
                                styles={customStyles}
                            />


                            {errorState.selectedLocationCategory && <span className="text-red-500 text-sm">{errorState.selectedLocationCategory}</span>}

                        </div>



                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Minimum Salary *</span>
                            <input
                                placeholder='Enter Minimum Salary'
                                type="number"
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={minSalary}
                                onChange={(e) => setMinSalary(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Maximum Salary *</span>
                            <input
                                placeholder='Enter Maximum Salary'
                                type="number"
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={maxSalary}
                                onChange={(e) => setMaxSalary(e.target.value)}
                            />

                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Salary Options *</span>
                            <Select
                                placeholder="Select Salary Options"
                                options={salaryOptions}
                                value={salaryType}
                                onChange={handleSalaryTypeChange}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select" // Ensures custom class prefix
                            />
                            {/* {errorState.jobType && <span className="text-red-500 text-sm">{errorState.jobType}</span>} */}

                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Work Time Start *</span>
                            <Select
                                options={startOptions}
                                onChange={handleStartChange}
                                placeholder="Select"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={startOptions.find(option => option.value === startCategory) || null} // Set the selected option
                                styles={customStyles}
                            />
                        </div>


                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Work Time End *</span>
                            <Select
                                options={endOptions}
                                onChange={handleEndChange}
                                placeholder="Select"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={endOptions.find(option => option.value === endCategory) || null} // Set the selected option
                                styles={customStyles}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Qualification Required *</span>
                            <Select
                                options={degreeOptions}
                                onChange={handleDegreeChange}
                                placeholder="Select Qualificaion"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={degreeOptions.find(option => option.value === candidateDegree) || null}
                                styles={customStyles}

                            />

                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Job Description *</span>
                            <input
                                placeholder='Job Description'
                                type="text"
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>



                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Food & Accommodation</span>
                            <Select
                                placeholder="Select"
                                options={foodTypeOptions}
                                value={foodType}
                                onChange={handleFoodTypeChange}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select" // Ensures custom class prefix
                            />
                            {errorState.foodType && <span className="text-red-500 text-sm">{errorState.foodType}</span>}

                        </div>

                        {(customerType === 'admin' || customerType === 'mainAdmin') && (
                            <div className='flex flex-col gap-3'>
                                <span className='text-left text-base font-[500] font-display text-[#E22E37]'>Manual Job ID*</span>
                                <input
                                    placeholder='Job ID'
                                    type="text"
                                    className='h-[43px] w-full border-2 border-[#E22E37] rounded-[5px] px-4'
                                    value={manualJobID}
                                    onChange={(e) => setManualJobID(e.target.value)}
                                />
                            </div>
                        )}
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Manager Number *</span>
                            <input
                                type="text"
                                placeholder='Enter Number'
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={whatsappNumber} // Controlled input
                                onChange={handleWhatsappChange} // Update state on change
                            />
                            {errorState.whatsappNumber && <span className="text-red-500 text-sm">{errorState.whatsappNumber}</span>}

                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Email *</span>
                            <input
                                type="text"
                                placeholder='example@gmail.com'
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={email} // Controlled input
                                onChange={handleEmailChange} // Update state on change

                            />
                        </div>



                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Full Address *</span>
                            <input
                                type="text"
                                placeholder='Enter Address'
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={address} // Controlled input
                                onChange={handleAddressChange} // Update state on change



                            />
                            {errorState.address && <span className="text-red-500 text-sm">{errorState.address}</span>}

                        </div>




                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>No. of Vacancies *</span>
                            <input
                                type="number"
                                placeholder='Enter No. of Vacancies'
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={vacancy} // Controlled input
                                onChange={handleVacancyChange} // Update state on change



                            />
                            {errorState.vacancy && <span className="text-red-500 text-sm">{errorState.vacancy}</span>}

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
