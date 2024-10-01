import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';
import Select from 'react-select';
import companies from '../json/company-categories.json';
import jobs from '../json/jobs.json';
import location from '../json/cities.json';
import worktime from '../json/worktime.json';
import endtime from '../json/endtime.json';
import { useLocation } from 'react-router-dom';


function EditJobPost() {

    const employeeId = sessionStorage.getItem('employeeId');
    const jobId = sessionStorage.getItem('jobId')
    console.log(jobId);
    
    const [jobTitle, setJobTitle] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [qualification, setQualification] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobType, setJobType] = useState(null);
    const [employeeData, setEmployeeData] = useState(null);
    const [whatsappNumber, setWhatsappNumber] = useState('');
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

//     const jobTypeOptions = [
//     { value: 'fulltime', label: 'Full Time' },
//     { value: 'parttime', label: 'Part Time' },
//     { value: 'Remote/workathome', label: 'Remote/work at home' },
//     // Adding the job titles from Kerala
//     { value: 'accountant', label: 'Accountant' },
//     { value: 'actor', label: 'Actor' },
//     { value: 'actuary', label: 'Actuary' },
//     { value: 'advertising_manager', label: 'Advertising Manager' },
//     { value: 'aeronautical_engineer', label: 'Aeronautical Engineer' },
//     { value: 'agricultural_engineer', label: 'Agricultural Engineer' },
//     { value: 'air_traffic_controller', label: 'Air Traffic Controller' },
//     { value: 'aircraft_mechanic', label: 'Aircraft Mechanic' },
//     { value: 'airline_pilot', label: 'Airline Pilot' },
//     { value: 'anesthesiologist', label: 'Anesthesiologist' },
//     { value: 'animal_caretaker', label: 'Animal Caretaker' },
//     { value: 'app_developer', label: 'App Developer' },
//     { value: 'archaeologist', label: 'Archaeologist' },
//     { value: 'architect', label: 'Architect' },
//     { value: 'art_director', label: 'Art Director' },
//     { value: 'artist', label: 'Artist' },
//     { value: 'astronomer', label: 'Astronomer' },
//     { value: 'athletic_trainer', label: 'Athletic Trainer' },
//     { value: 'audiologist', label: 'Audiologist' },
//     { value: 'automotive_engineer', label: 'Automotive Engineer' },
//     { value: 'baker', label: 'Baker' },
//     { value: 'bank_teller', label: 'Bank Teller' },
//     { value: 'barber', label: 'Barber' },
//     { value: 'bartender', label: 'Bartender' },
//     { value: 'biochemist', label: 'Biochemist' },
//     { value: 'biologist', label: 'Biologist' },
//     { value: 'biomedical_engineer', label: 'Biomedical Engineer' },
//     { value: 'blockchain_developer', label: 'Blockchain Developer' },
//     { value: 'bookkeeper', label: 'Bookkeeper' },
//     { value: 'brand_manager', label: 'Brand Manager' },
//     { value: 'business_analyst', label: 'Business Analyst' },
//     { value: 'business_consultant', label: 'Business Consultant' },
//     { value: 'cabin_crew', label: 'Cabin Crew' },
//     { value: 'cafeteria_worker', label: 'Cafeteria Worker' },
//     { value: 'camera_operator', label: 'Camera Operator' },
//     { value: 'carpenter', label: 'Carpenter' },
//     { value: 'cartographer', label: 'Cartographer' },
//     { value: 'chef', label: 'Chef' },
//     { value: 'chemical_engineer', label: 'Chemical Engineer' },
//     { value: 'chemist', label: 'Chemist' },
//     { value: 'childcare_worker', label: 'Childcare Worker' },
//     { value: 'chiropractor', label: 'Chiropractor' },
//     { value: 'civil_engineer', label: 'Civil Engineer' },
//     { value: 'claims_adjuster', label: 'Claims Adjuster' },
//     { value: 'cloud_engineer', label: 'Cloud Engineer' },
//     { value: 'computer_hardware_engineer', label: 'Computer Hardware Engineer' },
//     { value: 'computer_programmer', label: 'Computer Programmer' },
//     { value: 'content_creator', label: 'Content Creator' },
//     { value: 'construction_manager', label: 'Construction Manager' },
//     { value: 'copywriter', label: 'Copywriter' },
//     { value: 'counselor', label: 'Counselor' },
//     { value: 'customer_service_representative', label: 'Customer Service Representative' },
//     { value: 'data_analyst', label: 'Data Analyst' },
//     { value: 'data_engineer', label: 'Data Engineer' },
//     { value: 'data_scientist', label: 'Data Scientist' },
//     { value: 'database_administrator', label: 'Database Administrator' },
//     { value: 'dentist', label: 'Dentist' },
//     { value: 'dermatologist', label: 'Dermatologist' },
//     { value: 'designer', label: 'Designer' },
//     { value: 'dietitian', label: 'Dietitian' },
//     { value: 'digital_marketing_specialist', label: 'Digital Marketing Specialist' },
//     { value: 'director', label: 'Director' },
//     { value: 'doctor', label: 'Doctor' },
//     { value: 'drone_operator', label: 'Drone Operator' },
//     { value: 'economist', label: 'Economist' },
//     { value: 'editor', label: 'Editor' },
//     { value: 'electrical_engineer', label: 'Electrical Engineer' },
//     { value: 'electrician', label: 'Electrician' },
//     { value: 'elementary_school_teacher', label: 'Elementary School Teacher' },
//     { value: 'emergency_medical_technician', label: 'Emergency Medical Technician (EMT)' },
//     { value: 'energy_consultant', label: 'Energy Consultant' },
//     { value: 'environmental_engineer', label: 'Environmental Engineer' },
//     { value: 'environmental_scientist', label: 'Environmental Scientist' },
//     { value: 'event_planner', label: 'Event Planner' },
//     { value: 'executive_assistant', label: 'Executive Assistant' },
//     { value: 'fashion_designer', label: 'Fashion Designer' },
//     { value: 'film_director', label: 'Film Director' },
//     { value: 'financial_analyst', label: 'Financial Analyst' },
//     { value: 'financial_planner', label: 'Financial Planner' },
//     { value: 'firefighter', label: 'Firefighter' },
//     { value: 'fitness_trainer', label: 'Fitness Trainer' },
//     { value: 'flight_attendant', label: 'Flight Attendant' },
//     { value: 'florist', label: 'Florist' },
//     { value: 'food_scientist', label: 'Food Scientist' },
//     { value: 'forensic_scientist', label: 'Forensic Scientist' },
//     { value: 'game_designer', label: 'Game Designer' },
//     { value: 'game_developer', label: 'Game Developer' },
//     { value: 'gardener', label: 'Gardener' },
//     { value: 'geologist', label: 'Geologist' },
//     { value: 'graphic_designer', label: 'Graphic Designer' },
//     { value: 'guidance_counselor', label: 'Guidance Counselor' },
//     { value: 'hairdresser', label: 'Hairdresser' },
//     { value: 'health_and_safety_officer', label: 'Health and Safety Officer' },
//     { value: 'healthcare_administrator', label: 'Healthcare Administrator' },
//     { value: 'home_health_aide', label: 'Home Health Aide' },
//     { value: 'hotel_manager', label: 'Hotel Manager' },
//     { value: 'human_resources_specialist', label: 'Human Resources Specialist' },
//     { value: 'industrial_designer', label: 'Industrial Designer' },
//     { value: 'industrial_engineer', label: 'Industrial Engineer' },
//     { value: 'information_security_analyst', label: 'Information Security Analyst' },
//     { value: 'interior_designer', label: 'Interior Designer' },
//     { value: 'interpreter', label: 'Interpreter' },
//     { value: 'investment_banker', label: 'Investment Banker' },
//     { value: 'it_consultant', label: 'IT Consultant' },
//     { value: 'journalist', label: 'Journalist' },
//     { value: 'judge', label: 'Judge' },
//     { value: 'kindergarten_teacher', label: 'Kindergarten Teacher' },
//     { value: 'laboratory_technician', label: 'Laboratory Technician' },
//     { value: 'land_surveyor', label: 'Land Surveyor' },
//     { value: 'lawyer', label: 'Lawyer' },
//     { value: 'librarian', label: 'Librarian' },
//     { value: 'life_coach', label: 'Life Coach' },
//     { value: 'logistics_manager', label: 'Logistics Manager' },
//     { value: 'machine_learning_engineer', label: 'Machine Learning Engineer' },
//     { value: 'magazine_editor', label: 'Magazine Editor' },
//     { value: 'maintenance_worker', label: 'Maintenance Worker' },
//     { value: 'management_consultant', label: 'Management Consultant' },
//     { value: 'marketing_manager', label: 'Marketing Manager' },
//     { value: 'mathematician', label: 'Mathematician' },
//     { value: 'medical_assistant', label: 'Medical Assistant' },
//     { value: 'medical_doctor', label: 'Medical Doctor' },
//     { value: 'medical_technologist', label: 'Medical Technologist' },
//     { value: 'merchandiser', label: 'Merchandiser' },
//     { value: 'microbiologist', label: 'Microbiologist' },
//     { value: 'mobile_app_developer', label: 'Mobile App Developer' },
//     { value: 'nanny', label: 'Nanny' },
//     { value: 'network_administrator', label: 'Network Administrator' },
//     { value: 'nurse', label: 'Nurse' },
//     { value: 'nutritionist', label: 'Nutritionist' },
//     { value: 'occupational_therapist', label: 'Occupational Therapist' },
//     { value: 'office_manager', label: 'Office Manager' },
//     { value: 'operations_manager', label: 'Operations Manager' },
//     { value: 'optometrist', label: 'Optometrist' },
//     { value: 'painter', label: 'Painter' },
//     { value: 'paramedic', label: 'Paramedic' },
//     { value: 'patent_attorney', label: 'Patent Attorney' },
//     { value: 'personal_assistant', label: 'Personal Assistant' },
//     { value: 'pharmacist', label: 'Pharmacist' },
//     { value: 'photographer', label: 'Photographer' },
//     { value: 'physician', label: 'Physician' },
//     { value: 'physiotherapist', label: 'Physiotherapist' },
//     { value: 'plumber', label: 'Plumber' },
//     { value: 'police_officer', label: 'Police Officer' },
//     { value: 'project_manager', label: 'Project Manager' },
//     { value: 'psychologist', label: 'Psychologist' },
//     { value: 'real_estate_agent', label: 'Real Estate Agent' },
//     { value: 'receptionist', label: 'Receptionist' },
//     { value: 'restaurant_manager', label: 'Restaurant Manager' },
//     { value: 'sales_associate', label: 'Sales Associate' },
//     { value: 'sales_manager', label: 'Sales Manager' },
//     { value: 'software_engineer', label: 'Software Engineer' },
//     { value: 'software_tester', label: 'Software Tester' },
//     { value: 'surgeon', label: 'Surgeon' },
//     { value: 'teacher', label: 'Teacher' },
//     { value: 'technical_writer', label: 'Technical Writer' },
//     { value: 'telecommunications_engineer', label: 'Telecommunications Engineer' },
//     { value: 'ux_designer', label: 'UX Designer' },
//     { value: 'veterinarian', label: 'Veterinarian' },
//     { value: 'web_developer', label: 'Web Developer' },
//     { value: 'writer', label: 'Writer' },
//     { value: 'zoologist', label: 'Zoologist' }
// ];




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

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchOptions = async () => {
            const districts = companies.states[0].districts.map(district => ({
                value: district,
                label: district
            }));
            const job = jobs.states[0].districts.map(district => ({
                value: district,
                label: district
            }));
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
            setJobsOptions(job);
            setLocationOptions(locations);
            setStartOptions(workstart);
            setEndOptions(workend);
        };

        fetchOptions();
    }, []);

    

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/getjobposts/${jobId}`); // Fetch job details by ID
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched Data:', data); 
                

                // Populate state with fetched data
                setJobTitle(data.job_title);
                setMinSalary(data.min_salary);
                setMaxSalary(data.max_salary);
                setQualification(data.qualification);
                setJobDescription(data.job_description);
                setJobType(jobTypeOptions.find(option => option.value === data.job_type) || null);
                setGenderType(genderTypeOptions.find(option => option.value === data.gender_type) || null);
                setFoodType(foodTypeOptions.find(option => option.value === data.food_type) || null);
                setCompanyCategory(categoryOptions.find(option => option.value === data.company_type) || null);
                setJobsCategory(jobsOptions.find(option => option.value === data.job) || null);
                setLocationCategory(locationOptions.find(option => option.value === data.location) || null);
                setStartCategory(startOptions.find(option => option.value === data.start_time) || null);
                setEndCategory(endOptions.find(option => option.value === data.end_time) || null);
                setWhatsappNumber(data.whatsapp_number);
                setEmail(data.email);
                setAddress(data.address);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchJobData();
    }, [jobId, apiBaseUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            jobId,
            employeeId,
            jobTitle,
            jobType: jobType?.value,
            genderType: genderType?.value,
            companyType: companyCategory,
            job: jobsCategory,
            location: locationCategory,
            minSalary,
            maxSalary,
            startTime: startCategory,
            endTime: endCategory,
            qualification,
            jobDescription,
            foodType: foodType?.value,
            whatsappNumber,
            email,
            address,
        };

        try {
            const response = await fetch(`${apiBaseUrl}/jobpost/${jobId}`, {
                method: 'PUT', // Use PUT for updates
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                alert('Job updated successfully!');
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
            <div className='flex justify-center items-center bg-[#0D2D3E] py-12'>
                <div className='lg:w-[90%] w-[90%] h-[70%] bg-[white] flex flex-col items-center gap-12 py-12 lg:rounded-[20px] rounded-[5px]'>
                    <span className='text-2xl font-[700] font-[display]'>Edit Job Post</span>
                    <form onSubmit={handleSubmit} className='grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-12 px-3 w-full'>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job Title *</span>
                            <input
                                placeholder='Job Title'
                                type="text"
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
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
                                classNamePrefix="react-select"
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
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Min Salary *</span>
                            <input
                                placeholder='Min Salary'
                                type="number"
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={minSalary}
                                onChange={(e) => setMinSalary(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Max Salary *</span>
                            <input
                                placeholder='Max Salary'
                                type="number"
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={maxSalary}
                                onChange={(e) => setMaxSalary(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Company Category *</span>
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
                            <span className='text-left text-lg font-[500] font-[display]'>Jobs Category *</span>
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
                            <span className='text-left text-lg font-[500] font-[display]'>Location *</span>
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
                            <span className='text-left text-lg font-[500] font-[display]'>Start Time *</span>
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
                            <span className='text-left text-lg font-[500] font-[display]'>End Time *</span>
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
                            <span className='text-left text-lg font-[500] font-[display]'>Qualification *</span>
                            <input
                                placeholder='Qualification'
                                type="text"
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Job Description *</span>
                            <input
                                placeholder='Job Description'
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Food Type *</span>
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
                            <span className='text-left text-lg font-[500] font-[display]'>WhatsApp Number *</span>
                            <input
                                placeholder='WhatsApp Number'
                                type="text"
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Email *</span>
                            <input
                                placeholder='Email'
                                type="email"
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Address *</span>
                            <input
                                placeholder='Address'
                                type="text"
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-3 lg:col-span-3'>
                            <button className='bg-[#0D2D3E] text-white py-2 rounded-[5px] hover:bg-[#1E3D5B] transition duration-300'>
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
