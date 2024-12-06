import React, { useState, useEffect, useRef } from 'react';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import { useMediaQuery } from 'react-responsive';
import Footer from './Footer';
import Navbar2 from './Navbar2';
import Select from 'react-select';
import statesAndDistricts from '../json/states-and-districts.json';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function EmployeeReg() {
    const [companyName, setCompanyName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [email, setEmail] = useState('');
    const [companyCategory, setCompanyCategory] = useState('');
    const [companyDistrict, setCompanyDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [companyData, setCompanyData] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [locationData, setLocationData] = useState(null);
    const [location, setLocationCategory] = useState('');

    const [locationOptions, setLocationOptions] = useState([]);



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [isLoading, setIsLoading] = useState(false); // New loading state
    const navigate = useNavigate();

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [districtOptions, setDistrictOptions] = useState([]);

    // References for inputs
    const companyNameRef = useRef(null);
    const mobileNumberRef = useRef(null);
    const whatsappNumberRef = useRef(null);
    const emailRef = useRef(null);
    const companyCategoryRef = useRef(null);
    const companyDistrictRef = useRef(null);
    const addressRef = useRef(null);
    const passwordRef = useRef(null);

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
    }, [companyData]);


    const handleCategoryChange = selectedOption => {
        setCompanyCategory(selectedOption ? selectedOption.value : ''); // Set the selected district value
    };

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



    const handleLocationChange = selectedOption => {
        setLocationCategory(selectedOption ? selectedOption.value : ''); // Set the selected district value
    };




    useEffect(() => {
        window.scrollTo(0, 0);

        // Extract districts from the imported JSON data
        const districts = statesAndDistricts.states[0].districts.map(district => ({
            value: district,
            label: district
        }));

        setDistrictOptions(districts); // Set district options for the select
    }, []);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const handleDistrictChange = selectedOption => {
        setCompanyDistrict(selectedOption ? selectedOption.value : ''); // Set the selected district value
    };

    const handleSubmit = async () => {
        // Validation checks
        const mobilePattern = /^[0-9]{10}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check for empty fields
        if (!companyName || !mobileNumber || !whatsappNumber || !email ||
            !companyCategory || !companyDistrict || !address || !password || !location) {
            alert('Please fill in all fields.');
            return; // Stop the function if any field is empty
        }

        // Validate mobile and WhatsApp numbers
        if (!mobilePattern.test(mobileNumber)) {
            alert('Mobile Number must be 10 digits.');
            return; // Stop the function if validation fails
        }

        if (!mobilePattern.test(whatsappNumber)) {
            alert('WhatsApp Number must be 10 digits.');
            return; // Stop the function if validation fails
        }

        // Validate email format
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return; // Stop the function if validation fails
        }

         // Check if the mobile number is blocked
    try {
        const blockedProfilesResponse = await fetch(`${apiBaseUrl}/getBlockedProfiles`);
        const blockedProfiles = await blockedProfilesResponse.json();

        // Check if the mobile number exists in blocked profiles
        const isBlocked = blockedProfiles.some(profile => 
            profile.ProfileType === 'employee' && profile.MobileNumber === mobileNumber
        );

        if (isBlocked) {
            alert('This mobile number is blocked.');
            return; // Stop the function if the mobile number is blocked
        }
    } catch (error) {
        console.error('Error fetching blocked profiles:', error);
    }

        const formData = {
            companyName,
            mobileNumber,
            whatsappNumber,
            email,
            companyCategory,
            companyDistrict,
            address,
            password,
            location,

        };

        console.log(formData);

        setIsLoading(true); // Set loading state to true

        try {
            const response = await fetch(`${apiBaseUrl}/registerEmployee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration Successful');
                navigate('/verify', { state: { employeeId: data.employeeId } });
                // Clear all input fields
                setCompanyName('');
                setMobileNumber('');
                setWhatsappNumber('');
                setEmail('');
                setCompanyCategory('');
                setCompanyDistrict(''); // Clear district
                setAddress('');
                setPassword('');
                setLocationCategory('');

            } else {
                console.log('Response error:', data);
                alert('Error in registration');
            }
        } catch (err) {
            console.error('Request error:', err);
            alert('Error connecting to server');
        }
        finally {
            setIsLoading(false);
        }
    };


    // Function to handle "Enter" key press and move to the next field
    const handleKeyDown = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextRef && nextRef.current) {
                nextRef.current.focus();
            }
        }
    };

    const login = () => {
        navigate('/login');
      };

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


    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='flex justify-center items-center bg-[black] py-12'>
                <div className='lg:w-[80%] w-[90%] h-[70%] bg-[white] flex flex-col items-center gap-12 py-12 lg:rounded-[20px] rounded-[5px]'>
                    <span className='text-xl font-[700] font-display'>Employer Register</span>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-12 px-3 w-full'>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Company Name</span>
                            <input
                              ref={companyNameRef}
                                placeholder='Enter Company Name'
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                onKeyDown={(e) => handleKeyDown(e, mobileNumberRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Manager Number</span>
                            <input
                             ref={mobileNumberRef}
                                placeholder='Enter Manager No'
                                type="number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                onKeyDown={(e) => handleKeyDown(e, whatsappNumberRef)} // Move to WhatsApp Number on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Office Number</span>
                            <input
                            ref={whatsappNumberRef}
                                placeholder='Enter Office No'
                                type="number"
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                onKeyDown={(e) => handleKeyDown(e, emailRef)} // Move to Email on "Enter"
                            />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Email</span>
                            <input
                            ref={emailRef}
                                placeholder='Enter Email Address'
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                onKeyDown={(e) => handleKeyDown(e, companyCategoryRef)} // Move to Company Category on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Company Category</span>
                            <Select
                                ref={companyCategoryRef}
                                options={categoryOptions}
                                onChange={handleCategoryChange}
                                placeholder="Select Category"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={companyCategory ? categoryOptions.find(option => option.value === companyCategory) : null}
                                styles={customStyles}
                                onKeyDown={(e) => handleKeyDown(e, companyDistrictRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Near Big Town</span>
                            <Select
                                // ref={locationRef}
                                options={locationOptions}
                                onChange={handleLocationChange}
                                placeholder="Select Location"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={locationOptions.find(option => option.value === location) || null} // Set the selected option
                                styles={customStyles}
                                // onKeyDown={(e) => handleKeyDown(e, minSalaryRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Company District</span>
                            <Select
                            ref={companyDistrictRef}
                                options={districtOptions}
                                onChange={handleDistrictChange}
                                placeholder="Select District"
                                className='w-full'
                                classNamePrefix='select'
                                isClearable={true}
                                value={districtOptions.find(option => option.value === companyDistrict) || null} // Set the selected option
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        height: '43px', // Use 'height' instead of 'block-size' to match the input fields' height
                                        border: '2px solid #D7D7D7', // Match border with input fields
                                        borderRadius: '5px', // Match border radius with input fields
                                        padding: '0 10px', // Padding
                                        boxShadow: 'none', // Remove default box shadow
                                        '&:hover': {
                                            borderColor: '#D7D7D7', // Change border color on hover
                                        },
                                    }),
                                    placeholder: (base) => ({
                                        ...base,
                                        color: '#999999', // Change placeholder text color
                                    }),
                                    dropdownIndicator: (base) => ({
                                        ...base,
                                        color: '#999999', // Change dropdown indicator color
                                    }),
                                    singleValue: (base) => ({
                                        ...base,
                                        color: '#333333', // Change selected value text color
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        zIndex: 100, // Ensure dropdown appears above other elements
                                    }),
                                    menuList: (base) => ({
                                        ...base,
                                        padding: '0', // Remove padding from menu list
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isFocused ? '#f0f0f0' : 'white', // Change background color on hover
                                        color: state.isSelected ? '#E22E37' : '#333333', // Change color for selected option
                                        padding: '10px', // Padding for options
                                    }),
                                }}
                                onKeyDown={(e) => handleKeyDown(e, addressRef)} // Move to Address on "Enter"
                            />

                        </div>

                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Full Address</span>
                            <input
                            ref={addressRef}
                                placeholder='Company Address'
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                onKeyDown={(e) => handleKeyDown(e, passwordRef)} // Move to Password on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Create Password</span>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                                    placeholder='Create Password'
                                    className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4 pr-10' // Add padding to the right for the icon
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                    className='absolute right-3 top-3 cursor-pointer text-gray-500' // Position the icon
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 w-full px-12 justify-center items-center'>
                        <button
                            onClick={handleSubmit}
                            className='h-[56px] lg:w-[25%] w-[50%] bg-[#E22E37] rounded-[20px] flex justify-center items-center text-[white] text-lg font-display font-[600] hover:bg-[black] hover:text-[white]'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex justify-center items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8v8H4z"></path>
                                    </svg>
                                    <span>Register</span>
                                </div>
                            ) : (
                                'Register'
                            )}
                        </button>
                        <span className='text-base font-[500] font-display'>
                            Already Registered? -
                            <span className='text-base font-[700] font-display text-[#E22E37] cursor-pointer hover:text-[black]' onClick={login}> Login</span>
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EmployeeReg;
