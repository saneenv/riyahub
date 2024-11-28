import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import statesAndDistricts2 from '../json/states-and-districts.json';
import degree from '../json/degree.json';
// import jobs from '../json/jobs.json';
// import location from '../json/cities.json';
import Footer from './Footer';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';


const EditCanReg = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    mobile: '',
    whatsapp: '',
    email: '',
    password: '',
    gender: '',
    district: '',
    degree: '',
    jobType: '',
    jobs: [],
    locations: [],
  });

  const candidateID = parseInt(sessionStorage.getItem('employeeId'), 10);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [degreeOptions, setDegreeOptions] = useState([]);
  const [jobsOptions, setJobsOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [locationData, setLocationData] = useState(null);
  const [jobsData, setJobsData] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null); // Initialize error state
  const [loading, setLoading] = useState(false); // Initialize loading state
  const navigate = useNavigate();


  // Options for Job Type
  const jobTypeOptions = [
    { value: 'any', label: 'Any' },
    { value: 'fulltime', label: 'Full-time' },
    { value: 'parttime', label: 'Part-Time' },
    { value: 'remote', label: 'Remote/Work at Home' }
  ];

  // Options for Gender
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];


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
      const locations = locationData.states[0].districts
          .filter(district => district !== "All Kerala") // Exclude "All Kerala"
          .map(district => ({
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
      const job = jobsData.states[0].districts
      .filter(district => district !== "All") // Exclude "All Kerala"
      .map(district => ({
          value: district,
          label: district,
      }));
      setJobsOptions(job); // Set the location options once data is available
  }
}, [jobsData]);



  // Fetch candidate data on load
  useEffect(() => {
    window.scrollTo(0, 0); // Reset the scroll position

    let isMounted = true; // track whether the component is mounted
    setLoading(true); // Set loading state
    fetch(`${apiBaseUrl}/getCandidate/${candidateID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (isMounted) {
          console.log('Fetched candidate data:', data); // Log the fetched data

          const {
            Name, // Adjusted to match the API response
            Age,
            Mobile,
            WhatsApp,
            Email,
            Password,
            Gender,
            District,
            Degree,
            JobType,
            Jobs = "", // Default to empty string if undefined
            Locations = "" // Default to empty string if undefined
          } = data;

          setFormData({
            name: Name,
            age: Age,
            mobile: Mobile,
            whatsapp: WhatsApp,
            email: Email,
            password: Password,
            gender: Gender,
            district: District,
            degree: Degree,
            jobType: JobType,
            jobs: Array.isArray(Jobs) ? Jobs : Jobs.split(','),
            locations: Array.isArray(Locations) ? Locations : Locations.split(','),
          });
          setErrorMessage(null); // Clear any previous error
        }
      })
      .catch(error => {
        console.error('Error fetching candidate data:', error);
        if (isMounted) {
          setErrorMessage("Failed to load candidate data."); // Update state for error
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false); // Reset loading state
        }
      });

    const districts = statesAndDistricts2.states[0].districts.map(district => ({
      value: district,
      label: district
    }));

    const degrees = degree.states[0].districts.map(district => ({
      value: district,
      label: district
    }));






    setDistrictOptions(districts);
    setDegreeOptions(degrees);

    return () => { isMounted = false; }; // Cleanup function to set isMounted to false
  }, [candidateID]);

  // Handling input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handling select changes
  const handleSelectChange = (selected, field) => {
    if (field === 'degree') {
      // Handle single select for degree
      setFormData({
        ...formData,
        [field]: selected ? selected.value : '', // Use selected.value for single select
      });
    } else if (field === 'district' || field === 'jobType' || field === 'gender') {
      // Handle single select for district and jobType
      setFormData({
        ...formData,
        [field]: selected ? selected.value : '', // Use selected.value for single select
      });
    } else {
      // Handle multi-select for jobs and locations
      setFormData({
        ...formData,
        [field]: selected ? selected.map(option => option.value) : [], // For multi-select
      });
    }
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      jobs: formData.jobs.join(','), // Convert array to comma-separated string
      locations: formData.locations.join(','), // Convert array to comma-separated string
    };

    fetch(`${apiBaseUrl}/updateCandidate/${candidateID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => {
        if (response.ok) {
          alert('Candidate updated successfully!');
          navigate('/viewcandidate')
        } else {
          return response.json().then(errorData => {
            alert(`Error: ${errorData.message}`);
          });
        }
      })
      .catch(error => console.error('Error updating candidate:', error));
  };

  return (
    <div className='flex flex-col min-h-screen'>
      {isMobile ? <NavbarMob /> : <Navbar />}
      <div className='md:flex hidden'>
        <Navbar2 />
      </div>
      <div className='flex justify-center items-center bg-[black] py-12'>
        <div className='lg:w-[80%] w-[90%] h-[70%] flex flex-col items-center bg-[white] gap-12 py-12 lg:rounded-[20px] rounded-[5px]'>
          <span className='text-xl font-[700] font-display'>Update Candidate</span>
          <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-12 px-3 w-full'>
            <div className='flex flex-col gap-3'>
              <span className='text-left text-base font-[500] font-display'>Name</span>
              <input
                type="text"
                placeholder='Enter Full Name'
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-3'>
              <span className='text-left text-base font-[500] font-display'>Age</span>
              <input
                type="text"
                placeholder='Enter Full Name'
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                value={formData.age}
                name="age"
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-3'>
              <span className='text-left text-base font-[500] font-display'>Mobile Number</span>
              <input
                type="number"
                placeholder='Enter Phone No'
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                value={formData.mobile}
                name="mobile"
                onChange={handleChange}
                readOnly
              />
            </div>

            <div className='flex flex-col gap-3'>
              <span className='text-left text-base font-[500] font-display'>Whatsapp Number</span>
              <input
                type="number"
                placeholder='Your Whatsapp No'
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                value={formData.whatsapp}
                name="whatsapp"
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-3'>
              <span className='text-left text-base font-[500] font-display'>Email</span>
              <input
                type="text"
                placeholder='Enter Email Address'
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                value={formData.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col gap-3'>
              <span className='text-left text-base font-[500] font-display'>Password</span>
              <input
                type="text"
                placeholder='Enter Email Address'
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                value={formData.password}
                name="password"
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-3'>
              <span className='text-left text-base font-[500] font-display'>Gender</span>
              <Select
                options={genderOptions}
                onChange={selected => handleSelectChange(selected, 'gender')}
                placeholder="Select Gender"
                value={formData.gender ? { value: formData.gender, label: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) } : null}
              />
            </div>

            <div className='flex flex-col gap-3'>
              <span className='text-left text-base font-[500] font-display'>District</span>
              <Select
                options={districtOptions}
                onChange={selected => handleSelectChange(selected, 'district')}
                placeholder="Select District"
                value={formData.district ? { value: formData.district, label: formData.district } : null}
              />

            </div>

            <div className='flex flex-col gap-3'>
              <span className='text-left text-base font-[500] font-display'>Degree</span>
              <Select
                options={degreeOptions}
                onChange={selected => handleSelectChange(selected, 'degree')}
                placeholder="Select Degree"
                isMulti={false} // or remove this line for single select
                value={formData.degree ? { value: formData.degree, label: formData.degree } : null}
              />

            </div>

            <div className='flex flex-col gap-3'>
              <span className='text-left text-base font-[500] font-display'>Job Type</span>
              <Select
                options={jobTypeOptions}
                onChange={selected => handleSelectChange(selected, 'jobType')}
                placeholder="Select Job Type"
                value={formData.jobType ? { value: formData.jobType, label: formData.jobType.charAt(0).toUpperCase() + formData.jobType.slice(1) } : null}
              />
            </div>

            <div className='flex flex-col gap-3'>
              <span className='text-left text-base font-[500] font-display'>Select Jobs</span>
              <Select
                isMulti
                options={jobsOptions}
                onChange={selected => handleSelectChange(selected, 'jobs')}
                placeholder="Select Jobs"
                value={Array.isArray(formData.jobs) ? formData.jobs.map(job => ({ value: job, label: job })) : []}
              />
            </div>

            <div className='flex flex-col gap-3'>
              <span className='text-left text-base font-[500] font-display'>Select Locations</span>
              <Select
                isMulti
                options={locationOptions}
                onChange={selected => handleSelectChange(selected, 'locations')}
                placeholder="Select Locations"
                value={Array.isArray(formData.locations) ? formData.locations.map(location => ({ value: location, label: location })) : []}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className='bg-[black] text-white rounded-md py-2 px-4 mt-4 text-xl font-[600] hover:bg-[#E22E37] h-[56px] lg:w-[25%] w-[50%]' 
          >
            Update
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditCanReg;
