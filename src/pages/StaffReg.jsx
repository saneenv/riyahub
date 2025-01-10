import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import Select from 'react-select';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar2Mob from '../components/Navbar2Mob';


function StaffReg() {
    const [companyName, setCompanyName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // New loading state
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // References for inputs
    const companyNameRef = useRef(null);
    const mobileNumberRef = useRef(null);
    const whatsappNumberRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const addressRef = useRef(null);


    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const login = () => {
        navigate('/login');
    };

    const handleSubmit = async () => {
        // Define the hardcoded password
        const hardcodedPassword = '2954fff'; // Change this to your desired password
    
        // Ask for the password
        const enteredPassword = prompt('Please enter the password to continue:');
    
        // Check if the entered password is correct
        if (enteredPassword !== hardcodedPassword) {
            alert('Incorrect password. Registration aborted.');
            return; // Stop the function if the password is incorrect
        }
    
        // Validation checks
        const mobilePattern = /^[0-9]{10}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Check for empty fields
        if (!companyName || !mobileNumber || !whatsappNumber || !email || !address || !password) {
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
            address,
            password,
        };
    
        console.log(formData);
    
        setIsLoading(true); // Set loading state to true
    
        try {
            const response = await fetch(`${apiBaseUrl}/registerstaff`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert('Registration Successful');
    
                // Clear all input fields
                setCompanyName('');
                setMobileNumber('');
                setWhatsappNumber('');
                setEmail('');
                setAddress('');
                setPassword('');
            } else {
                console.log('Response error:', data);
                alert('Error in registration');
            }
        } catch (err) {
            console.error('Request error:', err);
            alert('Error connecting to server');
        } finally {
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

    // Address options for the Select dropdown
    const addressOptions = [
        { value: 'perinthalmanna', label: 'Perinthalmanna' },
        { value: 'ernakulam', label: 'Ernakulam' },
        { value: 'mannarkkad', label: 'Mannarkkad' },
        { value: 'pattambi', label: 'Pattambi' },
        { value: 'melattur', label: 'Melattur' },
        { value: 'cherpullasseri', label: 'Cherpullasseri' }
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


//     Vipin Kumar
// 8:23 PM
// let fruits = [
// { item: 'apple', price: 100},
// { item: 'orange', price: 50}.
// { item:'banana', cost: 30 }
// ]

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
                <div className='lg:w-[80%] w-[90%] h-[70%] bg-[white] flex flex-col items-center gap-12 py-12 lg:rounded-[20px] rounded-[5px]'>
                    <span className='text-xl font-[700] font-display'>Staff Register</span>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-12 px-3 w-full'>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Staff Name</span>
                            <input
                              ref={companyNameRef}
                                placeholder='Enter Staff Name'
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                onKeyDown={(e) => handleKeyDown(e, mobileNumberRef)} // Move to Mobile Number on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Mobile Number</span>
                            <input
                             ref={mobileNumberRef}
                                placeholder='Enter Phone No'
                                type="number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                                onKeyDown={(e) => handleKeyDown(e, whatsappNumberRef)} // Move to WhatsApp Number on "Enter"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Whatsapp Number</span>
                            <input
                            ref={whatsappNumberRef}
                                placeholder='Your Whatsapp No'
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
                                onKeyDown={(e) => handleKeyDown(e, addressRef)} // Move to Company Category on "Enter"
                            />
                        </div>
                    
                     

                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-base font-[500] font-display'>Address</span>
                            <Select
                                ref={addressRef}
                                options={addressOptions}
                                value={addressOptions.find(option => option.value === address)}
                                onChange={(selectedOption) => setAddress(selectedOption.value)}
                                className='w-full'
                                styles={customStyles}
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
                    <div className='w-[30%]'>
                        <button
                            onClick={handleSubmit}
                            className='w-full bg-[#2C72B6] text-[#fff] h-[50px] rounded-[8px] text-base font-[600]'
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default StaffReg;
