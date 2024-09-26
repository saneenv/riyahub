import React, { useState, useEffect } from 'react';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import { useMediaQuery } from 'react-responsive';
import Footer from './Footer';
import Navbar2 from './Navbar2';
import Select from 'react-select';
import statesAndDistricts from '../json/states-and-districts.json';
import { useNavigate } from 'react-router-dom';

function EmployeeReg() {
    const [companyName, setCompanyName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [email, setEmail] = useState('');
    const [companyCategory, setCompanyCategory] = useState('');
    const [companyDistrict, setCompanyDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [districtOptions, setDistrictOptions] = useState([]);

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
            !companyCategory || !companyDistrict || !address || !password) {
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

        const formData = {
            companyName,
            mobileNumber,
            whatsappNumber,
            email,
            companyCategory,
            companyDistrict,
            address,
            password,
        };

        console.log(formData);

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
            navigate('/verify');
            // Clear all input fields
            setCompanyName('');
            setMobileNumber('');
            setWhatsappNumber('');
            setEmail('');
            setCompanyCategory('');
            setCompanyDistrict(''); // Clear district
            setAddress('');
            setPassword('');
            } else {
                console.log('Response error:', data);
                alert('Error in registration');
            }
        } catch (err) {
            console.error('Request error:', err);
            alert('Error connecting to server');
        }
    };



    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='flex justify-center items-center bg-[#0D2D3E] py-12'>
                <div className='lg:w-[80%] w-[90%] h-[70%] bg-[white] flex flex-col items-center gap-12 py-12 lg:rounded-[20px] rounded-[5px]'>
                    <span className='text-2xl font-[700] font-[display]'>Employee Register</span>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-12 px-3 w-full'>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Company Name</span>
                            <input
                                placeholder='Enter Company Name'
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Mobile Number</span>
                            <input
                                placeholder='Enter Phone No'
                                type="text"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Whatsapp Number</span>
                            <input
                                placeholder='Your Whatsapp No'
                                type="text"
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                            />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Email</span>
                            <input
                                placeholder='Enter Email Address'
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Company Category</span>
                            <input
                                placeholder='Select Category'
                                type="text"
                                value={companyCategory}
                                onChange={(e) => setCompanyCategory(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Company District</span>
                            <Select
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
                                        height: '43px', // Match height with input fields
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
                            />

                        </div>

                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Address</span>
                            <input
                                placeholder='Company Address'
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Create Password</span>
                            <input
                                placeholder='Create Password'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 w-full px-12 justify-center items-center'>
                        <button
                            onClick={handleSubmit}
                            className='h-[56px] lg:w-[25%] w-[50%] bg-[#E22E37] rounded-[20px] flex justify-center items-center text-[white] text-xl font-[display] font-[600]'
                        >
                            Register
                        </button>
                        <span className='text-base font-[500] font-[dislay]'>
                            Already Registered? -
                            <span className='text-base font-[700] font-[dislay] text-[#E22E37] cursor-pointer'> Login</span>
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EmployeeReg;
