import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';
import Select from 'react-select';
// import companies from '../json/company-categories.json';
// import jobs from '../json/jobs.json';
// import location from '../json/cities.json';
import worktime from '../json/worktime.json';
import endtime from '../json/endtime.json';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar2Mob from './Navbar2Mob';


function EditJobPost() {

    const employeeId = sessionStorage.getItem('employeeId');
    const jobId = sessionStorage.getItem('jobId')
    console.log(jobId);
    const navigate= useNavigate();
    
    const [jobTitle, setJobTitle] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [qualification, setQualification] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobType, setJobType] = useState(null);
    const [salaryType, setSalaryType] = useState(null)
    const [employeeData, setEmployeeData] = useState(null);
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [genderType, setGenderType] = useState(null);
    const [foodType, setFoodType] = useState(null);
    const [locationData, setLocationData] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [jobsData, setJobsData] = useState(null);
    const [qualificationData, setQualificationData] = useState(null);
    const [jobsOptions, setJobsOptions] = useState([]);
    const [degreeOptions, setDegreeOptions] = useState([]);
    const [experienceType, setExperienceType] = useState(null);
    const [vacancy, setVacancy] = useState('');


    const [companyCategory, setCompanyCategory] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [jobsCategory, setJobsCategory] = useState('');
    const [locationCategory, setLocationCategory] = useState('');
    const [locationOptions, setLocationOptions] = useState([]);
    const [startCategory, setStartCategory] = useState('');
    const [startOptions, setStartOptions] = useState([]);
    const [endCategory, setEndCategory] = useState('');
    const [endOptions, setEndOptions] = useState([]);
    const [optionsLoaded, setOptionsLoaded] = useState(false);


    
  

    const jobTypeOptions = [
        { value: 'Full Time', label: 'Full Time' },
        { value: 'Part Time', label: 'Part Time' },
        { value: 'Remote/work at home', label: 'Remote/work at home' }
    ];

    const genderTypeOptions = [
        { value: 'MALE', label: 'MALE' },
        { value: 'FEMALE', label: 'FEMALE' },
        { value: 'MALE/FEMALE', label: 'MALE/FEMALE' }
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
        { value: 'On Work Basis', label: 'On Work Basis' }
    ];



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
    }

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
            setOptionsLoaded(true);

            
        }
        
    }, [locationData]);


  // Fetch company data and set category options
  const fetchCompanyData = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/datacompany`); 
        if (response.ok) {
            const data = await response.json();
            setCompanyData(data); // Set the fetched data
        } else {
            console.error('Failed to fetch company data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching company data:', error);
    }
};

useEffect(() => {
    fetchCompanyData(); // Fetch company data when the component mounts
}, []);

useEffect(() => {
    if (companyData) {
        // Extract districts from company data and set category options
        const districts = companyData.states[0].districts.map((district) => ({
            value: district,
            label: district,
        }));
        setCategoryOptions(districts);
        setOptionsLoaded(true); // Mark options as loaded
    }
}, [companyData]); // This runs when companyData is fetched


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
            setOptionsLoaded(true);

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
            setOptionsLoaded(true);

        }
    }, [qualificationData]);





    useEffect(() => {
        window.scrollTo(0, 0);
    
        const fetchOptions = async () => {
     
     
            const workstart = worktime.states[0].districts.map(district => ({
                value: district,
                label: district
            }));
        
            const workend = endtime.states[0].districts.map(district => ({
                value: district,
                label: district
            }));
    
            setStartOptions(workstart);
            setEndOptions(workend);
    
            // Set options loaded to true after fetching options
            setOptionsLoaded(true);
        };
    
        fetchOptions();
    }, []); // Only runs once, on mount
    
    useEffect(() => {
        const fetchJobData = async () => {
            if (!optionsLoaded || !jobId) return; // Only fetch job data after options are loaded
            try {
                const response = await fetch(`${apiBaseUrl}/getjobposts/${jobId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched Data:', data);

                 // Find the selected company type from the fetched data and set it
                 const selectedCategory = categoryOptions.find(
                    (option) => option.value === data.company_type
                );
                setCompanyCategory(selectedCategory || null); // Set the category
                
                const selectedJobs = jobsOptions.find(
                    (option) => option.value === data.job
                );
                setJobsCategory(selectedJobs || null);
    
                // Populate state with fetched data
                setJobTitle(data.job_title);
                setMinSalary(data.min_salary);
                setMaxSalary(data.max_salary);
                setQualification(degreeOptions.find(option => option.value === data.qualification) || null);
                setJobDescription(data.job_description);
                setJobType(jobTypeOptions.find(option => option.value === data.job_type) || null);
                setGenderType(genderTypeOptions.find(option => option.value === data.gender_type) || null);
                setFoodType(foodTypeOptions.find(option => option.value === data.food_type) || null);
                
                setLocationCategory(locationOptions.find(option => option.value === data.location) || null);
                setStartCategory(startOptions.find(option => option.value === data.start_time) || null);
                setEndCategory(endOptions.find(option => option.value === data.end_time) || null);
                setWhatsappNumber(data.whatsapp_number);
                setEmail(data.email);
                setAddress(data.address);
                setExperienceType(experienceOptions.find(option => option.value === data.experienceType) || null);
                setVacancy(data.vacancy);
                setSalaryType(salaryOptions.find(option => option.value === data.salaryType) || null);

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };
    
        fetchJobData();
    }, [jobId, categoryOptions, optionsLoaded]); // Watch for jobId and optionsLoaded
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = {
            jobId,
            employeeId,
            jobTitle,
            jobType: jobType?.value,
            genderType: genderType?.value,
            companyType: companyCategory?.value || '',
            job: jobsCategory?.value || '',
            location: locationCategory?.value || '',
            minSalary,
            maxSalary,
            startTime: startCategory?.value || '',
            endTime: endCategory?.value || '',
            qualification: qualification?.value || '',
            jobDescription,
            foodType: foodType?.value,
            whatsappNumber,
            email,
            address,
            experienceType: experienceType?.value,
            vacancy,
            salaryType: salaryType?.value
        };
    
        console.log('Form Data:', formData); // Log formData for debugging
    
        try {
            const response = await fetch(`${apiBaseUrl}/jobpost/${jobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
            if (result.success) {
                alert('Job updated successfully!');
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
                setExperienceType('');
                setVacancy('');
                setSalaryType('');
                navigate('/postedjob')
                // Optionally redirect or reset the form
            } else {
                alert('Failed to update job.');
               
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the job.');
        }
    };
    
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='md:hidden flex flex-col'>
            <Navbar2Mob />
            </div>
            <div className='flex justify-center items-center bg-[black] py-12'>
                <div className='lg:w-[90%] w-[90%] h-[70%] bg-[white] flex flex-col items-center gap-12 py-12 lg:rounded-[20px] rounded-[5px]'>
                    <span className='text-xl font-[700] font-display'>Edit Job Post</span>
                    <form onSubmit={handleSubmit} className='grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-12 px-3 w-full'>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Job Title *</span>
                            <input
                                placeholder='Job Title'
                                type="text"
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
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
                                classNamePrefix="react-select"
                            />
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
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Min Salary *</span>
                            <input
                                placeholder='Min Salary'
                                type="number"
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={minSalary}
                                onChange={(e) => setMinSalary(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Max Salary *</span>
                            <input
                                placeholder='Max Salary'
                                type="number"
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={maxSalary}
                                onChange={(e) => setMaxSalary(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Company Category *</span>
                            <Select
                                placeholder="Select Company Category"
                                options={categoryOptions}
                                value={companyCategory}
                                onChange={setCompanyCategory}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Jobs Category *</span>
                            <Select
                                placeholder="Select Job Category"
                                options={jobsOptions}
                                value={jobsCategory}
                                onChange={setJobsCategory}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Location *</span>
                            <Select
                                placeholder="Select Location"
                                options={locationOptions}
                                value={locationCategory}
                                onChange={setLocationCategory}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Start Time *</span>
                            <Select
                                placeholder="Select Start Time"
                                options={startOptions}
                                value={startCategory}
                                onChange={setStartCategory}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>End Time *</span>
                            <Select
                                placeholder="Select End Time"
                                options={endOptions}
                                value={endCategory}
                                onChange={setEndCategory}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Qualification *</span>
                        
                              <Select
                                placeholder="Select Qualification"
                                options={degreeOptions}
                                value={qualification}
                                onChange={setQualification}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Job Description *</span>
                            <input
                                placeholder='Job Description'
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Food Type *</span>
                            <Select
                                placeholder="Select Food Type"
                                options={foodTypeOptions}
                                value={foodType}
                                onChange={handleFoodTypeChange}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>WhatsApp Number *</span>
                            <input
                                placeholder='WhatsApp Number'
                                type="text"
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Email *</span>
                            <input
                                placeholder='Email'
                                type="email"
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Address *</span>
                            <input
                                placeholder='Address'
                                type="text"
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
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
                        </div>

                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>No. of Vacancies *</span>
                            <input
                                type="number"
                                placeholder='Enter No. of Vacancies'
                                className='h-[43px] w-full  border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={vacancy} // Controlled input
                                onChange={(e) => setVacancy(e.target.value)} // Update state on change
                               


                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Salary Options *</span>
                            <Select
                                placeholder="Select Job Type"
                                options={salaryOptions}
                                value={salaryType}
                                onChange={handleSalaryTypeChange}
                                isClearable={true}
                                styles={customStyles}
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div className='flex flex-col gap-3 lg:col-span-3 justify-center items-center'>
                            <button className='bg-[black] w-[25%] h-[56px] text-white py-2 rounded-[5px] hover:bg-[#E22E37] transition duration-300 font-display text-lg font-display font-[600]'>
                                Update Job Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditJobPost;
